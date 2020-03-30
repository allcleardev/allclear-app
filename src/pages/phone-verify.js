import React from "react";
import { Link } from "react-router-dom";

import Box from "@material-ui/core/Container";
import { Button, Input, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Header from "../components/header-round";

const bodyStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // height: "100vh",
  flexDirection: "column",
  alignContent: "space-between"
};

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default function PhoneVerify({}) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    checkedB: true
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <Box>
      <Header>
        <h1 style={{ justifyContent: "center", margin: "0" }}>Phone Number</h1>
        <p>Enter your phone number to get started.</p>
      </Header>
      <FormGroup row style={bodyStyle}>
        <Grid container justify="center">
          <Grid item xs={12} sm={6}>
            <Input
              placeholder="Phone Number"
              fullWidth="true"
              style={{ margin: "120px 0" }}
            ></Input>
          </Grid>
        </Grid>
        <h4 style={{ color: "#999999", margin: "50px 0" }}>
          Please review and agree to the{" "}
          <span style={{ color: "#007AFF" }}>Terms & Conditions</span> and{" "}
          <span style={{ color: "#007AFF" }}>Privacy Policy</span> before
          continuing
        </h4>
        <FormControlLabel
          style={{ width: "85%" }}
          control={
            <Checkbox
              checked={state.checkedB}
              onChange={handleChange}
              name="checkedB"
              color="primary"
            />
          }
          label="I have reviewed and agree to the Terms & Conditions and Privacy Policy"
          style={{
            fontSize: "13px !important",
            color: "#999999",
            marginLeft: "0"
          }}
        />
        <Link to="/complete-profile">
          <Button
            variant="contained"
            color="primary"
            fullWidth="true"
            style={{
              height: "48px",
              backgroundColor: "#007AFF",
              margin: "60px 0"
            }}
          >
            Verify Phone Number
          </Button>
        </Link>
      </FormGroup>
    </Box>
  );
}
