import React from 'react';
import Logo from '../../assets/images/logo-white-back.svg';
import PropTypes from 'prop-types';

export default function ClearHeader(props) {
  const {isOpen} = props;

  return (
    <div className="header-white-fullscreen">
      <div
        className={(isOpen) ? 'header-logo' : 'header-logo'}
      >
        <img
          className={(isOpen) ? 'logo logo--open' : 'logo'}
          src={Logo} alt="Logo" />
        <div className="header-menu">
          <p className="selected">Home</p>
          <p>Test</p>
          <p>Tracing</p>
          <p>Friends</p>
          <p>Profile</p>
        </div>
      </div>
      {props.children}
    </div>
  );
}
ClearHeader.propTypes = {
  isOpen: PropTypes.bool
};
