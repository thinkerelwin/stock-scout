import React from 'react';
import { MemoryRouter } from 'react-router-dom';
// import axios from 'axios';

import { renderWithRedux } from '../../../setupTests';
import { mockDetailData } from '../../../__mocks__/mockData';

import * as hookCollections from '../../../utils/customHooks';
import instance from '../../../api/IEXCloud';
import App from '../../App';

const mockSymbol = mockDetailData.quote.symbol;
let mockedAxios;
beforeEach(() => {
  mockedAxios = jest
    .spyOn(instance, 'get')
    .mockResolvedValue({ data: mockDetailData });
});

afterEach(() => {
  jest.restoreAllMocks();
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

it('render error message when fetching encounter a problem', async () => {
  const errorMessage = 'timeout';

  mockedAxios.mockRejectedValueOnce(new Error(errorMessage));

  const { findByText } = renderWithRedux(
    <MemoryRouter initialEntries={[`/detail/${mockSymbol}`]}>
      <App />
    </MemoryRouter>
  );

  expect(await findByText(`Error: ${errorMessage}`)).toBeInTheDocument();
});
