import React from 'react';
import PropTypes from 'prop-types';

import LoadingIcon from '../assets/images/loading_icon.svg';

import './LoadingBox.scss';

const LoadingBox = ({ size = 'medium' }) => {
  return (
    <div className="loading">
      <img
        className={`loading__icon loading__icon--${size}`}
        src={LoadingIcon}
        alt="loading icon"
      />
    </div>
  );
};

LoadingBox.propTypes = {
  size: PropTypes.string
};

export default LoadingBox;
