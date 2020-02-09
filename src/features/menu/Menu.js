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
    <header className={classNames('header', { open: isMenuOpen })}>
      <Link to="/" className="logo-box">
        <Logo title="logo" className="logo-box__icon" />
        <p className="heading-primary">Stock Scout</p>
      </Link>

      <button className="navbar__button" onClick={handleMenuToggle}>
        <span className="navbar__icon">&nbsp;</span>
      </button>

      <nav className="navbar">
        <ul className="navbar__list">
          <li className="navbar__item" onClick={handleMenuToggle}>
            <NavLink
              to="/"
              exact
              className="navbar__link"
              activeClassName="navbar__link--active"
            >
              Home
            </NavLink>
          </li>
          <li className="navbar__item" onClick={handleMenuToggle}>
            <NavLink
              to="/news"
              className="navbar__link"
              activeClassName="navbar__link--active"
            >
              News
            </NavLink>
          </li>
          <li className="navbar__item" onClick={handleMenuToggle}>
            <NavLink
              to="/screener"
              className="navbar__link"
              activeClassName="navbar__link--active"
            >
              Screener
            </NavLink>
          </li>
          <li className="navbar__item" onClick={handleMenuToggle}>
            <NavLink
              to="/contact"
              className="navbar__link"
              activeClassName="navbar__link--active"
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
