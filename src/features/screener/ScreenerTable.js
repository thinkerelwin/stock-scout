import React, { useState, useEffect, useMemo } from 'react';
import { Column, Table, AutoSizer } from 'react-virtualized';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import classNames from 'classnames';

import LoadingBox from '../../components/LoadingBox';
import ErrorBox from '../../components/ErrorBox';

import { fetchscreenerTable } from './screenerTableSlice';
import { displayAsPercent, bigNumberFormat } from '../../utils/formatHelper';
import { usePrevious } from '../../utils/customHooks';

import './ScreenerTable.scss';

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

const defaultHeightOnTable = 100;

const ScreenerTable = ({ topList }) => {
  const dispatch = useDispatch();
  let { category } = useParams();

  const prevCategory = usePrevious(category);

  const { screenerList, isFetchingList, error } = useSelector(
    state => state.screenerTable
  );

  const [sortBy, setSortBy] = useState(undefined);
  const [sortedDirection, setSortedDirection] = useState(undefined);

  useEffect(() => {
    if (category !== prevCategory) {
      const CollectionType = findCollectionType(category, topList);
      dispatch(fetchscreenerTable(CollectionType, urlChecker(category)));
    }
  }, [category, dispatch, prevCategory, screenerList.length, topList]);

  const sortedScreenerList = useMemo(() => {
    if (!sortBy) return screenerList;

    const isNumberType = typeof screenerList[0][sortBy] === 'number';

    if (isNumberType) {
      return sortByNumber(screenerList, sortBy, sortedDirection);
    } else {
      return sortByCharacter(screenerList, sortBy, sortedDirection);
    }
  }, [sortBy, screenerList, sortedDirection]);

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
            <ErrorBox message={error} boxClassName="error--absolute" />
          ) : (
            <Table
              width={980}
              height={height || defaultHeightOnTable}
              headerHeight={46}
              rowHeight={40}
              rowCount={sortedScreenerList.length}
              rowGetter={({ index }) => sortedScreenerList[index]}
              sort={handleSort}
              sortBy={sortBy}
              sortDirection={sortedDirection}
            >
              <Column
                className="table-box__symbole heading-tertiary"
                label="Description"
                dataKey="symbol"
                width={120}
                maxWidth={130}
                // minWidth={100}
                flexGrow={1}
                cellRenderer={descriptionCellRender}
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
                cellRenderer={changePercentCellRender}
              />
              <Column
                label="CHG"
                dataKey="change"
                width={70}
                flexGrow={1}
                cellRenderer={changeCellRender}
              />
              <Column label="VOL" dataKey="volume" width={70} flexGrow={1} />
              <Column
                label="MKT CAP"
                dataKey="marketCap"
                width={70}
                flexGrow={1}
                cellRenderer={marketCapCellRender}
              />
              <Column label="P/E" dataKey="peRatio" width={70} flexGrow={1} />
            </Table>
          )
        }
      </AutoSizer>
    </div>
  );

  function findCollectionType(type, listOfCategories) {
    return listOfCategories.find(item => item === type) ? 'list' : 'sector';
  }

  function handleSort({ sortBy }) {
    setSortBy(sortBy);
    const newDirection = sortedDirection === 'DESC' ? 'ASC' : 'DESC';
    setSortedDirection(newDirection);
  }

  function cellRender(cellData, component) {
    return cellData === null ? '' : component(cellData);
  }

  function descriptionCellRender({ cellData }) {
    return cellRender(cellData, cellData => (
      <Link to={`/detail/${cellData}`}>{cellData}</Link>
    ));
  }

  function changePercentCellRender({ cellData }) {
    return cellRender(cellData, cellData => (
      <p
        className={classNames('table-cell__change-percent', {
          'table-cell__change-percent--rising': cellData > 0,
          'table-cell__change-percent--falling': cellData < 0
        })}
      >{`${displayAsPercent(cellData)}%`}</p>
    ));
  }

  function changeCellRender({ cellData }) {
    return cellRender(cellData, cellData => (
      <p
        className={classNames('table-cell__change', {
          'table-cell__change--rising': cellData > 0,
          'table-cell__change--falling': cellData < 0
        })}
      >
        {cellData}
      </p>
    ));
  }

  function marketCapCellRender({ cellData }) {
    return cellData === null ? '' : bigNumberFormat(cellData);
  }
};

function sortByNumber(list, sortBy, direction) {
  return direction === 'ASC'
    ? list.slice().sort((a, b) => {
        return a[sortBy] - b[sortBy];
      })
    : list.slice().sort((a, b) => {
        return b[sortBy] - a[sortBy];
      });
}

function sortByCharacter(list, sortBy, direction) {
  return list.slice().sort((a, b) => {
    const nameA = a[sortBy].toUpperCase(); // ignore upper and lowercase
    const nameB = b[sortBy].toUpperCase(); // ignore upper and lowercase

    if (nameA < nameB) {
      return direction === 'ASC' ? -1 : 1;
    }
    if (nameA > nameB) {
      return direction === 'ASC' ? 1 : -1;
    }
    // names must be equal
    return 0;
  });
}

export default ScreenerTable;
