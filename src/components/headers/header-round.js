import React from 'react';
import Fab from '@material-ui/core/Fab';
import Container from '@material-ui/core/Container';
import Logo from '../../assets/images/logo-green-back.svg';

export default function RoundHeader({ navigate = '', children }) {
  return (
    <div className="header">
      <div className="mobile-content">
        <Fab
          size="small"
          aria-label="add"
          className={navigate ? 'btn-back-fab' : 'btn-back-fab btn-back-fab--hidden'}
          elevation={0}
          href={navigate}
        >
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
        <div className="shape"></div>
      </div>
      <Container className="desktop-content" maxWidth="xl">
        <img src={Logo} alt="Logo" className="logo" />
        <nav className="menu">
          <a href="https://staging.about.allclear.app/" className="menu__item">
            About Us
          </a>
          <a href="https://staging.about.allclear.app/" className="menu__item">
            Help
          </a>
        </nav>
      </Container>

      {children}
    </div>
  );
}
