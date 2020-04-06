import React from 'react';

import Logo from '../assets/images/logo-white-back.svg';

export default function Header(props) {
  return (
    <div className="header-white-fullscreen">
      <div className="header-logo">
        <img src={Logo} alt="Logo" className="logo" />
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
