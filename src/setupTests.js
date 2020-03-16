import '@testing-library/jest-dom/extend-expect';

import './__mocks__/matchMedia.mock';

import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import store from './store';

export function renderWithRedux(ui) {
  return render(<Provider store={store}>{ui}</Provider>);
}
