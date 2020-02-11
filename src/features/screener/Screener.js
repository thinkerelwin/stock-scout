import React, { useState } from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import { Column, Table, AutoSizer } from 'react-virtualized';

import Categories from './Categories';
import sectorList from '../../utils/sector-stocks.json';

import 'react-virtualized/styles.css';
import './Screener.scss';

const topList = [
  { url: 'Most Active', name: 'Most Active' },
  { url: 'Gainers', name: 'Top Gainers' },
  { url: 'Losers', name: 'Top Losers' }
];

const Screener = () => {
  let { path } = useRouteMatch();
  const [currentTab, setCurrentTab] = useState(topList[0].url);
  console.log(sectorList);

  const [screenerList, setScreenerList] = useState(sectorList);
  const [sortBy, setSortBy] = useState('symbol');
  const [sortDirection, setSortDirection] = useState('ASC');

  function _sort({ sortBy, sortDirection }) {
    const sortedList = _sortList({ sortBy, sortDirection });

    setScreenerList(sortedList);
    setSortBy(sortBy);
    setSortDirection(sortDirection);
  }

  function _sortList({ sortBy, sortDirection }) {
    return screenerList.reverse();
  }

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
            <div className="table-box">
              {/* <AutoSizer>
                {({ width, height }) => ( */}
              <Table
                width={1225} //61.25 * 16 * 1.25=> TODO should be dynamic
                height={300}
                headerHeight={20}
                rowHeight={30}
                rowCount={sectorList.length}
                rowGetter={({ index }) => sectorList[index]}
                sort={_sort}
                sortBy={sortBy}
                sortDirection={sortDirection}
              >
                <Column
                  label="Description"
                  dataKey="symbol"
                  width={120}
                  flexGrow={1}
                />
                <Column
                  label="Name"
                  dataKey="companyName"
                  width={150}
                  flexGrow={1}
                />
                <Column
                  label="Last"
                  dataKey="latestPrice"
                  width={70}
                  flexGrow={1}
                />
                <Column
                  label="CHG %"
                  dataKey="changePercent"
                  width={70}
                  flexGrow={1}
                />
                <Column label="CHG" dataKey="change" width={100} flexGrow={1} />
                <Column label="VOL" dataKey="volume" width={100} flexGrow={1} />
                <Column
                  label="MKT CAP"
                  dataKey="marketCap"
                  width={100}
                  flexGrow={1}
                />
                <Column
                  label="P/E"
                  dataKey="peRatio"
                  width={100}
                  flexGrow={1}
                />
              </Table>
              {/* )} */}
              {/* </AutoSizer> */}
            </div>
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
