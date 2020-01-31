import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import './Menu.scss';

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuToggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className="header heading-primary">
      <Link to="/" className="logo-box">
        <Logo title="logo" className="logo-box__icon" />
        <p>Stock Scout</p>
      </Link>

      <nav className={classNames('navbar', { open: isMenuOpen })}>
        <button className="navbar__button" onClick={handleMenuToggle}>
          <span className="navbar__icon">&nbsp;</span>
        </button>
        <ul className="navbar__list">
          <li className="navbar__item">
            <NavLink
              to="/"
              exact
              className="navbar__link"
              onClick={handleMenuToggle}
            >
              Home
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              to="/news"
              className="navbar__link"
              onClick={handleMenuToggle}
            >
              News
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              to="/stocks"
              className="navbar__link"
              onClick={handleMenuToggle}
            >
              Stocks
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              to="/contact"
              className="navbar__link"
              onClick={handleMenuToggle}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Menu;
