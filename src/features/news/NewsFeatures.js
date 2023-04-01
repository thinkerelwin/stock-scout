import React, { useMemo } from 'react';
import { normalDate, monthFirstDate } from '../../utils/formatHelper';
import classNames from 'classnames';

import LoadingBox from '../../components/LoadingBox';
import ErrorBox from '../../components/ErrorBox';

import { useLocalStateFetching } from '../../utils/customHooks';

import './NewsFeatures.scss';

export const featuresAPIspec = {
  route: '/stock/market/batch',
  params: { symbols: 'goog,amzn,fb', types: 'news', last: '1' },
  process: normalizeBatchNews,
  naming: 'featureNews',
};

export function normalizeBatchNews(data) {
  return { ...data, idList: Object.keys(data) };
}

const NewsFeatures = () => {
  const { isFetchingFeatureNews, errorOnFeatureNews, featureNews } =
    useLocalStateFetching(featuresAPIspec);

  const featureNewsList = useMemo(() => {
    return featureNews.idList
      ? featureNews.idList.map((id) => featureNews[id].news[0])
      : [];
  }, [featureNews]);

  if (isFetchingFeatureNews) {
    return (
      <section className="news-features">
        <LoadingBox boxClassName={'news-feature--status'} />
      </section>
    );
  }

  if (errorOnFeatureNews) {
    return (
      <section className="news-features">
        <ErrorBox
          message={errorOnFeatureNews}
          boxClassName={'news-feature--status news-feature--white'}
        />
      </section>
    );
  }

  return (
    <section className="news-features" data-testid="news-feature">
      {featureNewsList.map(
        ({ url, image, headline, related, datetime }, index) => (
          <a
            href={url}
            className={classNames('news-feature', {
              'news-feature--primary': index === 0,
              'news-feature--secondary': index === 1,
              'news-feature--tertiary': index === 2,
            })}
            title={headline}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)) , url(${image})`,
            }}
            key={related}
          >
            <div className="news-feature__info">
              <h4 className="news-feature__title">{headline}</h4>
              <div className="news-feature__inner">
                <span className="news-feature__tag">{related}</span>
                <time
                  className="news-feature__date"
                  dateTime={normalDate(datetime)}
                >
                  {monthFirstDate(datetime)}
                </time>
              </div>
            </div>
          </a>
        )
      )}
    </section>
  );
};

export default NewsFeatures;
