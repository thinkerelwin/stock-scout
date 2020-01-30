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

      <nav className="navbar">
        <button className="navbar__button" onClick={handleMenuToggle}>
          <span className="navbar__icon">&nbsp;</span>
        </button>
        <ul className={classNames('navbar__list', { open: isMenuOpen })}>
          <li className="navbar__item">
            <NavLink to="/" exact className="navbar__link">
              Home
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/news" className="navbar__link">
              News
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/stocks" className="navbar__link">
              Stocks
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/contact" className="navbar__link">
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Menu;
