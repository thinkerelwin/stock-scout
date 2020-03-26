import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';

import { renderWithRedux } from '../../../setupTests';
import { mockCategories, mockScreenerList } from '../../../__mocks__/mockData';
import { topList } from '../Screener';

import instance from '../../../api/IEXCloud';
import App from '../../App';

const dataFetchingMethod = jest.spyOn(instance, 'get');

dataFetchingMethod.mockImplementation((route, params) => {
  return params ? { data: mockScreenerList } : { data: mockCategories };
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

fit('change categories on click aother category', async () => {
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

  expect(dataFetchingMethod).toHaveBeenCalledTimes(3);
  expect(dataFetchingMethod).toHaveBeenCalledWith(
    `/stock/market/collection/sector`,
    {
      params: {
        collectionName: nameOfNextCategory
      }
    }
  );
});
