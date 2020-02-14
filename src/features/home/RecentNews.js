import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import { Carousel } from 'react-responsive-carousel';
import LoadingBox from '../../components/LoadingBox';
import ErrorBox from '../../components/ErrorBox';

import instance from '../../api/IEXCloud';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './RecentNews.scss';

const RecentNews = () => {
  const { isMediumSize } = useSelector(state => state.sizeDetection);

  const [isFetchingRecentNews, setIsFetchingRecentNews] = useState(false);
  const [recentNews, setRecentNews] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;
    fetchRecentNews();

    async function fetchRecentNews() {
      setIsFetchingRecentNews(true);
      try {
        const { data } = await instance.get('/stock/spy/news/last/3');
        isMounted && setRecentNews(data);
      } catch (err) {
        setErrorMessage(err.toString());
      }
      isMounted && setIsFetchingRecentNews(false);
    }
    return () => (isMounted = false);
  }, []);

  const NewsBox = () =>
    recentNews.map(({ headline, image, summary }) => (
      <article className="swiper__inner-box" key={headline}>
        <img
          className="swiper__image"
          src={image}
          alt={headline}
          title={summary}
        />
        <p className="swiper__title">{headline}</p>
      </article>
    ));

  if (isFetchingRecentNews) {
    return (
      <section className="recent-news">
        <div className="recent-news__title heading-margin">recent news</div>
        <LoadingBox height={'10rem'} />
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="recent-news">
        <div className="recent-news__title heading-margin">recent news</div>
        <ErrorBox message={errorMessage} />
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
          {recentNews.map(({ headline, image, summary }) => (
            <article className="swiper__inner-box" key={headline}>
              <img
                className="swiper__image"
                src={image}
                alt={headline}
                title={summary}
              />
              <p className="swiper__title">{headline}</p>
            </article>
          ))}
        </Carousel>
      )}
    </section>
  );
};

export default RecentNews;
