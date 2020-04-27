import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import Logo from '@assets/images/logo-white.svg';
import { isLoggedInHeaderLinks, isLoggedOutHeaderLinks } from '@util/general.constants';

export default function ColoredHeader(props) {
  const { isOpen, isLoggedIn } = props;
  const links = isLoggedIn ? isLoggedInHeaderLinks : isLoggedOutHeaderLinks;

  return (
    <div className="header-solid-fullscreen">
      <div className={isOpen ? 'header-logo header-logo--open' : 'header-logo'}>
        <a href="https://home.allclear.app">
          <img className={isOpen ? 'logo logo--open' : 'logo'} src={Logo} alt="Logo" />
        </a>
        <div className="header-menu">
          {links.map((link) =>
            link.isExternalURL
              ? <a key={link.name} href={link.to} className="header-menu__item">
                {link.name}
              </a>
              : <Link className="header-menu__item" to={link.to} key={link.name}>
                {link.name}
              </Link>
          )}
          {!isLoggedIn && (
            <a href="/get-started">
              <Button className="header-menu__item header-menu__item--inverted">
                Get Alerts
              </Button>
            </a>
          )}
        </div>
      </div>
      {props.children}
    </div>
  );
}
ColoredHeader.propTypes = {
  isOpen: PropTypes.bool,
};
