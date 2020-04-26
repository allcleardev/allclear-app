import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '@assets/images/logo-white.svg';
import { isLoggedInHeaderLinks, isLoggedOutHeaderLinks } from '@util/general.constants';

export default function ColoredHeader(props) {
  const { isOpen, isLoggedIn } = props;
  const links = isLoggedIn ? isLoggedInHeaderLinks : isLoggedOutHeaderLinks;

  return (
    <div className="header-solid-fullscreen">
      <div className={isOpen ? 'header-logo header-logo--open' : 'header-logo'}>
        <img className={isOpen ? 'logo logo--open' : 'logo'} src={Logo} alt="Logo" />
        <div className="header-menu">
          {links.map((link) =>
            <Link className="header-menu__item" key={link.name} to={link.to} >
              {link.name}
            </Link>
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
