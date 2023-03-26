import '@testing-library/jest-dom/extend-expect';
import { configureStore } from '@reduxjs/toolkit';
import PropTypes from 'prop-types';

import rootReducer from './store/rootReducer';

import './__mocks__/matchMedia.mock';

import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

export function renderWithRedux(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: rootReducer,
      preloadedState: preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  Wrapper.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
