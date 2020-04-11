import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo-green-back.svg';
import Container from '@material-ui/core/Container';

export default function HomescreenHeader(props) {
  return (
    <div className="header-homescreen">
      <div className="shape"></div>

      <Container className="desktop-container" maxWidth="xl">
        <img src={Logo} alt="Logo" className="logo" />
        <nav className="menu">
          <Link to="/map" className="menu__item">
            Find Tests
          </Link>
          <Link to="/" className="menu__item">
            Tracing
          </Link>
          <Link to="/profile-view" className="menu__item">
            Profile
          </Link>
        </nav>
      </Container>

      {props.children}
    </div>
  );
}
