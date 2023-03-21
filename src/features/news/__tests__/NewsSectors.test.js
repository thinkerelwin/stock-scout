import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';

import { renderWithRedux } from '../../../setupTests';
import { mockNewsFeaturesData, mockNewsSectorsData } from '../../../mockData';

import * as hookCollections from '../../../utils/customHooks';
import App from '../../App';

const fakeNewsFeaturesData = {
  isFetchingFeatureNews: false,
  errorOnFeatureNews: '',
  featureNews: mockNewsFeaturesData,
};

const fakeNewsSectorsData = {
  isFetchingSectorNews: false,
  errorOnSectorNews: '',
  sectorNews: mockNewsSectorsData,
};

jest
  .spyOn(hookCollections, 'useLocalStateFetching')
  .mockImplementation(({ naming }) => {
    switch (naming) {
      case 'featureNews':
        return fakeNewsFeaturesData;
      case 'sectorNews':
        return fakeNewsSectorsData;
      default:
        throw Error('fake data not found');
    }
  });

it('render NewsSectors normally', async () => {
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
  jest
    .spyOn(hookCollections, 'useLocalStateFetching')
    .mockReturnValueOnce(fakeNewsFeaturesData)
    .mockReturnValueOnce({
      isFetchingSectorNews: true,
      errorOnSectorNews: '',
      sectorNews: '',
    });

  renderWithRedux(
    <MemoryRouter initialEntries={['/news']}>
      <App />
    </MemoryRouter>
  );

  expect(await screen.findByAltText('loading icon')).toBeInTheDocument();
});

it('render error message when fetching sectorNews failed', async () => {
  const errorMessage = 'Error: timeout of 1ms exceeded';
  jest
    .spyOn(hookCollections, 'useLocalStateFetching')
    .mockReturnValueOnce(fakeNewsFeaturesData)
    .mockReturnValueOnce({
      isFetchingSectorNews: false,
      errorOnSectorNews: errorMessage,
      sectorNews: '',
    });

  renderWithRedux(
    <MemoryRouter initialEntries={['/news']}>
      <App />
    </MemoryRouter>
  );

  expect(await screen.findByText(errorMessage)).toBeInTheDocument();
});
