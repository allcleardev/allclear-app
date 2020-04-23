import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import Container from '@material-ui/core/Container';
import Logo from '@assets/images/logo-white.svg';

export default function RoundHeader({ navigate = '', children }) {
  const history = useHistory();

  const routeChange = (route) => {
    history.push(route);
  };

  return (
    <div className="header">
      <div className="mobile-content">
        <Fab
          size="small"
          aria-label="add"
          className={navigate ? 'btn-back-fab' : 'btn-back-fab btn-back-fab--hidden'}
          elevation={0}
          onClick={() => routeChange(navigate)}
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
        <Link to="/">
          <img src={Logo} alt="Logo" className="logo" />
        </Link>
        <nav className="menu">
          <a href="https://home.allclear.app/" className="menu__item">
            Home
          </a>
          <a href="https://about.allclear.app/" className="menu__item">
            Help
          </a>
        </nav>
      </Container>

      {children}
    </div>
  );
}
