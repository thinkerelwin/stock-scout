import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';

import Categories from './Categories';
import ScreenerTable from './ScreenerTable';

import 'react-virtualized/styles.css';
import './Screener.scss';

const topList = ['Most Active', 'Top Gainers', 'Top Losers'];

const Screener = () => {
  let { path } = useRouteMatch();

  return (
    <main className="screener menu-margin">
      <div className="screener-box">
        <Categories topList={topList} />
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
