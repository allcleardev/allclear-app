import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import Logo from '@assets/images/logo-white.svg';
import GAService from '@services/ga.service';

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

const LaunchPage = ({ props }) => {
  const gaService = GAService.getInstance();
  gaService.setScreenName('launch');

  const history = useHistory();
  const sessid = localStorage.getItem('sessionId');

  useEffect(() => {
    setTimeout(() => {
      if (sessid) {
        history.push('/map');
      } else {
        history.push('/get-started');
      }
    }, 3000);
  });

  return (
    <div style={ContainerStyle}>
      <div>
        <div style={LogoStyle}>
          <img src={Logo} alt="Logo" />
        </div>
        <LinearProgress color="primary" value={50} variant="indeterminate" />
        {process.env.REACT_APP_VERSION} - Built at: {process.env.REACT_APP_BUILT_AT}
      </div>
    </div>
  );
};

export default LaunchPage;
