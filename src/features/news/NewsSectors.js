import React from 'react';
import dayjs from 'dayjs';

import LoadingBox from '../../components/LoadingBox';
import ErrorBox from '../../components/ErrorBox';

import { useLocalStateFetching } from '../../utils/customHooks';

import './NewsSectors.scss';

const symbolsOfSectors = {
  energy: ['XOM', 'CVX', 'TOT', 'BP'],
  technology: ['MSFT', 'INTC', 'TSM', 'CSCO'],
  healthcare: ['JNJ', 'UNH', 'NVS', 'MRK'],
  finance: ['BRK.B', 'V', 'JPM', 'BAC']
};

const sectorsAPIspec = {
  route: '/stock/market/batch',
  params: {
    symbols: Object.values(symbolsOfSectors).join(),
    types: 'news',
    last: '1'
  },
  process: normalizeBatchNews,
  naming: 'sectorNews'
};

function normalizeBatchNews(data) {
  data.idList = Object.keys(data);
  return data;
}

const NewsSectors = () => {
  const {
    isFetchingSectorNews,
    errorOnSectorNews,
    sectorNews
  } = useLocalStateFetching(sectorsAPIspec);

  if (isFetchingSectorNews) {
    return (
      <section className="news-sectors">
        <LoadingBox boxClassName={''} />
      </section>
    );
  }

  if (errorOnSectorNews) {
    return (
      <section className="news-sectors">
        <ErrorBox message={errorOnSectorNews} boxClassName={''} />
      </section>
    );
  }

  return (
    <section className="news-sectors">
      {Object.keys(symbolsOfSectors).map(sector => (
        <div className="news-sector" key={sector}>
          <h3 className="news-sector__title heading-secondary">{sector}</h3>
          <div className="news-cards">
            {sectorNews.idList &&
              symbolsOfSectors[sector].map(symbol => (
                <a
                  className="news-card"
                  href={sectorNews[symbol].news[0].url}
                  key={symbol}
                >
                  <div className="news-card__image-box">
                    <img
                      src={sectorNews[symbol].news[0].image}
                      alt="title"
                      className="news-card__image"
                    />
                  </div>
                  <h4 className="news-card__title heading-secondary">
                    {sectorNews[symbol].news[0].headline}
                  </h4>
                  <p className="news-card__source">
                    {sectorNews[symbol].news[0].related}
                  </p>
                  <time
                    className="news-card__date"
                    dateTime={dayjs(sectorNews[symbol].news[0].datetime).format(
                      'YYYY-MM-DD'
                    )}
                  >
                    {dayjs(sectorNews[symbol].news[0].datetime).format(
                      'MMM DD, YYYY'
                    )}
                  </time>
                  <p className="news-card__summary">
                    {sectorNews[symbol].news[0].summary}
                  </p>
                </a>
              ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default NewsSectors;
