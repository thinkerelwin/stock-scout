import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './features/App';

const rootNode = document.getElementById('root');
const root = createRoot(rootNode);

const render = () => {
  root.render(
    <StrictMode>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </StrictMode>
  );
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./features/App', render);
}
