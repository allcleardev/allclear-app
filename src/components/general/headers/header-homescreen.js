import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '@assets/images/logo-white.svg';
import Fab from '@material-ui/core/Fab';
import Container from '@material-ui/core/Container';

export default function HomescreenHeader({ navigate = '', children }) {
  const history = useHistory();

  const routeChange = (route) => {
    history.push(route);
  };

  return (
    <div className="header-homescreen">
      <div className="shape"></div>

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
      </div>

      <Container className="desktop-container" maxWidth="xl">
        <Link to="/map">
          <img src={Logo} alt="Logo" className="logo" />
        </Link>
        <nav className="menu">
          <Link
            to="/map"
            className="menu__item">
            Find Tests
          </Link>
          <Link to="/contact-tracing" className="menu__item">
            Tracing
          </Link>
          <Link to="/profile" className="menu__item">
            Profile
          </Link>
        </nav>
      </Container>

      {children}
    </div>
  );
}
