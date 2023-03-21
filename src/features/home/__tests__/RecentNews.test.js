import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { renderWithRedux } from '../../../setupTests';
import { mockRecentNewsData } from '../../../mockData';

import * as reduxHooks from 'react-redux';
import * as hookCollections from '../../../utils/customHooks';
import App from '../../App';

// default state
const fakeRecentNewsData = {
  isFetchingRecentNewsList: false,
  errorOnRecentNewsList: '',
  recentNewsList: mockRecentNewsData,
};

beforeEach(() => {
  jest
    .spyOn(hookCollections, 'useLocalStateFetching')
    .mockImplementation(({ naming }) => {
      switch (naming) {
        case 'recentNewsList':
          return fakeRecentNewsData;
        default:
          throw Error('fake data not found');
      }
    });

  jest
    .spyOn(reduxHooks, 'useSelector')
    .mockReturnValue({ isMediumSize: false });
});

it('render slider correctly on small screen', async () => {
  renderWithRedux(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  // react slick will return multiple same object for input
  const headlineText = await screen.findAllByText(
    mockRecentNewsData[0].headline
  );
  expect(headlineText.length).toBeGreaterThan(1);
});

it('render news normally on large screen', async () => {
  // isMediumSize will be called twice
  jest
    .spyOn(reduxHooks, 'useSelector')
    .mockReturnValueOnce({ isMediumSize: true })
    .mockReturnValueOnce({ isMediumSize: true });

  renderWithRedux(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const headlineText = await screen.findAllByText(
    mockRecentNewsData[0].headline
  );
  expect(headlineText.length).toBe(1);
});

it('render loading icon when fetching news', async () => {
  jest.spyOn(hookCollections, 'useLocalStateFetching').mockReturnValueOnce({
    isFetchingRecentNewsList: true,
    errorOnRecentNewsList: '',
    recentNewsList: '',
  });

  renderWithRedux(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(await screen.findByAltText('loading icon')).toBeInTheDocument();
});

it('render error message when fetching news failed', async () => {
  const errorMessage = 'Error: timeout of 1ms exceeded';
  jest.spyOn(hookCollections, 'useLocalStateFetching').mockReturnValueOnce({
    isFetchingRecentNewsList: false,
    errorOnRecentNewsList: errorMessage,
    recentNewsList: '',
  });

  renderWithRedux(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(await screen.findByText(errorMessage)).toBeInTheDocument();
});

it('shows the second slide when navigation button is clicked', async () => {
  renderWithRedux(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  // less optimal, but 'react-slick' doesn't have option to add testId on the button or slider window
  fireEvent.click(await screen.findByText('2'));

  // eslint-disable-next-line testing-library/no-node-access
  expect(document.querySelector('.slick-current').dataset.index).toBe('1');
});
