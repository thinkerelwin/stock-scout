import React, { useState, useEffect } from 'react';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import './RecentNews.scss';

const RecentNews = () => {
  const [isMediumSize, setIsMediumSize] = useState(false);

  useEffect(() => {
    function carouselSwitch(size) {
      if (size.matches) {
        setIsMediumSize(true);
      } else {
        setIsMediumSize(false);
      }
    }

    const sizeDetector = window.matchMedia('(min-width: 64em)');
    carouselSwitch(sizeDetector); // Call listener function at run time
    sizeDetector.addListener(carouselSwitch); // Attach listener function on state changes

    return () => {
      sizeDetector.removeListener(carouselSwitch);
    };
  }, []);

  const NewsBox = () => (
    <div className="normal-layout">
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
    </div>
  );
  return (
    <section className="recent-news">
      <div className="recent-news__title heading-margin">recent news</div>

      {isMediumSize ? (
        <NewsBox />
      ) : (
        <Carousel
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          // centerMode={true}
        >
          <NewsBox />
        </Carousel>
      )}
    </section>
  );
};

export default RecentNews;
