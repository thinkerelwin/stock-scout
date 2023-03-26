import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { renderWithRedux } from '../../../setupTests';
import instance from '../../../api/IEXCloud';
import { mockRecentNewsData } from '../../../mockData';

import App from '../../App';

beforeEach(() => {
  jest.spyOn(instance, 'get').mockImplementation((route, { params }) => {
    return Promise.resolve({ data: mockRecentNewsData });
  });
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

it('render loading icon when fetching news', async () => {
  jest.spyOn(instance, 'get').mockImplementation((route, { params }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: mockRecentNewsData });
      }, 500);
    });
  });

  renderWithRedux(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(await screen.findByAltText('loading icon')).toBeInTheDocument();
});

it('render error message when fetching news failed', async () => {
  const errorMessage = 'timeout of 1ms exceeded';
  jest.spyOn(instance, 'get').mockRejectedValue(new Error(errorMessage));

  renderWithRedux(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(await screen.findByText(`Error: ${errorMessage}`)).toBeInTheDocument();
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

it('render news normally on large screen', async () => {
  await import('../../../__mocks__/matchMediaThatMatches.mock');
  renderWithRedux(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
    {
      preloadedState: {
        sizeDetection: {
          isMediumSize: true,
        },
      },
    }
  );

  const headlineText = await screen.findAllByText(
    mockRecentNewsData[0].headline
  );

  expect(headlineText.length).toBe(1);
});
