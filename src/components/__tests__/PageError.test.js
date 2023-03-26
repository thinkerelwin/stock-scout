import React from 'react';
import { MemoryRouter } from 'react-router';
import { screen } from '@testing-library/react';

import App from '../../features/App';
import { renderWithRedux } from '../../setupTests';

it('shows 404 page when landing on a non exist page', async () => {
  renderWithRedux(
    <MemoryRouter initialEntries={['/not-match']}>
      <App />
    </MemoryRouter>
  );

  expect(await screen.findByText('watch other pens')).toBeInTheDocument();
});
