import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { renderWithRedux } from '../../../setupTests';
import { mockDetailData } from '../../../__mocks__/mockData';

import * as hookCollections from '../../../utils/customHooks';
import instance from '../../../api/IEXCloud';
import App from '../../App';

const mockSymbol = mockDetailData.quote.symbol;
const mockAxiosInstance = jest
  .spyOn(instance, 'get')
  .mockReturnValue({ data: mockDetailData });

it('render default Detail page normally', async () => {
  const { findByText } = renderWithRedux(
    <MemoryRouter initialEntries={[`/detail/${mockSymbol}`]}>
      <App />
    </MemoryRouter>
  );

  expect(
    await findByText(mockDetailData.quote.primaryExchange)
  ).toBeInTheDocument();
  expect(
    await findByText(`${mockDetailData.company.symbol} Stock Chart`)
  ).toBeInTheDocument();
  expect(await findByText(mockDetailData.news[0].headline)).toBeInTheDocument();
  expect(
    await findByText(mockDetailData.company.description)
  ).toBeInTheDocument();
});

it('render loading icon when fetching Detail data', async () => {
  jest.spyOn(hookCollections, 'useLocalStateFetching').mockReturnValueOnce({
    isFetchingDetailsOfSymbol: true,
    errorOnDetailsOfSymbol: '',
    detailsOfSymbol: ''
  });

  const { findByAltText } = renderWithRedux(
    <MemoryRouter initialEntries={[`/detail/${mockSymbol}`]}>
      <App />
    </MemoryRouter>
  );

  expect(await findByAltText('loading icon')).toBeInTheDocument();
});

it('render error message when fetching encounter a problem', async () => {
  const errorMessage = 'timeout';

  mockAxiosInstance.mockReturnValueOnce(
    Promise.reject(new Error(errorMessage))
  );

  const { findByText } = renderWithRedux(
    <MemoryRouter initialEntries={[`/detail/${mockSymbol}`]}>
      <App />
    </MemoryRouter>
  );

  expect(await findByText(`Error: ${errorMessage}`)).toBeInTheDocument();
});
