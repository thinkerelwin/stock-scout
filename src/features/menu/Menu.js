import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { useSizeDetection } from '../../utils/customHooks';

import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import './Menu.scss';

const menuLink = [
  { name: 'Home', route: '/' },
  { name: 'News', route: '/news' },
  { name: 'Screener', route: '/screener/Most Active' }
];

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

      <button className="navbar__button" onClick={handleMenuToggle}>
        <span className="navbar__icon">&nbsp;</span>
      </button>

      <nav className="navbar">
        <ul className="navbar__list">
          {menuLink.map(({ name, route }) => (
            <li className="navbar__item" onClick={handleMenuToggle} key={name}>
              <NavLink
                to={route}
                exact
                className="navbar__link"
                activeClassName="navbar__link--active"
                data-testid="menu-link"
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );

  function handleMenuToggle() {
    setIsMenuOpen(!isMenuOpen);
  }
};

export { Menu as default, menuLink };
