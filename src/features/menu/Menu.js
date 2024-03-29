import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { useSizeDetection } from '../../utils/customHooks';

import menuLink from '../../utils/constant/menuLink.json';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import './Menu.scss';

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isMediumSize } = useSizeDetection();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    if (isMediumSize) {
      setIsMenuOpen(false);
    }
  }, [isMediumSize, isMenuOpen]);

  return (
    <header className={classNames('header', { open: isMenuOpen })}>
      <Link to="/" className="logo-box">
        <Logo title="logo" className="logo-box__icon" />
        <p className="heading-primary">Stock Scout</p>
      </Link>

      <button
        className="navbar__button"
        onClick={handleMenuToggle}
        data-testid="navbar-button"
      >
        <span className="navbar__icon">&nbsp;</span>
      </button>

      <nav className="navbar">
        <ul className="navbar__list">
          {menuLink.map(({ name, route }) => (
            <NavLink
              key={name}
              to={route}
              className={({ isActive }) =>
                'navbar__link' + (isActive ? ' navbar__link--active' : '')
              }
              data-testid="menu-link"
              onClick={handleMenuToggle}
              end
            >
              {name}
            </NavLink>
          ))}
        </ul>
      </nav>
    </header>
  );

  function handleMenuToggle() {
    setIsMenuOpen(!isMenuOpen);
  }
};

export default Menu;
