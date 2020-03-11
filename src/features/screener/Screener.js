import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';

import ScreenerCategories from './ScreenerCategories';
import ScreenerTable from './ScreenerTable';

import 'react-virtualized/styles.css';
import './Screener.scss';

const topList = ['Most Active', 'Top Gainers', 'Top Losers'];

const Screener = () => {
  let { path } = useRouteMatch();

  return (
    <main className="screener menu-margin" data-testid="location-Screener">
      <div className="screener-box">
        <ScreenerCategories topList={topList} />
        <Switch>
          <Route path={`${path}/:category`}>
            <ScreenerTable topList={topList} />
          </Route>
        </Switch>
      </div>
    </main>
  );
};

export default Screener;
