import React from 'react';
import { Link } from 'react-router-dom';

import Fab from '@material-ui/core/Fab';

import Logo from '../assets/images/logo-green-back.svg';

export default function Header({ navigate = '/', children }) {
  return (
    <div className="header">
      <div className="header-mobile">
        <Link to={navigate}>
          <Fab size="small" aria-label="add" className="btn-back-fab">
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.59375 13.1428L1.59375 7.14282L7.59375 1.14282"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Fab>
        </Link>
      </div>
      <div className="header-logo">
        <img src={Logo} alt="Logo" className="logo" />
        <div className="header-menu">
          <p>About Us</p>
          <p>Help</p>
        </div>
      </div>
      {children}
    </div>
  );
}
