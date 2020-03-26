import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { renderWithRedux } from '../../../setupTests';
import {
  mockNewsFeaturesData,
  mockNewsSectorsData
} from '../../../__mocks__/mockData';

import * as hookCollections from '../../../utils/customHooks';
import App from '../../App';

jest.spyOn(hookCollections, 'useNewsFeaturesDataFetching').mockReturnValue({
  isFetchingFeatureNews: false,
  errorOnFeatureNews: '',
  featureNews: mockNewsFeaturesData
});

jest.spyOn(hookCollections, 'useNewsSectorsDataFetching').mockReturnValue({
  isFetchingSectorNews: false,
  errorOnSectorNews: '',
  sectorNews: mockNewsSectorsData
});

it('render NewsFeatures normally', async () => {
  const { findByTitle } = renderWithRedux(
    <MemoryRouter initialEntries={['/news']}>
      <App />
    </MemoryRouter>
  );

  expect(
    await findByTitle(mockNewsFeaturesData.GOOG.news[0].headline)
  ).toBeInTheDocument();
});

it('render formated time correctly', async () => {
  const { findByText } = renderWithRedux(
    <MemoryRouter initialEntries={['/news']}>
      <App />
    </MemoryRouter>
  );

  expect(await findByText('Mar 24, 2020')).toBeInTheDocument();
});
