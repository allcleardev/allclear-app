import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '@assets/images/logo-blue.svg';
import { isLoggedInHeaderLinks, isLoggedOutHeaderLinks } from '@util/general.constants';

export default function ClearHeader(props) {
  // hidden on map page in full view through media query styling
  const { isOpen, isLoggedIn } = props;

  const links = isLoggedIn ? isLoggedInHeaderLinks : isLoggedOutHeaderLinks;

  return (
    <div className="header-white-fullscreen">
      <div className={isOpen ? 'header-logo header-logo--open' : 'header-logo'}>
        <img className={isOpen ? 'logo logo--open' : 'logo'} src={Logo} alt="Logo" />
        <div className="header-menu">
          {links.map((link) =>
            <Link className="header-menu__item" to={link.to} key={link.name}>
              {link.name}
            </Link>)
          }
        </div>
      </div>
      {props.children}
    </div>
  );
}
ClearHeader.propTypes = {
  isOpen: PropTypes.bool,
  isLoggedIn: PropTypes.bool
};
