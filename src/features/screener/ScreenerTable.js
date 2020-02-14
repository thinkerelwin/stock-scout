import React, { useState, useEffect } from 'react';
import { Column, Table, AutoSizer } from 'react-virtualized';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import LoadingBox from '../../components/LoadingBox';
import ErrorBox from '../../components/ErrorBox';

import { fetchscreenerTable } from './ScreenerTableSlice';

import './ScreenerTable.scss';

// TODO  handle setScreenerList

function urlChecker(category) {
  const categoriesDictionary = {
    'Top Gainers': 'gainers',
    'Top Losers': 'losers',
    'Most Active': 'mostactive'
  };

  return categoriesDictionary[category]
    ? categoriesDictionary[category]
    : category;
}

const ScreenerTable = ({ topList }) => {
  const dispatch = useDispatch();
  let { category } = useParams();

  const { screenerList, isFetchingList, error } = useSelector(
    state => state.screenerTable
  );

  const [sortBy, setSortBy] = useState('symbol');
  const [sortDirection, setSortDirection] = useState('ASC');

  useEffect(() => {
    // console.log('category', category, urlChecker(category));
    const CollectionType = findCollectionType(category, topList);
    dispatch(fetchscreenerTable(CollectionType, urlChecker(category)));
  }, [category, dispatch, topList]);

  function findCollectionType(category, topList) {
    return topList.find(item => item === category) ? 'list' : 'sector';
  }

  function _sort({ sortBy, sortDirection }) {
    const sortedList = _sortList({ sortBy, sortDirection });

    // setScreenerList(sortedList);
    setSortBy(sortBy);
    setSortDirection(sortDirection);
  }

  function _sortList({ sortBy, sortDirection }) {
    return screenerList.reverse();
  }

  if (isFetchingList) {
    return (
      <div className="table-box">
        <LoadingBox size="large" />
      </div>
    );
  }

  return (
    <div className="table-box">
      <AutoSizer disableWidth>
        {({ height }) =>
          error ? (
            <ErrorBox message={error} absolutePosition />
          ) : (
            <Table
              width={980}
              height={height}
              headerHeight={46}
              rowHeight={40}
              rowCount={screenerList.length}
              rowGetter={({ index }) => screenerList[index]}
              sort={_sort}
              sortBy={sortBy}
              sortDirection={sortDirection}
            >
              <Column
                className="table-box__symbole heading-tertiary"
                label="Description"
                dataKey="symbol"
                width={120}
                maxWidth={130}
                // minWidth={100}
                flexGrow={1}
              />
              <Column
                label="Name"
                dataKey="companyName"
                width={110}
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
              <Column label="CHG" dataKey="change" width={70} flexGrow={1} />
              <Column label="VOL" dataKey="volume" width={70} flexGrow={1} />
              <Column
                label="MKT CAP"
                dataKey="marketCap"
                width={70}
                flexGrow={1}
              />
              <Column label="P/E" dataKey="peRatio" width={70} flexGrow={1} />
            </Table>
          )
        }
      </AutoSizer>
    </div>
  );
};

export default ScreenerTable;
