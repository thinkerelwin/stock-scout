import React from 'react';
import ReactDOM from 'react-dom';

import './PageError.scss';

function PageError() {
  return ReactDOM.createPortal(
    <div className="page-error">
      <div className="text">
        <p>404</p>
      </div>
      <div className="container">
        {/* <!-- caveman left --> */}
        <div className="caveman">
          <div className="leg">
            <div className="foot">
              <div className="fingers"></div>
            </div>
          </div>
          <div className="leg">
            <div className="foot">
              <div className="fingers"></div>
            </div>
          </div>
          <div className="shape">
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
          <div className="head">
            <div className="eye">
              <div className="nose"></div>
            </div>
            <div className="mouth"></div>
          </div>
          <div className="arm-right">
            <div className="club"></div>
          </div>
        </div>
        {/* <!-- caveman right --> */}
        <div className="caveman">
          <div className="leg">
            <div className="foot">
              <div className="fingers"></div>
            </div>
          </div>
          <div className="leg">
            <div className="foot">
              <div className="fingers"></div>
            </div>
          </div>
          <div className="shape">
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
          <div className="head">
            <div className="eye">
              <div className="nose"></div>
            </div>
            <div className="mouth"></div>
          </div>
          <div className="arm-right">
            <div className="club"></div>
          </div>
        </div>
      </div>
      {/* <!-- //////////////// CREDIT //////////////// --> */}
      <a
        href="https://codepen.io/SofiaSergio/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div id="link">
          <i className="fab fa-codepen"></i>
          <p>watch other pens</p>
        </div>
      </a>
    </div>,
    document.getElementById('root')
  );
}

export default PageError;
