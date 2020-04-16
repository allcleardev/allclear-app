import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../../../assets/images/logo-white-back.svg';

export default function ClearHeader(props) {
  const { isOpen } = props;

  return (
    <div className="header-white-fullscreen">
      <div className={isOpen ? 'header-logo header-logo--open' : 'header-logo'}>
        <img className={isOpen ? 'logo logo--open' : 'logo'} src={Logo} alt="Logo" />
        <div className="header-menu">
          <Link className="header-menu__item" to="/map">
            Find Tests
          </Link>
          <Link className="header-menu__item" to="/contact-tracing">
            Tracing
          </Link>
          <Link className="header-menu__item" to="/profile">
            Profile
          </Link>
        </div>
      </div>
      {props.children}
    </div>
  );
}
ClearHeader.propTypes = {
  isOpen: PropTypes.bool,
};
