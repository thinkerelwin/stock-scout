import React, { useCallback } from 'react';
import dayjs from 'dayjs';
import { createSelector } from '@reduxjs/toolkit';

import { useLocalStateFetching } from '../../utils/customHooks';

import './News.scss';

const featuresAPIspec = {
  route: '/stock/market/batch',
  params: { symbols: 'goog,amzn,fb', types: 'news', last: '1' },
  process: normalizeBatchNews,
  naming: 'featureNews'
};

function normalizeBatchNews(data) {
  data.idList = Object.keys(data);
  return data;
}
const stateSelector = state => state;

const subtotalSelector = createSelector(
  stateSelector,
  state => state && state.idList && state.idList.map(id => state[id].news[0])
);

const News = () => {
  const {
    isFetchingFeatureNews,
    errorOnFeatureNews,
    featureNews
  } = useLocalStateFetching(featuresAPIspec);
  // TODO change featureNewsList to newsFeatures components

  const featureNewsList = subtotalSelector(featureNews);
  return (
    <main className="news menu-margin">
      <section className="news-features">
        {featureNewsList &&
          featureNewsList.map(
            ({ url, summary, image, headline, related, datetime }) => (
              <a
                href={url}
                className="news-feature news-feature--primary"
                title={summary}
                style={{
                  backgroundImage: `url(${image})`
                }}
                key={headline}
              >
                <div className="news-feature__info">
                  <h4 className="news-feature__title">{headline}</h4>
                  <span className="news-feature__tag">{related}</span>
                  <time
                    className="news-feature__date"
                    dateTime={dayjs(datetime).format('YYYY-MM-DD')}
                  >
                    {dayjs(datetime).format('MMM DD, YYYY')}
                  </time>
                </div>
              </a>
            )
          )}
      </section>
      <section className="news-sector">
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
      </section>
      <section className="news-sector">
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
      </section>
    </main>
  );
};

export default News;
