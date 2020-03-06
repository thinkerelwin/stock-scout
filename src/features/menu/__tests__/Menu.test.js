import React from 'react';
import { Provider } from 'react-redux';
import store from '../../../store';

import { render, fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';

import Menu, { menuLink } from '../Menu';

function renderWithRedux(ui) {
  return render(<Provider store={store}>{ui}</Provider>);
}

it('loads and displays Menu', async () => {
  const { findByText } = renderWithRedux(
    <Router>
      <Menu />
    </Router>
  );

  expect(await findByText(menuLink[0].name)).toBeInTheDocument();
  expect(await findByText(menuLink[1].name)).toBeInTheDocument();
  expect(await findByText(menuLink[2].name)).toBeInTheDocument();
});
