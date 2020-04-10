import React from 'react';
import Logo from '../../assets/images/logo-white-back.svg';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
          {/* <p className="selected">Home</p> */}
          <Link to="/map" style={{color:'white'}}>  <p>Find Tests</p></Link>
          <Link to="/" style={{color:'white'}}>  <p>Tracing</p></Link>
          {/* <p>Friends</p> */}
          <Link to="/profile-view" style={{color:'white'}}>  <p>Profile</p></Link>
        </div>
      </div>
      {props.children}
    </div>
  );
}
ClearHeader.propTypes = {
  isOpen: PropTypes.bool
};
