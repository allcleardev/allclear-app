import React from 'react';
import HeaderRound from '../components/header-round';

import Box from '@material-ui/core/Container';
import { Button, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const ContainerStyle = {
  height: "100vh",
  background: "linear-gradient(to right, #28baff, #1195ff)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

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
      <HeaderRound title="Phone Number" description="Enter your phone number to get started."></HeaderRound>
      <div style={bodyStyle}>
        <Input placeholder="Phone Number" fullWidth="true"></Input>
        <h4 style={{color: "#999999"}}>Please review and agree to the <span style={{color: "#007AFF"}}>Terms & Conditions</span> and <span style={{color: "#007AFF"}}>Privacy Policy</span> before continuing</h4>
        <Button variant="contained" color="primary" fullWidth="true" style={{height: "48px", backgroundColor: "#007AFF", margin: "30px 0"}}>
          Verify Phone Number
        </Button>
      </div>
    </Box>
  );
}