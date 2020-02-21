import React from 'react';
import PropTypes from 'prop-types';

import './DetailBoard.scss';

const DetailBoard = props => {
  return (
    <section className="detail-board">
      <div className="detail-board__title-box">
        <img
          src="https://via.placeholder.com/56"
          alt="compnay logo"
          className="detail-board__logo"
        />
        <h2 className="detail-board__name">Google</h2>
        <h2 className="detail-board__symbol">GOOG</h2>
        <p className="detail-board__exchange">nasdaq</p>
      </div>
      <div className="detail-board__quote">
        <div className="detail-board__last-price-box">
          <h3 className="detail-board__last-price">187.23</h3>
          <span className="detail-board__currency">USD</span>
          <p className="detail-board__change detail-board__change--rising">
            +1.88 (+1.01%)
          </p>
          <span className="detail-board__last-time">
            &#8226; LAST PRICE (Feb 18 15:59 UTC-5)
          </span>
        </div>
        <div className="detail-board__scroll-box-outer">
          <div className="detail-board__scroll-box-inner">
            <div className="detail-board__core-data">
              <div className="detail-board__extended-price-box">
                <h4 className="detail-board__extended-price">187.10</h4>
                <h5 className="detail-board__extended-change">-0.13(-0.07%)</h5>
                <span className="detail-board__extended-last-time">
                  PRE MARKET (16:29 UTC-5)
                </span>
              </div>
              <div className="detail-board__fundamental-block">
                <h5 className="detail-board__number">1424.081B</h5>
                <span className="detail-board__title">MARKET CAP</span>
              </div>
              <div className="detail-board__fundamental-block">
                <h5 className="detail-board__number">32.27</h5>
                <span className="detail-board__title">P / E</span>
              </div>
              <div className="detail-board__fundamental-block">
                <h5 className="detail-board__number">190.7000</h5>
                <span className="detail-board__title">52 WEEK HIGH</span>
              </div>
              <div className="detail-board__fundamental-block">
                <h5 className="detail-board__number">106.29</h5>
                <span className="detail-board__title">52 WEEK LOW</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

DetailBoard.propTypes = {};

export default DetailBoard;
