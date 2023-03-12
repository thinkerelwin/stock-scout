import React, { Suspense, lazy } from 'react';
import '../assets/styles/main.scss';

import Menu from './menu/Menu';
import Home from './home/Home';
import News from './news/News';
import Screener from './screener/Screener';
import Detail from './detail/Detail';
import Footer from './footer/Footer';

import { Routes, Route } from 'react-router-dom';

const PageError = lazy(() => import('../components/PageError'));

const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route
          path="/news"
          element={
            <>
              <Menu />
              <News />
              <Footer />
            </>
          }
        />
        <Route
          path="/screener/*"
          element={
            <>
              <Menu />
              <Screener />
              <Footer />
            </>
          }
        />
        <Route
          path="/detail/:symbol"
          element={
            <>
              <Menu />
              <Detail />
              <Footer />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <Menu />
              <Home />
              <Footer />
            </>
          }
        />

        <Route
          path="*"
          element={
            <Suspense fallback={<div className="page-error-layout"></div>}>
              <PageError />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
