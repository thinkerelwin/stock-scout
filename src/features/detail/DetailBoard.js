import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import {
  monthFirstDateTime,
  minimalDateTime,
  displayAsPercent,
  bigNumberFormat
} from '../../utils/formatHelper';
import './DetailBoard.scss';

const DetailBoard = ({ quote, logo }) => {
  const isPreMarketExist =
    quote.extendedPrice !== null &&
    quote.extendedChange !== null &&
    quote.extendedPriceTime !== null;
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
          <p
            className={classNames('detail-board__change', {
              'detail-board__change--rising': quote.change > 0,
              'detail-board__change--falling': quote.change < 0
            })}
          >
            {formatChangePrice(quote.change)} (
            {displayAsPercentWithIcon(displayAsPercent(quote.changePercent))}%)
          </p>
          <span className="detail-board__last-time">
            &#8226; LAST PRICE ({monthFirstDateTime(quote.latestUpdate)})
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
                    {formatChangePrice(quote.extendedChange)} (
                    {displayAsPercentWithIcon(
                      displayAsPercent(quote.extendedChangePercent)
                    )}
                    %)
                  </h5>
                  <span className="detail-board__extended-last-time">
                    PRE MARKET ({minimalDateTime(quote.extendedPriceTime)})
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

  function displayAsPercentWithIcon(number) {
    return number && plusIconDecider(number) + number;
  }

  function formatChangePrice(number) {
    return plusIconDecider(number) + number;
  }

  function plusIconDecider(number) {
    return number > 0 ? '+' : '';
  }
};

DetailBoard.defaultProps = {
  quote: {
    symbol: '',
    companyName: '',
    primaryExchange: '',
    latestPrice: 0,
    change: 0,
    changePercent: 0,
    latestUpdate: null,
    extendedPrice: null,
    extendedChange: null,
    extendedChangePercent: null,
    extendedPriceTime: null,
    marketCap: 0,
    peRatio: 0,
    week52High: 0,
    week52Low: 0
  },
  logo: { url: '' }
};

DetailBoard.propTypes = {
  quote: PropTypes.shape({
    symbol: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    primaryExchange: PropTypes.string.isRequired,
    latestPrice: PropTypes.number.isRequired,
    change: PropTypes.number.isRequired,
    changePercent: PropTypes.number.isRequired,
    latestUpdate: validifyNullAndNumber,
    extendedPrice: validifyNullAndNumber,
    extendedChange: validifyNullAndNumber,
    extendedChangePercent: validifyNullAndNumber,
    extendedPriceTime: validifyNullAndNumber,
    marketCap: PropTypes.number.isRequired,
    peRatio: PropTypes.number.isRequired,
    week52High: PropTypes.number.isRequired,
    week52Low: PropTypes.number.isRequired
  }),
  logo: PropTypes.shape({
    url: PropTypes.string.isRequired
  })
};

function validifyNullAndNumber(props, propName, componentName) {
  if (props[propName] !== null && typeof props[propName] !== 'number') {
    return new Error(
      'Invalid prop `' +
        propName +
        '` supplied to' +
        ' `' +
        componentName +
        '`. Validation failed.'
    );
  }
}

export default DetailBoard;
