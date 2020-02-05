import React from 'react';
import '../assets/styles/main.scss';
import './App.scss';

import Menu from './menu/Menu';
import Home from './home/Home';
import News from './news/News';
import Stocks from './stocks/Stocks';
import Footer from './Footer/Footer';

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
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
