import React from 'react';
// import { Link } from "react-router-dom";
import Logo from '../assets/images/logo-green-back.svg';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Container';

export default function Header({ navigate = '/', children }) {
  return (
    <div className="header">
      <div className="mobile-content">
        {/* <Link to={props.navigate}> */}
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
        {/* </Link> */}
        <div className="shape"></div>
      </div>
      <Box className="desktop-content" maxWidth="xl">
        <img src={Logo} alt="Logo" className="logo" />
        <nav className="menu">
          <a href="/" className="menu__item">About Us</a>
          <a href="/" className="menu__item">Help</a>
        </nav>
      </Box>
      {children}
    </div>
  );
}
