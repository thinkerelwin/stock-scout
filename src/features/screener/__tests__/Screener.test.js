import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, screen } from '@testing-library/react';

import { renderWithRedux } from '../../../setupTests';
import {
  mockCategories,
  mockScreenerList,
  mockDetailData,
  mockSortedScreenerList,
  mockSortedScreenerListWithCharacter,
} from '../../../mockData';
import { topList } from '../Screener';

import * as hookCollections from '../../../utils/customHooks';
import instance from '../../../api/IEXCloud';
import App from '../../App';

const categoryRoute = '/ref-data/sectors';

beforeEach(() => {
  jest.spyOn(instance, 'get').mockImplementation((route, params) => {
    return route === categoryRoute
      ? { data: mockCategories }
      : { data: mockScreenerList };
  });
});

it('render default Screener page normally', async () => {
  renderWithRedux(
    <MemoryRouter initialEntries={['/screener/Most Active']}>
      <App />
    </MemoryRouter>
  );

  expect(
    await screen.findByText(mockCategories[mockCategories.length - 1].name)
  ).toBeInTheDocument();
  expect(await screen.findByText(topList[0])).toBeInTheDocument();
  expect(
    await screen.findByText(mockScreenerList[0].companyName)
  ).toBeInTheDocument();
});

it('render loading icon when fetching screener data', async () => {
  renderWithRedux(
    <MemoryRouter initialEntries={['/screener/Most Active']}>
      <App />
    </MemoryRouter>,
    {
      preloadedState: {
        screenerCategories: {
          categories: [],
          isFetching: true,
          error: null,
        },
        screenerTable: {
          screenerList: [],
          isFetchingList: true,
          listError: null,
        },
      },
    }
  );

  const loadingIcons = await screen.findAllByAltText('loading icon');
  expect(loadingIcons.length).toBe(2);
});

it('render error message when fetching encounter a problem', async () => {
  const errorMessage = 'timeout';
  // useSelector will be triggered twice on second fetching
  jest.spyOn(instance, 'get').mockRejectedValue(new Error(errorMessage));

  renderWithRedux(
    <MemoryRouter initialEntries={['/screener/Most Active']}>
      <App />
    </MemoryRouter>
  );

  const errorMessages = await screen.findAllByText(`Error: ${errorMessage}`);
  expect(errorMessages.length).toBe(2);
});

it('change categories on clicking another category', async () => {
  renderWithRedux(
    <MemoryRouter initialEntries={['/screener/Most Active']}>
      <App />
    </MemoryRouter>
  );
  const nameOfNextCategory = mockCategories[1].name;
  const nextCategory = await screen.findByText(nameOfNextCategory);

  fireEvent.click(nextCategory);

  expect(
    await screen.findByTestId(`category-${nextCategory}--selected`)
  ).toHaveClass('category--active');
  expect(jest.spyOn(instance, 'get')).toHaveBeenCalledWith(
    `/stock/market/collection/sector`,
    {
      params: {
        collectionName: nameOfNextCategory,
      },
    }
  );
});

it('navigate to detail page when clicking on the symbol of a company in the ScreenerTable', async () => {
  jest.spyOn(hookCollections, 'useLocalStateFetching').mockReturnValueOnce({
    isFetchingDetailsOfSymbol: false,
    errorOnDetailsOfSymbol: '',
    detailsOfSymbol: mockDetailData,
  });
  renderWithRedux(
    <MemoryRouter initialEntries={['/screener/Most Active']}>
      <App />
    </MemoryRouter>
  );
  const targetSymbol = mockScreenerList[0].symbol;
  const targetLink = await screen.findByText(targetSymbol);

  fireEvent.click(targetLink);

  expect(
    await screen.findByText(mockDetailData.quote.primaryExchange)
  ).toBeInTheDocument();
  expect(
    await screen.findByText(`${targetSymbol} Stock Chart`)
  ).toBeInTheDocument();
  expect(
    await screen.findByText(mockDetailData.news[0].headline)
  ).toBeInTheDocument();
  expect(
    await screen.findByText(mockDetailData.company.description)
  ).toBeInTheDocument();
});

it('sort correctly with number when clicking on the correspond column header', async () => {
  renderWithRedux(
    <MemoryRouter initialEntries={['/screener/Most Active']}>
      <App />
    </MemoryRouter>
  );

  fireEvent.click(await screen.findByTitle('CHG'));

  const sortedElements = await screen.findAllByTestId('sortOnNumber');
  const sortedList = sortedElements.map((elment) => elment.textContent);
  const resultSortedScreenerList = mockSortedScreenerList.map(({ change }) =>
    change.toString()
  );
  expect(sortedList).toEqual(resultSortedScreenerList);

  fireEvent.click(await screen.findByTitle('CHG'));

  const reversedSortedElements = await screen.findAllByTestId('sortOnNumber');
  const reversedSortedList = reversedSortedElements.map(
    (elment) => elment.textContent
  );
  expect(reversedSortedList).toEqual(resultSortedScreenerList.reverse());
});

it('sort correctly with characters when clicking on the correspond column header', async () => {
  renderWithRedux(
    <MemoryRouter initialEntries={['/screener/Most Active']}>
      <App />
    </MemoryRouter>
  );

  fireEvent.click(await screen.findByTitle('Description'));

  const sortedElements = await screen.findAllByTestId('sortOnCharacter');
  const sortedList = sortedElements.map((elment) => elment.textContent);
  const resultSortedScreenerList = mockSortedScreenerListWithCharacter.map(
    ({ symbol }) => symbol
  );
  expect(sortedList).toEqual(resultSortedScreenerList);

  fireEvent.click(await screen.findByTitle('Description'));

  const reversedSortedElements = await screen.findAllByTestId(
    'sortOnCharacter'
  );
  const reversedSortedList = reversedSortedElements.map(
    (elment) => elment.textContent
  );
  expect(reversedSortedList).toEqual(resultSortedScreenerList.reverse());
});
