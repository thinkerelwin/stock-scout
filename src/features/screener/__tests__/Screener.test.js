import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';

import { renderWithRedux } from '../../../setupTests';
import {
  mockCategories,
  mockScreenerList,
  mockDetailData,
  mockSortedScreenerList,
  mockSortedScreenerListWithCharacter
} from '../../../__mocks__/mockData';
import { topList } from '../Screener';

import * as hookCollections from '../../../utils/customHooks';
import * as reactReduxAPI from 'react-redux';
import instance from '../../../api/IEXCloud';
import App from '../../App';

const categoryRoute = '/ref-data/sectors';
const dataFetchingMethod = jest.spyOn(instance, 'get');
const mockUseSelector = jest.spyOn(reactReduxAPI, 'useSelector');

dataFetchingMethod.mockImplementation((route, params) => {
  return route === categoryRoute
    ? { data: mockCategories }
    : { data: mockScreenerList };
});

it('render default Screener page normally', async () => {
  const { findByText } = renderWithRedux(
    <MemoryRouter initialEntries={['/screener/Most Active']}>
      <App />
    </MemoryRouter>
  );

  expect(
    await findByText(mockCategories[mockCategories.length - 1].name)
  ).toBeInTheDocument();
  expect(await findByText(topList[0])).toBeInTheDocument();
  expect(await findByText(mockScreenerList[0].companyName)).toBeInTheDocument();
});

it('render loading icon when fetching screener data', async () => {
  mockUseSelector.mockClear();
  mockUseSelector
    .mockReturnValueOnce({
      categories: [],
      isFetching: true,
      error: null,
      screenerList: [],
      isFetchingList: true,
      listError: null
    })
    .mockReturnValueOnce({
      categories: [],
      isFetching: true,
      error: null,
      screenerList: [],
      isFetchingList: true,
      listError: null
    });

  const { findAllByAltText } = renderWithRedux(
    <MemoryRouter initialEntries={['/screener/Most Active']}>
      <App />
    </MemoryRouter>
  );

  const loadingIcons = await findAllByAltText('loading icon');
  expect(loadingIcons.length).toBe(2);
});

it('render error message when fetching encounter a problem', async () => {
  const errorMessage = 'timeout';
  // useSelector will be triggered twice on second fetching
  mockUseSelector
    .mockReturnValueOnce({
      categories: [],
      isFetching: false,
      error: errorMessage,
      screenerList: [],
      isFetchingList: false,
      listError: errorMessage
    })
    .mockReturnValueOnce({
      categories: [],
      isFetching: false,
      error: errorMessage,
      screenerList: [],
      isFetchingList: false,
      listError: errorMessage
    })
    .mockReturnValueOnce({
      categories: [],
      isFetching: false,
      error: errorMessage,
      screenerList: [],
      isFetchingList: false,
      listError: errorMessage
    });

  const { findAllByText } = renderWithRedux(
    <MemoryRouter initialEntries={['/screener/Most Active']}>
      <App />
    </MemoryRouter>
  );

  const errorMessages = await findAllByText(errorMessage);
  expect(errorMessages.length).toBe(2);
});

it('change categories on click aother category', async () => {
  const { findByText } = renderWithRedux(
    <MemoryRouter initialEntries={['/screener/Most Active']}>
      <App />
    </MemoryRouter>
  );
  const nameOfNextCategory = mockCategories[1].name;
  const nextCategory = await findByText(nameOfNextCategory);

  fireEvent.click(nextCategory);

  expect(
    nextCategory.parentNode.classList.contains('category--active')
  ).toBeTruthy();
  expect(dataFetchingMethod).toHaveBeenCalledWith(
    `/stock/market/collection/sector`,
    {
      params: {
        collectionName: nameOfNextCategory
      }
    }
  );
});

it('navigate to detail page when click on the symbol of a company in the ScreenerTable', async () => {
  jest.spyOn(hookCollections, 'useLocalStateFetching').mockReturnValueOnce({
    isFetchingDetailsOfSymbol: false,
    errorOnDetailsOfSymbol: '',
    detailsOfSymbol: mockDetailData
  });
  const { findByText } = renderWithRedux(
    <MemoryRouter initialEntries={['/screener/Most Active']}>
      <App />
    </MemoryRouter>
  );
  const targetSymbol = mockScreenerList[0].symbol;
  const targetLink = await findByText(targetSymbol);

  fireEvent.click(targetLink);

  expect(
    await findByText(mockDetailData.quote.primaryExchange)
  ).toBeInTheDocument();
  expect(await findByText(`${targetSymbol} Stock Chart`)).toBeInTheDocument();
  expect(await findByText(mockDetailData.news[0].headline)).toBeInTheDocument();
  expect(
    await findByText(mockDetailData.company.description)
  ).toBeInTheDocument();
});

it('sort correctly with number when click on the correspond column header', async () => {
  const { findByTitle, findAllByTestId } = renderWithRedux(
    <MemoryRouter initialEntries={['/screener/Most Active']}>
      <App />
    </MemoryRouter>
  );

  fireEvent.click(await findByTitle('CHG'));

  const sortedElements = await findAllByTestId('sortOnNumber');
  const sortedList = sortedElements.map(elment => elment.textContent);
  const resultSortedScreenerList = mockSortedScreenerList.map(({ change }) =>
    change.toString()
  );
  expect(sortedList).toEqual(resultSortedScreenerList);

  fireEvent.click(await findByTitle('CHG'));

  const reversedSortedElements = await findAllByTestId('sortOnNumber');
  const reversedSortedList = reversedSortedElements.map(
    elment => elment.textContent
  );
  expect(reversedSortedList).toEqual(resultSortedScreenerList.reverse());
});

it('sort correctly with characters when click on the correspond column header', async () => {
  const { findByTitle, findAllByTestId } = renderWithRedux(
    <MemoryRouter initialEntries={['/screener/Most Active']}>
      <App />
    </MemoryRouter>
  );

  fireEvent.click(await findByTitle('Description'));

  const sortedElements = await findAllByTestId('sortOnCharacter');
  const sortedList = sortedElements.map(elment => elment.textContent);
  const resultSortedScreenerList = mockSortedScreenerListWithCharacter.map(
    ({ symbol }) => symbol
  );
  expect(sortedList).toEqual(resultSortedScreenerList);

  fireEvent.click(await findByTitle('Description'));

  const reversedSortedElements = await findAllByTestId('sortOnCharacter');
  const reversedSortedList = reversedSortedElements.map(
    elment => elment.textContent
  );
  expect(reversedSortedList).toEqual(resultSortedScreenerList.reverse());
});
