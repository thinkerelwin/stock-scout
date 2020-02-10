import React, { useState } from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import { Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css';

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
            {/* TODO example needs to be modified */}
            <Table
              width={300}
              height={300}
              headerHeight={20}
              rowHeight={30}
              rowCount={topList.length}
              rowGetter={({ index }) => topList[index]}
            >
              <Column width={200} label="Description" dataKey="url" />
              <Column label="Name" dataKey="name" width={100} />
            </Table>
            ,
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
