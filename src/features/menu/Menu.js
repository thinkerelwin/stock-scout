import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

import useSizeDetection from '../sizeDetection/useSizeDetection';

import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import './Menu.scss';

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isMediumSize } = useSizeDetection();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll');
      toggleMobileScrolling(isMenuOpen);
    } else {
      document.body.classList.remove('no-scroll');
      toggleMobileScrolling(isMenuOpen);
    }
    if (isMediumSize) {
      setIsMenuOpen(false);
    }
  }, [isMediumSize, isMenuOpen]);

  function handleMenuToggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  function toggleMobileScrolling(bool) {
    if (bool) {
      document.body.addEventListener('touchmove', freezeVp, false);
    } else {
      document.body.removeEventListener('touchmove', freezeVp, false);
    }

    function freezeVp(e) {
      e.preventDefault();
    }
  }

  return (
    <header
      className={classNames('header heading-primary', { open: isMenuOpen })}
    >
      <Link to="/" className="logo-box">
        <Logo title="logo" className="logo-box__icon" />
        <p>Stock Scout</p>
      </Link>

      <button className="navbar__button" onClick={handleMenuToggle}>
        <span className="navbar__icon">&nbsp;</span>
      </button>

      <nav className="navbar">
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
