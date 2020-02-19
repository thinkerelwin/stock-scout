import React from 'react';
import '../assets/styles/main.scss';
import './App.scss';

import Menu from './menu/Menu';
import Home from './home/Home';
import News from './news/News';
import Screener from './screener/Screener';
import Detail from './detail/Detail';
import Contact from './contact/Contact';
import Footer from './footer/Footer';

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
          <Route path="/detail/:symbol">
            <Detail />
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
