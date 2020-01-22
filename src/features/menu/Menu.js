import React from 'react';

import './Menu.scss';

const Menu = () => {
  return (
    <header className="header">
      <div className="header__logo-box">
        <p>Stock Scout</p>
        <img src="" alt="menu icon" />
      </div>

      <nav className="navbar">
        <ul className="navbar__lists">
          <li className="navbar__list">Stocks</li>
          <li className="navbar__list">News</li>
        </ul>
      </nav>
    </header>
  );
};

export default Menu;
