import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo-green-back.svg';

export default function HomescreenHeader(props) {
  return (
    <div className="header-homescreen">
      <div className="header-logo">
        <img src={Logo} alt="Logo" className="logo" />
        <div className="header-menu">
          {/* <p className="selected">Home</p> */}
          <Link to="/map" style={{color:'white'}}> <p className="selected">Find Tests</p></Link>
          <Link to="/trace" style={{color:'white'}}> <p>Tracing</p></Link>
          {/* <p>Friends</p> */}
          <Link to="/profile-view" style={{color:'white'}}> <p>Profile</p></Link>
        </div>
      </div>
      {props.children}
    </div>
  );
}
