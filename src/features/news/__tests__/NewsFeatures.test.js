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

it('render NewsFeatures normally', async () => {
  renderWithRedux(
    <MemoryRouter initialEntries={['/news']}>
      <App />
    </MemoryRouter>
  );

  expect(
    await screen.findByTitle(mockNewsFeaturesData.GOOG.news[0].headline)
  ).toBeInTheDocument();
});

it('render loading icon when fetching featureNews', async () => {
  jest.spyOn(hookCollections, 'useLocalStateFetching').mockReturnValueOnce({
    isFetchingFeatureNews: true,
    errorOnFeatureNews: '',
    featureNews: '',
  });

  renderWithRedux(
    <MemoryRouter initialEntries={['/news']}>
      <App />
    </MemoryRouter>
  );

  expect(await screen.findByAltText('loading icon')).toBeInTheDocument();
});

it('render error message when fetching featureNews failed', async () => {
  const errorMessage = 'Error: timeout of 1ms exceeded';
  jest.spyOn(hookCollections, 'useLocalStateFetching').mockReturnValueOnce({
    isFetchingFeatureNews: false,
    errorOnFeatureNews: errorMessage,
    featureNews: '',
  });

  renderWithRedux(
    <MemoryRouter initialEntries={['/news']}>
      <App />
    </MemoryRouter>
  );

  expect(await screen.findByText(errorMessage)).toBeInTheDocument();
});
