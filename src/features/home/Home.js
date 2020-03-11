import React from 'react';

import RecentNews from './RecentNews';
import './Home.scss';

const Home = () => {
  return (
    <main className="home menu-margin" data-testid="location-Home">
      <h1 className="section-about__heading section-about__heading--upper heading-margin">
        Investing
      </h1>
      <h1 className="section-about__heading section-about__heading--lower heading-margin">
        in yourself
      </h1>
      <div className="section-about__image">
        <span className="image-credit">
          Photo by Road Trip with Raj on Unsplash
        </span>
      </div>
      <div className="section-about__explaination heading-margin">
        <h3 className="heading-primary">Stock Scout - About</h3>
        <p>
          Stock Scout offers an easy way to peek the market price and news. It's
          also a place to implement my knowledge on frond-end.
        </p>
      </div>
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
      <RecentNews />
    </main>
  );
};

export default Home;
