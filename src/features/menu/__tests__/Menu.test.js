import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import store from '../../../store';
import { MemoryRouter } from 'react-router-dom';

import { menuLink } from '../Menu';
import App from '../../App';

export function renderWithRedux(ui) {
  return render(<Provider store={store}>{ui}</Provider>);
}

it('loads and displays Menu noramlly', async () => {
  const { findAllByTestId } = renderWithRedux(
    <MemoryRouter>
      <App />
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
      <App />
    </MemoryRouter>
  );

  fireEvent.click(await findByTestId('navbar-button'));

  // less optimal, but jsdom can't load external scss currently, so this is a workaround
  expect(document.body.classList.contains('no-scroll')).toBeTruthy();
});

it('close menus when navbar button is clicked on open state', async () => {
  const { findByTestId } = renderWithRedux(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  fireEvent.click(await findByTestId('navbar-button'));

  fireEvent.click(await findByTestId('navbar-button'));

  // less optimal, but jsdom can't load external scss currently, so this is a workaround
  expect(document.body.classList.contains('no-scroll')).toBeFalsy();
});

describe('route navigation', () => {
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
