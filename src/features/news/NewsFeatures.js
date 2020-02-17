import React from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { createSelector } from '@reduxjs/toolkit';

import LoadingBox from '../../components/LoadingBox';
import ErrorBox from '../../components/ErrorBox';

import { useLocalStateFetching } from '../../utils/customHooks';

import './NewsFeatures.scss';

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

const NewsFeatures = () => {
  const {
    isFetchingFeatureNews,
    errorOnFeatureNews,
    featureNews
  } = useLocalStateFetching(featuresAPIspec);

  if (isFetchingFeatureNews) {
    return (
      <section className="news-features">
        <LoadingBox boxClassName={'news-feature--secondary'} />
      </section>
    );
  }

  if (errorOnFeatureNews) {
    return (
      <section className="news-features">
        <ErrorBox
          message={errorOnFeatureNews}
          boxClassName={'news-feature--secondary news-feature--white'}
        />
      </section>
    );
  }

  return (
    <section className="news-features">
      {subtotalSelector(featureNews).map(
        ({ url, summary, image, headline, related, datetime }, index) => (
          <a
            href={url}
            className={classNames('news-feature', {
              'news-feature--primary': index === 0,
              'news-feature--secondary': index === 1,
              'news-feature--tertiary': index === 2
            })}
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
  );
};

const stateSelector = state => state;

const subtotalSelector = createSelector(stateSelector, state =>
  state && state.idList ? state.idList.map(id => state[id].news[0]) : []
);

export default NewsFeatures;
