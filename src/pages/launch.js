import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';

import Logo from '../assets/images/logo-green-back.svg';


const LogoStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: '"Source Sans Pro", sans-serif"',
  fontStyle: 'normal',
  marginTop: '-30%',
};

const ContainerStyle = {
  height: '100vh',
  width: '100%',
  background: 'linear-gradient(to right, #28baff, #1195ff)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const Launch = ({ props }) => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push('/phone-verify');
    }, 3000);
  });

  return (
    <div style={ContainerStyle}>
      <div>
        <div style={LogoStyle}>
          <img src={Logo} alt="Logo" />
        </div>

        <LinearProgress color="primary" value="50" />
      </div>
    </div>
  );
};

export default Launch;
