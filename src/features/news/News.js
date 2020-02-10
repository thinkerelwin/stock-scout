import React from 'react';

import './News.scss';

const News = () => {
  return (
    <main className="news menu-margin">
      <section className="news-features">
        <a
          href="/"
          className="news-feature news-feature--primary"
          style={{
            backgroundImage: `url(https://via.placeholder.com/354x231.png)`
          }}
        >
          <div className="news-feature__info">
            <h4 className="news-feature__title">title</h4>
            <span className="news-feature__tag">oil</span>
            <time className="news-feature__date" dateTime="1914-12-20 08:00">
              May 10, 2017
            </time>
          </div>
        </a>
        <a
          href="/"
          className="news-feature news-feature--secondary"
          style={{
            backgroundImage: `url(https://via.placeholder.com/354x231.png)`
          }}
        >
          <div className="news-feature__info">
            <h4 className="news-feature__title">title</h4>
            <span className="news-feature__tag">bond</span>
            <time className="news-feature__date" dateTime="1914-12-20 08:00">
              May 1, 2017
            </time>
          </div>
        </a>
        <a
          href="/"
          className="news-feature news-feature--tertiary"
          style={{
            backgroundImage: `url(https://via.placeholder.com/354x231.png)`
          }}
        >
          <div className="news-feature__info">
            <h4 className="news-feature__title">title</h4>
            <span className="news-feature__tag">etf</span>
            <time className="news-feature__date" dateTime="1914-12-20 08:00">
              May 7, 2017
            </time>
          </div>
        </a>
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
