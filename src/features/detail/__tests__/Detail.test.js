import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';

import { renderWithRedux } from '../../../setupTests';
import { mockDetailData } from '../../../mockData';

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
  renderWithRedux(
    <MemoryRouter initialEntries={[`/detail/${mockSymbol}`]}>
      <App />
    </MemoryRouter>
  );

  expect(
    await screen.findByText(mockDetailData.quote.primaryExchange)
  ).toBeInTheDocument();
  expect(
    await screen.findByText(`${mockDetailData.company.symbol} Stock Chart`)
  ).toBeInTheDocument();
  expect(
    await screen.findByText(mockDetailData.news[0].headline)
  ).toBeInTheDocument();
  expect(
    await screen.findByText(mockDetailData.company.description)
  ).toBeInTheDocument();
});

it('render error message when fetching encounter a problem', async () => {
  const errorMessage = 'timeout';

  mockedAxios.mockRejectedValueOnce(new Error(errorMessage));

  renderWithRedux(
    <MemoryRouter initialEntries={[`/detail/${mockSymbol}`]}>
      <App />
    </MemoryRouter>
  );

  expect(await screen.findByText(`Error: ${errorMessage}`)).toBeInTheDocument();
});
