import React, { useState } from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';

import Categories from './Categories';

import './Screener.scss';

const topList = [
  { url: 'Most Active', name: 'Most Active' },
  { url: 'Gainers', name: 'Top Gainers' },
  { url: 'Losers', name: 'Top Losers' }
];

const Screener = () => {
  let { path } = useRouteMatch();
  const [currentTab, setCurrentTab] = useState(topList[0].url);

  return (
    <main className="screener menu-margin">
      <div className="screener-box">
        <Categories
          topList={topList}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />

        <Switch>
          <Route path={`${path}/:category`}>
            {/* <p>category</p> */}
            <Route path={`${path}/:category/:tab`}>
              <p>tab</p>
            </Route>
          </Route>
        </Switch>
      </div>
    </main>
  );
};

export default Screener;
