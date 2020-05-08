// **************************************************** //
//                                                      //
// TODO: Make this the one and only header component    //
//                                                      //
// ____________________________________________________ //

import React, { useContext } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';

import Logo from '@assets/images/logo-white.svg';
import { AppContext } from '@contexts/app.context';
import { IS_LOGGED_IN_HEADER_LINKS, IS_LOGGED_OUT_HEADER_LINKS } from '@util/general.constants';

import ArrowBackIosRounded from '@material-ui/icons/ArrowBackIosRounded';
import { IconButton, Button } from '@material-ui/core';

export default function Header({ enableBackBtn = false, enableColorBlock = true, children }) {
  const { appState } = useContext(AppContext);
  const isLoggedIn = appState.sessionId ? true : false;
  const navLinks = isLoggedIn ? IS_LOGGED_IN_HEADER_LINKS : IS_LOGGED_OUT_HEADER_LINKS;
  const history = useHistory();

  return (
    <div className="header main">
      {enableColorBlock && <div className="color-block"></div>}
      {enableBackBtn ? (
        <IconButton className="icon-button hide-desktop" aria-label="back" onClick={() => history.goBack()}>
          <ArrowBackIosRounded></ArrowBackIosRounded>
        </IconButton>
      ) : (
        ''
      )}

      <div className="desktop-navigation">
        <Link to="/map">
          <img src={Logo} alt="Logo" className="logo" />
        </Link>
        <nav className="menu">
          {navLinks.map((link) =>
            link.isExternalURL ? (
              <a
                href={link.to}
                className="menu__item"
                key={link.name}
                rel="noopener noreferrer"
                target="_blank"
              >
                {link.name}
              </a>
            ) : (
              <NavLink activeClassName="menu__item--active" to={link.to} className="menu__item" key={link.name}>
                {link.name}
              </NavLink>
            ),
          )}
          {!isLoggedIn && (
            <Link to="/create-account">
              <Button className="menu__item menu__item--inverted" style={{ padding: '7px 20px', opacity: 1 }}>
                Get Alerts
              </Button>
            </Link>
          )}
        </nav>
      </div>

      {children}
    </div>
  );
}
