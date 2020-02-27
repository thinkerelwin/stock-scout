import React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import './DetailBoard.scss';

const DetailBoard = ({ quote, logo }) => {
  const isPreMarketExist =
    quote.extendedPrice && quote.extendedChange && quote.extendedPriceTime;
  return (
    <section className="detail-board">
      <div className="detail-board__title-box">
        <img src={logo.url} alt="compnay logo" className="detail-board__logo" />
        <h2 className="detail-board__name">{quote.companyName}</h2>
        <h2 className="detail-board__symbol">{quote.symbol}</h2>
        <p className="detail-board__exchange">{quote.primaryExchange}</p>
      </div>
      <div className="detail-board__quote">
        <div className="detail-board__last-price-box">
          <h3 className="detail-board__last-price">{quote.latestPrice}</h3>
          <span className="detail-board__currency">USD</span>
          <p className="detail-board__change detail-board__change--rising">
            {quote.change} ({displayAsPercent(quote.changePercent)}%)
          </p>
          <span className="detail-board__last-time">
            &#8226; LAST PRICE (
            {quote.latestUpdate &&
              dayjs(quote.latestUpdate).format('MMM DD HH:mm')}
            )
          </span>
        </div>
        <div className="detail-board__scroll-box-outer">
          <div className="detail-board__scroll-box-inner">
            <div className="detail-board__core-data">
              {isPreMarketExist && (
                <div className="detail-board__extended-price-box">
                  <h4 className="detail-board__extended-price">
                    {quote.extendedPrice}
                  </h4>
                  <h5 className="detail-board__extended-change">
                    {quote.extendedChange}(
                    {displayAsPercent(quote.extendedChangePercent)}%)
                  </h5>
                  <span className="detail-board__extended-last-time">
                    PRE MARKET (
                    {quote.extendedPriceTime &&
                      dayjs(quote.extendedPriceTime).format('HH:mm')}
                    )
                  </span>
                </div>
              )}
              <div className="detail-board__fundamental-block">
                <h5 className="detail-board__number">
                  {bigNumberFormat(quote.marketCap)}
                </h5>
                <span className="detail-board__title">MARKET CAP</span>
              </div>
              <div className="detail-board__fundamental-block">
                <h5 className="detail-board__number">{quote.peRatio}</h5>
                <span className="detail-board__title">P / E</span>
              </div>
              <div className="detail-board__fundamental-block">
                <h5 className="detail-board__number">{quote.week52High}</h5>
                <span className="detail-board__title">52 WEEK HIGH</span>
              </div>
              <div className="detail-board__fundamental-block">
                <h5 className="detail-board__number">{quote.week52Low}</h5>
                <span className="detail-board__title">52 WEEK LOW</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  function displayAsPercent(number) {
    return number && number.toFixed(2) * 100;
  }
  function bigNumberFormat(number) {
    const billion = 1000000000;
    const million = 1000000;
    const thousand = 1000;
    if (number >= billion) {
      return (number / billion).toFixed(3) + 'B';
    } else if (number >= million) {
      return (number / million).toFixed(3) + 'M';
    } else if (number >= thousand) {
      return (number / thousand).toFixed(3) + 'K';
    } else {
      return number;
    }
  }
};

DetailBoard.defaultProps = {
  quote: {
    symbol: null,
    companyName: null,
    primaryExchange: null,
    latestPrice: null,
    change: null,
    changePercent: null,
    latestUpdate: null,
    extendedPrice: null,
    extendedChange: null,
    extendedChangePercent: null,
    extendedPriceTime: null,
    marketCap: null,
    peRatio: null,
    week52High: null,
    week52Low: null
  },
  logo: { url: 'https://via.placeholder.com/56' }
};

DetailBoard.propTypes = {
  quote: PropTypes.object.isRequired,
  logo: PropTypes.object.isRequired
};

export default DetailBoard;
