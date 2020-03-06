import React from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';

import LoadingBox from '../../components/LoadingBox';
import ErrorBox from '../../components/ErrorBox';

import { useLocalStateFetching } from '../../utils/customHooks';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './RecentNews.scss';

const APIspec = {
  route: '/stock/spy/news/last/3',
  params: undefined,
  process: d => d,
  naming: 'recentNewsList'
};

const RecentNews = () => {
  const { isMediumSize } = useSelector(state => state.sizeDetection);

  const {
    isFetchingRecentNewsList,
    errorOnRecentNewsList,
    recentNewsList
  } = useLocalStateFetching(APIspec);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const NewsBox = () =>
    recentNewsList.map(({ url, headline, image, summary }) => (
      <a className="swiper__inner-box" href={url} key={headline}>
        <img
          className="swiper__image"
          src={image}
          alt={headline}
          title={summary}
        />
        <p className="swiper__title">{headline}</p>
      </a>
    ));

  if (isFetchingRecentNewsList) {
    return (
      <section className="recent-news">
        <div className="recent-news__title heading-margin">recent news</div>
        <LoadingBox />
      </section>
    );
  }

  if (errorOnRecentNewsList) {
    return (
      <section className="recent-news">
        <div className="recent-news__title heading-margin">recent news</div>
        <ErrorBox message={errorOnRecentNewsList} />
      </section>
    );
  }

  return (
    <section className="recent-news">
      <div className="recent-news__title heading-margin">recent news</div>

      {isMediumSize ? (
        <div className="normal-layout">
          <NewsBox />
        </div>
      ) : (
        <div className="swiper-layout">
          <Slider {...settings}>
            {recentNewsList.map(({ url, headline, image, summary }) => (
              <a className="swiper__inner-box" href={url} key={headline}>
                <img
                  className="swiper__image"
                  src={image}
                  alt={headline}
                  title={summary}
                />
                <p className="swiper__title">{headline}</p>
              </a>
            ))}
          </Slider>
        </div>
      )}
    </section>
  );
};

export default RecentNews;
