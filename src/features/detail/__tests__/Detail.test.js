import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { renderWithRedux } from '../../../setupTests';
import { mockDetailData } from '../../../__mocks__/mockData';

import * as hookCollections from '../../../utils/customHooks';
import App from '../../App';

const mockSymbol = mockDetailData.quote.symbol;
const dataFetchingMethod = jest.spyOn(hookCollections, 'useLocalStateFetching');

dataFetchingMethod.mockReturnValue({
  isFetchingDetailsOfSymbol: false,
  errorOnDetailsOfSymbol: '',
  detailsOfSymbol: mockDetailData
});

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
  dataFetchingMethod.mockReturnValueOnce({
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

  dataFetchingMethod.mockReturnValueOnce({
    isFetchingDetailsOfSymbol: false,
    errorOnDetailsOfSymbol: errorMessage,
    detailsOfSymbol: ''
  });

  const { findByText } = renderWithRedux(
    <MemoryRouter initialEntries={[`/detail/${mockSymbol}`]}>
      <App />
    </MemoryRouter>
  );

  expect(await findByText(errorMessage)).toBeInTheDocument();
});
