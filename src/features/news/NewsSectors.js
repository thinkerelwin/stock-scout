import React from 'react';
import dayjs from 'dayjs';
import { createSelector } from '@reduxjs/toolkit';

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

  // const test =
  //   sectorNews &&
  //   sectorNews.idList &&
  //   sectorNews.idList.map(id => sectorNews[id].news[0]);

  const sectors = Object.keys(symbolsOfSectors);
  console.log('sectorNews', sectorNews, sectors);

  return (
    <section className="news-sectors">
      {sectors.map(sector => (
        <div className="news-sector">
          <h3 className="news-sector__title heading-secondary">{sector}</h3>
          <div className="news-cards">
            {sectorNews.idList &&
              symbolsOfSectors[sector].map(symbol => (
                <a className="news-card" href={sectorNews[symbol].news[0].url}>
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
      {/* <div className="news-sector">
        <h3 className="news-sector__title heading-secondary">us market</h3>
        <div className="news-cards">
          <a className="news-card" href="/">
            <div className="news-card__image-box">
              <img
                src="https://via.placeholder.com/550x360.png"
                alt="title"
                className="news-card__image"
              />
            </div>
            <h4 className="news-card__title heading-secondary">Lorem</h4>
            <p className="news-card__source">raibercristian</p>
            <time className="news-card__date">May 7, 2017</time>
            <p className="news-card__summary">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Consectetur, corporis?
            </p>
          </a>
          <a className="news-card" href="/">
            <div className="news-card__image-box">
              <img
                src="https://via.placeholder.com/550x360.png"
                alt="title"
                className="news-card__image"
              />
            </div>
            <h4 className="news-card__title heading-secondary">Lorem</h4>
            <p className="news-card__source">raibercristian</p>
            <time className="news-card__date">May 7, 2017</time>
            <p className="news-card__summary">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Consectetur, corporis?
            </p>
          </a>
          <a className="news-card" href="/">
            <div className="news-card__image-box">
              <img
                src="https://via.placeholder.com/550x360.png"
                alt="title"
                className="news-card__image"
              />
            </div>
            <h4 className="news-card__title heading-secondary">Lorem</h4>
            <p className="news-card__source">raibercristian</p>
            <time className="news-card__date">May 7, 2017</time>
            <p className="news-card__summary">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Consectetur, corporis?
            </p>
          </a>
          <a className="news-card" href="/">
            <div className="news-card__image-box">
              <img
                src="https://via.placeholder.com/550x360.png"
                alt="title"
                className="news-card__image"
              />
            </div>
            <h4 className="news-card__title heading-secondary">Lorem</h4>
            <p className="news-card__source">raibercristian</p>
            <time className="news-card__date">May 7, 2017</time>
            <p className="news-card__summary">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Consectetur, corporis?
            </p>
          </a>
        </div>
      </div>
      <div className="news-sector">
        <h3 className="news-sector__title heading-secondary">etfs</h3>
        <div className="news-cards">
          <a className="news-card" href="/">
            <div className="news-card__image-box">
              <img
                src="https://via.placeholder.com/550x360.png"
                alt="title"
                className="news-card__image"
              />
            </div>
            <h4 className="news-card__title heading-secondary">Lorem</h4>
            <p className="news-card__source">raibercristian</p>
            <time className="news-card__date">May 7, 2017</time>
            <p className="news-card__summary">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Consectetur, corporis?
            </p>
          </a>
          <a className="news-card" href="/">
            <div className="news-card__image-box">
              <img
                src="https://via.placeholder.com/550x360.png"
                alt="title"
                className="news-card__image"
              />
            </div>
            <h4 className="news-card__title heading-secondary">Lorem</h4>
            <p className="news-card__source">raibercristian</p>
            <time className="news-card__date">May 7, 2017</time>
            <p className="news-card__summary">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Consectetur, corporis?
            </p>
          </a>
          <a className="news-card" href="/">
            <div className="news-card__image-box">
              <img
                src="https://via.placeholder.com/550x360.png"
                alt="title"
                className="news-card__image"
              />
            </div>
            <h4 className="news-card__title heading-secondary">Lorem</h4>
            <p className="news-card__source">raibercristian</p>
            <time className="news-card__date">May 7, 2017</time>
            <p className="news-card__summary">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Consectetur, corporis?
            </p>
          </a>
          <a className="news-card" href="/">
            <div className="news-card__image-box">
              <img
                src="https://via.placeholder.com/550x360.png"
                alt="title"
                className="news-card__image"
              />
            </div>
            <h4 className="news-card__title heading-secondary">Lorem</h4>
            <p className="news-card__source">raibercristian</p>
            <time className="news-card__date">May 7, 2017</time>
            <p className="news-card__summary">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Consectetur, corporis?
            </p>
          </a>
        </div>
      </div> */}
    </section>
  );
};

const stateSelector = state => state;

const subtotalSelector = createSelector(stateSelector, state =>
  state && state.idList ? state.idList.map(id => state[id].news[0]) : []
);

export default NewsSectors;
