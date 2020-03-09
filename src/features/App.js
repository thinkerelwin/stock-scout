import React, { Suspense, lazy } from 'react';
import '../assets/styles/main.scss';

import Menu from './menu/Menu';
import Home from './home/Home';
import News from './news/News';
import Screener from './screener/Screener';
import Detail from './detail/Detail';
import Footer from './footer/Footer';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const PageError = lazy(() => import('../components/PageError'));

const App = () => {
  return (
    <Router>
      <div className="container">
        <Menu />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/news">
            <News />
          </Route>
          <Route path="/screener">
            <Screener />
          </Route>
          <Route path="/detail/:symbol">
            <Detail />
          </Route>
          <Suspense fallback={<div className="page-error-layout"></div>}>
            <Route path="*">
              <PageError />
            </Route>
          </Suspense>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
