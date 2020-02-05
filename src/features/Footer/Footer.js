import React from 'react';

import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import './Footer.scss';
import '../menu/Menu.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <small className="copyright">© Copyright 2020 by Elwin Huang.</small>
    </footer>
  );
};

export default Footer;
