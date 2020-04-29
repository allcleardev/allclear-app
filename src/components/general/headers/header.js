// **************************************************** //
//                                                      //
// TODO: Make this the one and only header component    //
//                                                      //
// ____________________________________________________ //

import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import Logo from '@assets/images/logo-white.svg';

import Container from '@material-ui/core/Container';
import ArrowBackIosRounded from '@material-ui/icons/ArrowBackIosRounded';
import { IconButton } from '@material-ui/core';

export default function Header({
  enableBackBtn = false,
  navItems = [{ route: '', name: '', absolutePath: false }],
  children,
}) {
  const history = useHistory();

  return (
    <div className="header main">
      <div className="shape"></div>
      {enableBackBtn ? (
        <IconButton className="icon-button hide-desktop" aria-label="back" onClick={() => history.goBack()}>
          <ArrowBackIosRounded></ArrowBackIosRounded>
        </IconButton>
      ) : (
        ''
      )}

      <Container className="desktop-only-content" maxWidth="xl">
        <Link to="/map">
          <img src={Logo} alt="Logo" className="logo" />
        </Link>
        <nav className="menu">
          {navItems.map((item) => {
            if (item.absolutePath) {
              return (
                <a
                  href={`https://${item.route}`}
                  className="menu__item"
                  key={item.name}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {item.name}
                </a>
              );
            } else {
              return (
                <Link to={item.route} className="menu__item" key={item.name}>
                  {item.name}
                </Link>
              );
            }
          })}
        </nav>
      </Container>

      {children}
    </div>
  );
}
