import React from 'react';
import '../assets/styles/main.scss';
import './App.scss';

import Menu from './menu/Menu';
import Main from './home/Home';
import News from './news/News';
import Stocks from './stocks/Stocks';
import Contact from './Contact';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="container">
        <Menu />
        <Switch>
          <Route path="/news">
            <News />
          </Route>
          <Route path="/stocks">
            <Stocks />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
