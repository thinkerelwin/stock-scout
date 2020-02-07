import React from 'react';
import { useSelector } from 'react-redux';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import './RecentNews.scss';

const RecentNews = () => {
  const { isMediumSize } = useSelector(state => state.sizeDetection);

  const NewsBox = () => (
    <>
      <article className="swiper__inner-box">
        <img
          className="swiper__image"
          src="https://via.placeholder.com/288x160.png"
          alt="dummytext"
        />
        <p className="swiper__title">Image 1</p>
      </article>
      <article className="swiper__inner-box">
        <img
          className="swiper__image"
          src="https://via.placeholder.com/288x160.png"
          alt="dummytext"
        />
        <p className="swiper__title">Image 2</p>
      </article>
      <article className="swiper__inner-box">
        <img
          className="swiper__image"
          src="https://via.placeholder.com/288x160.png"
          alt="dummytext"
        />
        <p className="swiper__title">Image 3</p>
      </article>
    </>
  );
  return (
    <section className="recent-news">
      <div className="recent-news__title heading-margin">recent news</div>

      {isMediumSize ? (
        <div className="normal-layout">
          <NewsBox />
        </div>
      ) : (
        <Carousel
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          // centerMode={true}
        >
          {/* <NewsBox /> */}
          <article className="swiper__inner-box">
            <img
              className="swiper__image"
              src="https://via.placeholder.com/288x160.png"
              alt="dummytext"
            />
            <p className="swiper__title">Image 1</p>
          </article>
          <article className="swiper__inner-box">
            <img
              className="swiper__image"
              src="https://via.placeholder.com/288x160.png"
              alt="dummytext"
            />
            <p className="swiper__title">Image 2</p>
          </article>
          <article className="swiper__inner-box">
            <img
              className="swiper__image"
              src="https://via.placeholder.com/288x160.png"
              alt="dummytext"
            />
            <p className="swiper__title">Image 3</p>
          </article>
        </Carousel>
      )}
    </section>
  );
};

export default RecentNews;
