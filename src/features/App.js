import React from 'react';
import '../assets/styles/normalize.css';
import '../assets/styles/base.scss';
import '../assets/styles/mixins.scss';

import Menu from './menu/Menu';
import Main from './home/Home';
import News from './news/News';
import Stocks from './stocks/Stocks';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="container">
        <Menu />
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/news">
            <News />
          </Route>
          <Route path="/stocks">
            <Stocks />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
