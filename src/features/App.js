import React, { Suspense, lazy } from 'react';
import '../assets/styles/main.scss';

import Menu from './menu/Menu';
import Home from './home/Home';
import News from './news/News';
import Screener from './screener/Screener';
import Detail from './detail/Detail';
import Footer from './footer/Footer';

import { Switch, Route } from 'react-router-dom';

const PageError = lazy(() => import('../components/PageError'));

const App = () => {
  return (
    <div className="container">
      <Switch>
        <Route path="/news">
          <Menu />
          <News />
          <Footer />
        </Route>
        <Route path="/screener">
          <Menu />
          <Screener />
          <Footer />
        </Route>
        <Route path="/detail/:symbol">
          <Menu />
          <Detail />
          <Footer />
        </Route>
        <Route exact path="/">
          <Menu />
          <Home />
          <Footer />
        </Route>
        <Suspense fallback={<div className="page-error-layout"></div>}>
          <Route path="*">
            <PageError />
          </Route>
        </Suspense>
      </Switch>
    </div>
  );
};

export default App;
