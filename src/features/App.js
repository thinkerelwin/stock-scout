import React from 'react';
import '../assets/styles/main.scss';
import './App.scss';

import Menu from './menu/Menu';
import Home from './home/Home';
import News from './news/News';
import Contact from './contact/Contact';
import Screener from './screener/Screener';
import Footer from './Footer/Footer';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Menu />
        <Switch>
          <Route path="/news">
            <News />
          </Route>
          <Route path="/screener">
            <Screener />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
