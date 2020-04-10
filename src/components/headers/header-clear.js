import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../../assets/images/logo-white-back.svg';
import Container from '@material-ui/core/Container';

export default function ClearHeader(props) {
  const { isOpen } = props;

  return (
    <div className="header-white-fullscreen">
      <Container className={isOpen ? 'header-logo' : 'header-logo'}>
        <img className={isOpen ? 'logo logo--open' : 'logo'} src={Logo} alt="Logo" />
        <div className="header-menu">
          <Link className="header-menu__item" to="/map">
            Find Tests
          </Link>
          <Link className="header-menu__item" to="/trace">
            Tracing
          </Link>
          <Link className="header-menu__item" to="/profile-view">
            Profile
          </Link>
        </div>
      </Container>
      {props.children}
    </div>
  );
}
ClearHeader.propTypes = {
  isOpen: PropTypes.bool,
};
