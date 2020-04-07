import React from 'react';

import Logo from '../../assets/images/logo-green-back.svg';

export default function HomescreenHeader(props) {
  return (
    <div className="header-homescreen">
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
