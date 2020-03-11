import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

import App from '../../features/App';
import { renderWithRedux } from '../../features/menu/__tests__/Menu.test';

it('shows 404 page when landing on a non exist page', async () => {
  const history = createMemoryHistory();
  history.push('/not-match');
  const { findByText } = renderWithRedux(
    <Router history={history}>
      <App />
    </Router>
  );

  // TODO failed despite it's the same structure for example
  expect(await findByText('watch other pens')).toBeInTheDocument();
  // expect(history.location.pathname).toBe('/not-exist');
});
