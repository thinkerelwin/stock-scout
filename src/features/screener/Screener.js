import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ScreenerCategories from './ScreenerCategories';
import ScreenerTable from './ScreenerTable';

import 'react-virtualized/styles.css';
import './Screener.scss';

export const topList = ['Most Active', 'Top Gainers', 'Top Losers'];

const Screener = () => {
  return (
    <main className="screener menu-margin" data-testid="location-Screener">
      <div className="screener-box">
        <ScreenerCategories topList={topList} />
        <Routes>
          <Route
            path={`:category`}
            element={<ScreenerTable topList={topList} />}
          ></Route>
        </Routes>
      </div>
    </main>
  );
};

export default Screener;
