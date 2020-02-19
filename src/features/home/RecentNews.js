import React from 'react';
import { useSelector } from 'react-redux';

import { Carousel } from 'react-responsive-carousel';
import LoadingBox from '../../components/LoadingBox';
import ErrorBox from '../../components/ErrorBox';

import { useLocalStateFetching } from '../../utils/customHooks';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
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
        <Carousel
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          // centerMode={true}
        >
          {/* <NewsBox />, due to limitation on react-responsive-carousel, can't use component */}
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
        </Carousel>
      )}
    </section>
  );
};

export default RecentNews;
