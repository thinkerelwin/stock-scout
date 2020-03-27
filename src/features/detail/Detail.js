import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import DetailBoard from './DetailBoard';
import DetailChart from './DetailChart';
import DetailProfile from './DetailProfile';
import DetailNews from './DetailNews';
import LoadingBox from '../../components/LoadingBox';
import ErrorBox from '../../components/ErrorBox';

import { useLocalStateFetching } from '../../utils/customHooks';

import './Detail.scss';

const Detail = () => {
  let { symbol } = useParams();

  const detailsOfSymbolAPIspec = useMemo(
    () => ({
      route: `/stock/${symbol}/batch`,
      params: {
        types: 'quote,logo,chart,company,news',
        last: '3',
        range: 'dynamic'
      },
      process: d => d,
      naming: 'detailsOfSymbol'
    }),
    [symbol]
  );

  const {
    isFetchingDetailsOfSymbol,
    errorOnDetailsOfSymbol,
    detailsOfSymbol
  } = useLocalStateFetching(detailsOfSymbolAPIspec);

  if (isFetchingDetailsOfSymbol) {
    return (
      <main className="detail menu-margin">
        <LoadingBox boxClassName="loading--absolute" />
      </main>
    );
  }

  if (errorOnDetailsOfSymbol) {
    return (
      <main className="detail menu-margin">
        <ErrorBox
          message={errorOnDetailsOfSymbol}
          boxClassName="error--absolute"
        />
      </main>
    );
  }

  return (
    <main className="detail menu-margin">
      <DetailBoard quote={detailsOfSymbol.quote} logo={detailsOfSymbol.logo} />
      <div className="theme-background">
        <DetailChart
          chartData={detailsOfSymbol.chart}
          quote={detailsOfSymbol.quote}
        />
        <DetailProfile profile={detailsOfSymbol.company} />
        <DetailNews news={detailsOfSymbol.news} />
      </div>
    </main>
  );
};

export default Detail;
