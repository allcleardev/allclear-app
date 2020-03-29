import React from 'react';
import HeaderRound from '../components/header-round';

import Box from '@material-ui/core/Container';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const ContainerStyle = {
  height: "100vh",
  background: "linear-gradient(to right, #28baff, #1195ff)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const headerStyle = {
  background: "linear-gradient(to right, #28baff, #1195ff)",
  borderRadius: "100%",
  marginLeft: "-50vw",
  marginRight: "-50vw",
  padding: "120px 0",
  textAlign: "center",
  paddingLeft: "50vw",
  marginTop: "-40px",
  paddingRight: "50vw",
  color: "#FFF",
  lineHeight: "22px",
  fontFamily: "'Source Sans Pro', sans-serif",
  fontSize: "17px"
}

const bodyStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // height: "100vh",
  flexDirection: "column",
  alignContent: "space-between"
}

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function CreateAccount({}) {

  const classes = useStyles();

  return (
    <Box>
      <HeaderRound title="Create Account" description="First, tell us a litte about yourself so we know how to help you best."></HeaderRound>
      <div style={bodyStyle}>
        <h4>CORVID-19 TESTING</h4>
        <Button variant="outlined" size="small" color="primary" className={classes.margin} style={{width: "70%"}}>
          I want to be tested
        </Button>
        <Button variant="contained" size="small" color="primary" className={classes.margin} style={{width: "70%", backgroundColor: "#003297"}}>
          I have been tested
        </Button>
        <Button variant="outlined" size="small" color="primary" className={classes.margin} style={{width: "70%"}}>
          Neither
        </Button>

        <h4>CORVID-19 SYMPTOMS</h4>
        <Button variant="outlined" size="small" color="primary" className={classes.margin} style={{width: "70%"}}>
          I don't have symptoms
        </Button>
        <Button variant="contained" size="small" color="primary" className={classes.margin} style={{width: "70%", backgroundColor: "#003297"}}>
          I had symptoms
        </Button>
        <Button variant="outlined" size="small" color="primary" className={classes.margin} style={{width: "70%"}}>
          I have symptoms
        </Button>
        <Button variant="contained" color="primary" fullWidth="true" style={{height: "48px", backgroundColor: "#007AFF", margin: "30px 0"}}>
          Create Account
        </Button>

        <h4 style={{color: "#999999"}}>Already have an account? <span style={{color: "#007AFF"}}>Sign In</span></h4>
      </div>
    </Box>
  );
}