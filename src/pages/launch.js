import React, { useEffect,  } from 'react';
import { useHistory } from 'react-router-dom';

// import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const LogoStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  width: "161px",
  height: "161px",
  background: "#FFFFFF",
  fontFamily: "'Source Sans Pro', sans-serif",
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "17px",
  marginTop: "-20px"
};

const ContainerStyle = {
  height: "100vh",
  background: "linear-gradient(to right, #28baff, #1195ff)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const Launch = ({props}) => {

  const history = useHistory();

  useEffect(() => {
    console.log(props);
    setTimeout(() => {
      history.push('/create-account');
    }, 3000);
  })

  return (
    <div maxWidth="xs" style={ContainerStyle}>
      <div>
        <div style={LogoStyle}>
          Logo
        </div>

        <LinearProgress color="primary" value="50" />
      </div>
    </div>
  );
}

export default Launch;