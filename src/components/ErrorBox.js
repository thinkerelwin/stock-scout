import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './ErrorBox.scss';

const ErrorBox = ({ message, absolutePosition }) => {
  return (
    <div
      className={classNames('error', { 'error--absolute': absolutePosition })}
    >
      <p className="error__message">{message}</p>
    </div>
  );
};

ErrorBox.propTypes = {
  message: PropTypes.string.isRequired,
  absolutePosition: PropTypes.bool
};

export default ErrorBox;
