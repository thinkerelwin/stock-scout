import React from 'react';

import { createBrowserHistory } from 'history';
import { Router } from 'react-router';

import App from '../../features/App';
import { renderWithRedux } from '../../setupTests';

it('shows 404 page when landing on a non exist page', async () => {
  // using browserhistory here, otherwise loading pageError component won't be trigger
  const history = createBrowserHistory();
  history.push('/not-match');
  const { findByText } = renderWithRedux(
    <Router history={history}>
      <App />
    </Router>
  );

  expect(await findByText('watch other pens')).toBeInTheDocument();
  // manual return to homepage after testing
  history.push('/');
});
