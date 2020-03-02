import React from 'react';
import PropTypes from 'prop-types';

import { smartDate } from '../../utils/formatHelper';

import './DetailNews.scss';

const DetailNews = ({ news }) => {
  return (
    <section className="detail-news">
      <h3 className="detail-news__section-name">News</h3>
      <div className="news-cards">
        {news.map(({ url, image, headline, source, datetime, summary }) => (
          <a className="news-card" href={url} key={headline}>
            <div className="news-card__image-box">
              <img src={image} alt={headline} className="news-card__image" />
            </div>
            <h4 className="news-card__title heading-secondary">{headline}</h4>
            <p className="news-card__source">{source}</p>
            <time className="news-card__date">
              {datetime && smartDate(datetime)}
            </time>
            <p className="news-card__summary">{summary}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

DetailNews.defaultProps = {
  news: []
};

DetailNews.propTypes = {
  news: PropTypes.array.isRequired
};

export default DetailNews;
