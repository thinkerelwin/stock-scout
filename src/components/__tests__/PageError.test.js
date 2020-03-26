import React from 'react';

import { MemoryRouter } from 'react-router';

import App from '../../features/App';
import { renderWithRedux } from '../../setupTests';

it('shows 404 page when landing on a non exist page', async () => {
  const { findByText } = renderWithRedux(
    <MemoryRouter initialEntries={['/not-match']}>
      <App />
    </MemoryRouter>
  );

  expect(await findByText('watch other pens')).toBeInTheDocument();
});
