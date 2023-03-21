import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { renderWithRedux } from '../../../setupTests';
import {
  mockRecentNewsData,
  mockNewsFeaturesData,
  mockNewsSectorsData,
  mockCategories,
  mockScreenerList,
} from '../../../mockData';

import * as hookCollections from '../../../utils/customHooks';
import instance from '../../../api/IEXCloud';
import menuLink from '../../../utils/constant/menuLink.json';
import App from '../../App';
import Menu from '../Menu';

it('loads and displays Menu noramlly', async () => {
  renderWithRedux(
    <MemoryRouter>
      <Menu />
    </MemoryRouter>
  );

  const renderedMenuElment = await screen.findAllByTestId('menu-link');
  const renderedMenu = renderedMenuElment.map((elment) => elment.textContent);
  const MenuItems = menuLink.map((item) => item.name);
  expect(renderedMenu).toEqual(MenuItems);
});

it('open menus when navbar button is clicked', async () => {
  renderWithRedux(
    <MemoryRouter>
      <Menu />
    </MemoryRouter>
  );

  fireEvent.click(await screen.findByTestId('navbar-button'));

  // less optimal, but jsdom can't load external scss currently, so this is a workaround
  expect(document.body).toHaveClass('no-scroll');
});

it('close menus when navbar button is clicked on open state', async () => {
  renderWithRedux(
    <MemoryRouter>
      <Menu />
    </MemoryRouter>
  );
  fireEvent.click(await screen.findByTestId('navbar-button'));

  fireEvent.click(await screen.findByTestId('navbar-button'));

  // less optimal, but jsdom can't load external scss currently, so this is a workaround
  expect(document.body).not.toHaveClass('no-scroll');
});

describe('route navigation', () => {
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

  const fakeRecentNewsData = {
    isFetchingRecentNewsList: false,
    errorOnRecentNewsList: '',
    recentNewsList: mockRecentNewsData,
  };

  jest
    .spyOn(hookCollections, 'useLocalStateFetching')
    .mockImplementation(({ naming }) => {
      switch (naming) {
        case 'featureNews':
          return fakeNewsFeaturesData;
        case 'sectorNews':
          return fakeNewsSectorsData;
        case 'recentNewsList':
          return fakeRecentNewsData;
        default:
          throw Error('fake data not found');
      }
    });

  jest.spyOn(instance, 'get').mockImplementation((route, params) => {
    return route === categoryRoute
      ? { data: mockCategories }
      : { data: mockScreenerList };
  });
  const categoryRoute = '/ref-data/sectors';

  menuLink.forEach(({ name }) => {
    it(`navigate to news section when "${name}" link is clicked`, async () => {
      renderWithRedux(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );

      fireEvent.click(await screen.findByText(name));

      expect(await screen.findByTestId(`location-${name}`)).toBeInTheDocument();
    });
  });
});
