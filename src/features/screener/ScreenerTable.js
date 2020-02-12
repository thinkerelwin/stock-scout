import React, { useState, useEffect } from 'react';
import { Column, Table } from 'react-virtualized';

import sectorList from '../../utils/sector-stocks.json';

import './ScreenerTable.scss';

const ScreenerTable = ({ currentTab }) => {
  const [isFetchingScreenerList, setIsFetchingScreenerList] = useState(false);
  const [screenerList, setScreenerList] = useState(sectorList);
  const [sortBy, setSortBy] = useState('symbol');
  const [sortDirection, setSortDirection] = useState('ASC');

  useEffect(() => {
    setIsFetchingScreenerList(true);
    // fetching logic here
    setIsFetchingScreenerList(false);
  }, [currentTab]);

  function _sort({ sortBy, sortDirection }) {
    const sortedList = _sortList({ sortBy, sortDirection });

    setScreenerList(sortedList);
    setSortBy(sortBy);
    setSortDirection(sortDirection);
  }

  function _sortList({ sortBy, sortDirection }) {
    return screenerList.reverse();
  }
  console.log(sectorList);
  return (
    <div className="table-box">
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
          className="table-box__symbole heading-tertiary"
          label="Description"
          dataKey="symbol"
          width={120}
          maxWidth={120}
          // minWidth={100}
          flexGrow={1}
        />
        <Column label="Name" dataKey="companyName" width={110} flexGrow={1} />
        <Column label="Last" dataKey="latestPrice" width={70} flexGrow={1} />
        <Column label="CHG %" dataKey="changePercent" width={70} flexGrow={1} />
        <Column label="CHG" dataKey="change" width={70} flexGrow={1} />
        <Column label="VOL" dataKey="volume" width={70} flexGrow={1} />
        <Column label="MKT CAP" dataKey="marketCap" width={70} flexGrow={1} />
        <Column label="P/E" dataKey="peRatio" width={70} flexGrow={1} />
      </Table>
    </div>
  );
};

export default ScreenerTable;
