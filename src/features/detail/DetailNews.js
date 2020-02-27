import React from 'react';

import './DetailNews.scss';

const DetailNews = props => {
  return (
    <section className="detail-news">
      <h3 className="detail-news__section-name">News</h3>
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
      </div>
    </section>
  );
};

export default DetailNews;
