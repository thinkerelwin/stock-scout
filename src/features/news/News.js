import React from 'react';

import './News.scss';

const News = () => {
  return (
    <main className="news menu-margin">
      <section className="news-features">
        <article
          className="news-feature news-feature--primary"
          style={{
            backgroundImage: `url(https://via.placeholder.com/354x231.png)`
          }}
        >
          <div className="news-feature__info">
            <h4 className="news-feature__title">title</h4>
            <span className="news-feature__tag">oil</span>
            <time className="news-feature__date" datetime="1914-12-20 08:00">
              May 10, 2017
            </time>
          </div>
        </article>
        <article
          className="news-feature news-feature--secondary"
          style={{
            backgroundImage: `url(https://via.placeholder.com/354x231.png)`
          }}
        >
          <div className="news-feature__info">
            <h4 className="news-feature__title">title</h4>
            <span className="news-feature__tag">bond</span>
            <time className="news-feature__date" datetime="1914-12-20 08:00">
              May 1, 2017
            </time>
          </div>
        </article>{' '}
        <article
          className="news-feature news-feature--tertiary"
          style={{
            backgroundImage: `url(https://via.placeholder.com/354x231.png)`
          }}
        >
          <div className="news-feature__info">
            <h4 className="news-feature__title">title</h4>
            <span className="news-feature__tag">etf</span>
            <time className="news-feature__date" datetime="1914-12-20 08:00">
              May 7, 2017
            </time>
          </div>
        </article>
      </section>
      <section className="news-sector">
        <h3 className="news-sector__title">us market</h3>
        <article className="news-card">
          <img
            src="https://via.placeholder.com/255x166.png"
            alt="title"
            className="news-card__image"
          />
          <h4 className="news-card__title">Lorem</h4>
          <p className="news-card__source">raibercristian</p>
          <time className="news-card__date">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
            perspiciatis.
          </time>
          <p className="news-card__summary"></p>
        </article>
        <article className="news-card">
          <img
            src="https://via.placeholder.com/255x166.png"
            alt="title"
            className="news-card__image"
          />
          <h4 className="news-card__title">Lorem</h4>
          <p className="news-card__source">raibercristian</p>
          <time className="news-card__date">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
            perspiciatis.
          </time>
          <p className="news-card__summary"></p>
        </article>
        <article className="news-card">
          <img
            src="https://via.placeholder.com/255x166.png"
            alt="title"
            className="news-card__image"
          />
          <h4 className="news-card__title">Lorem</h4>
          <p className="news-card__source">raibercristian</p>
          <time className="news-card__date">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
            perspiciatis.
          </time>
          <p className="news-card__summary"></p>
        </article>
        <article className="news-card">
          <img
            src="https://via.placeholder.com/255x166.png"
            alt="title"
            className="news-card__image"
          />
          <h4 className="news-card__title">Lorem</h4>
          <p className="news-card__source">raibercristian</p>
          <time className="news-card__date">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
            perspiciatis.
          </time>
          <p className="news-card__summary"></p>
        </article>
      </section>
    </main>
  );
};

export default News;
