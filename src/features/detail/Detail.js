import React from 'react';

import './Detail.scss';

const Detail = () => {
  return (
    <main className="detail menu-margin">
      <section className="detail-board">
        <div className="detail-board__title-box">
          <img
            src="https://via.placeholder.com/56"
            alt="compnay logo"
            className="detail-board__logo"
          />
          <h2 className="detail-board__name">Google</h2>
          <h2 className="detail-board__symbol">goog</h2>
          <p className="detail-board__exchange">nasdaq</p>
        </div>
        <div className="deital-board__quote">
          <div className="detail-board__last-price-box">
            <h3 className="detail-board__last-price">187.23</h3>
            <span className="detail-board__currency">USD</span>
            <h5 className="detail-board__change">+1.88 (+1.01%)</h5>
            <span className="detail-board__meaning">LAST PRICE</span>
            <span className="detail-board__last-time">
              (Feb 18 15:59 UTC-5)
            </span>
          </div>
          <div className="detail-board__extended-price-box">
            <h4 className="detail-board__extended-price">187.10</h4>
            <h5 className="detail-board__extended-change">-0.13(-0.07%)</h5>
            <span className="detail-board__extended-meaning">PRE MARKET</span>
            <span className="detail-board__extended-last-time">
              (16:29 UTC-5)
            </span>
          </div>
          <div className="detail-board__fundamental">
            <h5 className="detail-board__number">1424.081B</h5>
            <span className="detail-board__title">MARKET CAP</span>
          </div>
          <div className="detail-board__fundamental">
            <h5 className="detail-board__number">32.27</h5>
            <span className="detail-board__title">P / E</span>
          </div>
          <div className="detail-board__fundamental">
            <h5 className="detail-board__number">190.7000</h5>
            <span className="detail-board__title">52 WEEK HIGH</span>
          </div>
          <div className="detail-board__fundamental">
            <h5 className="detail-board__number">106.29</h5>
            <span className="detail-board__title">52 WEEK LOW</span>
          </div>
        </div>
      </section>
      <section className="detail-chart"></section>
      <section className="detail-profile"></section>
      <section className="detail-news"></section>
    </main>
  );
};

export default Detail;
