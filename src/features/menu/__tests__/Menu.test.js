import React from 'react';
import { fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { renderWithRedux } from '../../../setupTests';
import {
  mockRecentNewsData,
  mockNewsFeaturesData,
  mockNewsSectorsData,
  mockCategories,
  mockScreenerList
} from '../../../__mocks__/mockData';

import * as hookCollections from '../../../utils/customHooks';
import instance from '../../../api/IEXCloud';
import { menuLink } from '../Menu';
import App from '../../App';
import Menu from '../Menu';

it('loads and displays Menu noramlly', async () => {
  const { findAllByTestId } = renderWithRedux(
    <MemoryRouter>
      <Menu />
    </MemoryRouter>
  );

  const renderedMenuElment = await findAllByTestId('menu-link');
  const renderedMenu = renderedMenuElment.map(elment => elment.textContent);
  const MenuItems = menuLink.map(item => item.name);
  expect(renderedMenu).toEqual(MenuItems);
});

it('open menus when navbar button is clicked', async () => {
  const { findByTestId } = renderWithRedux(
    <MemoryRouter>
      <Menu />
    </MemoryRouter>
  );

  fireEvent.click(await findByTestId('navbar-button'));

  // less optimal, but jsdom can't load external scss currently, so this is a workaround
  expect(document.body.classList.contains('no-scroll')).toBeTruthy();
});

it('close menus when navbar button is clicked on open state', async () => {
  const { findByTestId } = renderWithRedux(
    <MemoryRouter>
      <Menu />
    </MemoryRouter>
  );
  fireEvent.click(await findByTestId('navbar-button'));

  fireEvent.click(await findByTestId('navbar-button'));

  // less optimal, but jsdom can't load external scss currently, so this is a workaround
  expect(document.body.classList.contains('no-scroll')).toBeFalsy();
});

describe('route navigation', () => {
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

  const fakeRecentNewsData = {
    isFetchingRecentNewsList: false,
    errorOnRecentNewsList: '',
    recentNewsList: mockRecentNewsData
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
      const { findByText, findByTestId } = renderWithRedux(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );

      fireEvent.click(await findByText(name));

      expect(await findByTestId(`location-${name}`)).toBeInTheDocument();
    });
  });
});
