import React, { useState, useEffect } from 'react';
import { Column, Table, AutoSizer } from 'react-virtualized';
import { useDispatch, useSelector } from 'react-redux';

import { fetchscreenerTable } from './ScreenerTableSlice';

import './ScreenerTable.scss';

// TODO  handle error, isfetching, setScreenerList, add loading styles

const ScreenerTable = ({ currentTab, topList }) => {
  const dispatch = useDispatch();

  const { screenerList, isFetchingList, error } = useSelector(
    state => state.screenerTable
  );

  const [sortBy, setSortBy] = useState('symbol');
  const [sortDirection, setSortDirection] = useState('ASC');

  useEffect(() => {
    console.log('currentTab', currentTab);
    const CollectionType = findCollectionType(currentTab, topList);
    dispatch(fetchscreenerTable(CollectionType, currentTab));
  }, [currentTab, dispatch, topList]);

  function findCollectionType(currentTab, topList) {
    return topList.find(item => item.url === currentTab) ? 'list' : 'sector';
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

  if (isFetchingList && screenerList.length === 0) {
    return <div className="table-box">...loading</div>;
  }

  return (
    <div className="table-box">
      <AutoSizer disableWidth>
        {({ height, width }) => (
          <Table
            width={1225} //61.25 * 16 * 1.25=> TODO should be dynamic
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
        )}
      </AutoSizer>
    </div>
  );
};

export default ScreenerTable;
