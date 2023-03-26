import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';

import { renderWithRedux } from '../../../setupTests';
import instance from '../../../api/IEXCloud';
import { mockNewsFeaturesData, mockNewsSectorsData } from '../../../mockData';

import App from '../../App';

it('render NewsSectors normally', async () => {
  jest.spyOn(instance, 'get').mockImplementation((route, { params }) => {
    if (params.symbols === 'goog,amzn,fb') {
      return Promise.resolve({ data: mockNewsFeaturesData });
    } else {
      return Promise.resolve({ data: mockNewsSectorsData });
    }
  });

  renderWithRedux(
    <MemoryRouter initialEntries={['/news']}>
      <App />
    </MemoryRouter>
  );

  expect(
    await screen.findByText(mockNewsSectorsData.XOM.news[0].headline)
  ).toBeInTheDocument();
});

it('render loading icon when fetching sectorNews', async () => {
  jest.spyOn(instance, 'get').mockImplementation((route, { params }) => {
    if (params.symbols === 'goog,amzn,fb') {
      return Promise.resolve({ data: mockNewsFeaturesData });
    } else {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ data: mockNewsSectorsData });
        }, 500);
      });
    }
  });

  renderWithRedux(
    <MemoryRouter initialEntries={['/news']}>
      <App />
    </MemoryRouter>
  );

  expect(await screen.findByAltText('loading icon')).toBeInTheDocument();
});

it('render error message when fetching sectorNews failed', async () => {
  const errorMessage = 'timeout of 1ms exceeded';
  jest.spyOn(instance, 'get').mockImplementation((route, { params }) => {
    if (params.symbols === 'goog,amzn,fb') {
      return Promise.resolve({ data: mockNewsFeaturesData });
    } else {
      return Promise.reject(new Error(errorMessage));
    }
  });

  renderWithRedux(
    <MemoryRouter initialEntries={['/news']}>
      <App />
    </MemoryRouter>
  );

  expect(await screen.findByText(`Error: ${errorMessage}`)).toBeInTheDocument();
});
