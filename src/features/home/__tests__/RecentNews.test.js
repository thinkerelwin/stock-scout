import React from 'react';
import { fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { renderWithRedux } from '../../../setupTests';
import { mockRecentNewsData } from '../../../__mocks__/mockData';

import * as reduxHooks from 'react-redux';
import * as hookCollections from '../../../utils/customHooks';
import App from '../../App';

// default state
jest.spyOn(hookCollections, 'useRecentNewsDataFetching').mockReturnValue({
  isFetchingRecentNewsList: false,
  errorOnRecentNewsList: '',
  recentNewsList: mockRecentNewsData
});
jest.spyOn(reduxHooks, 'useSelector').mockReturnValue({ isMediumSize: false });

it('render slider correctly on small screen', async () => {
  const { findAllByText } = renderWithRedux(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  // react slick will return multiple same object for input
  const headlineText = await findAllByText(mockRecentNewsData[0].headline);
  expect(headlineText.length).toBeGreaterThan(1);
});

it('render news normally on large screen', async () => {
  // isMediumSize will be called twice
  jest
    .spyOn(reduxHooks, 'useSelector')
    .mockReturnValueOnce({ isMediumSize: true })
    .mockReturnValueOnce({ isMediumSize: true });

  const { findAllByText } = renderWithRedux(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const headlineText = await findAllByText(mockRecentNewsData[0].headline);
  expect(headlineText.length).toBe(1);
});

it('render loading icon when fetching news', async () => {
  jest.spyOn(hookCollections, 'useRecentNewsDataFetching').mockReturnValueOnce({
    isFetchingRecentNewsList: true,
    errorOnRecentNewsList: '',
    recentNewsList: ''
  });

  const { findByAltText } = renderWithRedux(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(await findByAltText('loading icon')).toBeInTheDocument();
});

it('render error message when fetching news failed', async () => {
  const errorMessage = 'Error: timeout of 1ms exceeded';
  jest.spyOn(hookCollections, 'useRecentNewsDataFetching').mockReturnValueOnce({
    isFetchingRecentNewsList: false,
    errorOnRecentNewsList: errorMessage,
    recentNewsList: ''
  });

  const { findByText } = renderWithRedux(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(await findByText(errorMessage)).toBeInTheDocument();
});

it('shows the second slide when navigation button is clicked', async () => {
  const { findByText } = renderWithRedux(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  //less optimal, but 'react-slick' doesn't have option to add testId on the button or slider window
  fireEvent.click(await findByText('2'));

  expect(document.querySelector('.slick-current').dataset.index).toBe('1');
});
