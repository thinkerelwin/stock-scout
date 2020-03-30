import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { renderWithRedux } from '../../../setupTests';
import {
  mockNewsFeaturesData,
  mockNewsSectorsData
} from '../../../__mocks__/mockData';

import * as hookCollections from '../../../utils/customHooks';
import { normalDate } from '../../../utils/formatHelper.js';
import App from '../../App';

const fakeNewsFeaturesData = {
  isFetchingFeatureNews: false,
  errorOnFeatureNews: '',
  featureNews: mockNewsFeaturesData
};

const fakeNewsSectorsData = {
  isFetchingSectorNews: false,
  errorOnSectorNews: '',
  sectorNews: mockNewsSectorsData
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
  const { findByText } = renderWithRedux(
    <MemoryRouter initialEntries={['/news']}>
      <App />
    </MemoryRouter>
  );

  expect(
    await findByText(mockNewsSectorsData.XOM.news[0].headline)
  ).toBeInTheDocument();
});

it('render loading icon when fetching sectorNews', async () => {
  jest
    .spyOn(hookCollections, 'useLocalStateFetching')
    .mockReturnValueOnce(fakeNewsFeaturesData)
    .mockReturnValueOnce({
      isFetchingSectorNews: true,
      errorOnSectorNews: '',
      sectorNews: ''
    });

  const { findByAltText } = renderWithRedux(
    <MemoryRouter initialEntries={['/news']}>
      <App />
    </MemoryRouter>
  );

  expect(await findByAltText('loading icon')).toBeInTheDocument();
});

it('render error message when fetching sectorNews failed', async () => {
  const errorMessage = 'Error: timeout of 1ms exceeded';
  jest
    .spyOn(hookCollections, 'useLocalStateFetching')
    .mockReturnValueOnce(fakeNewsFeaturesData)
    .mockReturnValueOnce({
      isFetchingSectorNews: false,
      errorOnSectorNews: errorMessage,
      sectorNews: ''
    });

  const { findByText } = renderWithRedux(
    <MemoryRouter initialEntries={['/news']}>
      <App />
    </MemoryRouter>
  );

  expect(await findByText(errorMessage)).toBeInTheDocument();
});
