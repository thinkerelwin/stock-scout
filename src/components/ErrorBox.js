import React from 'react';
import PropTypes from 'prop-types';

import './ErrorBox.scss';

const ErrorBox = ({ message, boxClassName = '' }) => {
  return (
    <div className={`error ${boxClassName}`}>
      <p className="error__message">{message}</p>
    </div>
  );
};

ErrorBox.propTypes = {
  message: PropTypes.string.isRequired,
  boxClassName: PropTypes.string,
};

export default ErrorBox;
