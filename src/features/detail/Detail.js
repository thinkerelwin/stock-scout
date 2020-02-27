import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import DetailBoard from './DetailBoard';
import DetailChart from './DetailChart';
import DetailProfile from './DetailProfile';
import DetailNews from './DetailNews';

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
  console.log('Detail', isFetchingDetailsOfSymbol, detailsOfSymbol);
  return (
    <main className="detail menu-margin">
      <DetailBoard quote={detailsOfSymbol.quote} logo={detailsOfSymbol.logo} />
      <div className="theme-background">
        <DetailChart chartData={detailsOfSymbol.chart} />
        <DetailProfile profile={detailsOfSymbol.company} />
        <DetailNews news={detailsOfSymbol.news} />
      </div>
    </main>
  );
};

export default Detail;
