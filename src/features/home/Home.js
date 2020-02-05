import React from 'react';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import './Home.scss';

const Home = () => {
  return (
    <main className="main">
      <section className="section-about">
        <div className="section-about__image">
          <h1 className="section-about__heading">Investing in yourself</h1>
        </div>
        <div className="section-about__explaination">
          <h3 className="heading-secondary">Stock Scout - About</h3>
          <p>
            Stock Scout offers an easy way to peek the market price and news.
            It's also a place to implement my knowledge on frond-end
          </p>
        </div>
      </section>
      <section className="section-sectors">
        <div className="section-sector">
          <h4 className="section-sector__heading">sector</h4>
          <p className="section-sector__text">Technology Services</p>
        </div>
        <div className="section-sector">
          <h4 className="section-sector__heading">sector</h4>
          <p className="section-sector__text">Health Technology</p>
        </div>
        <div className="section-sector">
          <h4 className="section-sector__heading">sector</h4>
          <p className="section-sector__text">Commercial Services</p>
        </div>
        <div className="section-sector">
          <h4 className="section-sector__heading">sector</h4>
          <p className="section-sector__text">Finance</p>
        </div>
        <div className="section-sector">
          <h4 className="section-sector__heading">sector</h4>
          <p className="section-sector__text">Producer Manufacturing</p>
        </div>
        <div className="section-sector">
          <h4 className="section-sector__heading">sector</h4>
          <p className="section-sector__text">Consumer Services</p>
        </div>
      </section>
      <section className="recent-news">
        <div className="recent-news__title">recent news</div>
        <div className="recent-news__swiper-box">
          <Carousel
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            // centerMode={true}
          >
            <div className="swiper__inner-box">
              <img
                className="swiper__image"
                src="https://via.placeholder.com/288x160.png"
                alt="dummytext"
              />
              <p className="swiper__title">Image 1</p>
            </div>
            <div className="swiper__inner-box">
              <img
                className="swiper__image"
                src="https://via.placeholder.com/288x160.png"
                alt="dummytext"
              />
              <p className="swiper__title">Image 2</p>
            </div>
            <div className="swiper__inner-box">
              <img
                className="swiper__image"
                src="https://via.placeholder.com/288x160.png"
                alt="dummytext"
              />
              <p className="swiper__title">Image 3</p>
            </div>
          </Carousel>
        </div>
      </section>
    </main>
  );
};

export default Home;
