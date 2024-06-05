import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';

import { renderWithRedux } from '../../../setupTests';
import instance from '../../../api/IEXCloud';
import { mockNewsFeaturesData, mockNewsSectorsData } from '../../../mockData';

import App from '../../App';

it('render NewsFeatures normally', async () => {
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
    await screen.findByTitle(mockNewsFeaturesData.AMZN.news[0].headline)
  ).toBeInTheDocument();
});

it('render loading icon when fetching featureNews', async () => {
  jest.spyOn(instance, 'get').mockImplementation((route, { params }) => {
    if (params.symbols === 'goog,amzn,fb') {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ data: mockNewsFeaturesData });
        }, 500);
      });
    } else {
      return Promise.resolve({ data: mockNewsSectorsData });
    }
  });

  renderWithRedux(
    <MemoryRouter initialEntries={['/news']}>
      <App />
    </MemoryRouter>
  );

  expect(await screen.findByAltText('loading icon')).toBeInTheDocument();
});

it('render error message when fetching featureNews failed', async () => {
  const errorMessage = 'timeout of 1ms exceeded';
  jest.spyOn(instance, 'get').mockImplementation((route, { params }) => {
    if (params.symbols === 'goog,amzn,fb') {
      return Promise.reject(new Error(errorMessage));
    } else {
      return Promise.resolve({ data: mockNewsSectorsData });
    }
  });

  renderWithRedux(
    <MemoryRouter initialEntries={['/news']}>
      <App />
    </MemoryRouter>
  );

  expect(await screen.findByText(`Error: ${errorMessage}`)).toBeInTheDocument();
});
