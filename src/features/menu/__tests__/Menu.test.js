import React from 'react';
import { Provider } from 'react-redux';
import store from '../../../store';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';

import Menu, { menuLink } from '../Menu';

function renderWithRedux(ui) {
  return render(<Provider store={store}>{ui}</Provider>);
}

it('loads and displays Menu noramlly', async () => {
  const { findAllByTestId } = renderWithRedux(
    <Router>
      <Menu />
    </Router>
  );

  const renderedMenuElment = await findAllByTestId('menu-link');
  const renderedMenu = renderedMenuElment.map(elment => elment.textContent);
  const MenuItems = menuLink.map(item => item.name);
  expect(renderedMenu).toEqual(MenuItems);
});
