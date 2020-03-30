import React from "react";
import { Link } from "react-router-dom";

import Box from "@material-ui/core/Container";
import { Button, Input, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";

import Header from "../components/header-round";

const bodyStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // height: "100vh",
  flexDirection: "column",
  alignContent: "space-between"
};

export default function PhoneVerify() {
  const [state, setState] = React.useState({
    checkedB: true
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div className="background-responsive">
      <Box className="phone-verify">
        <Header>
          <h1 style={{ justifyContent: "center", margin: "0" }}>
            Phone Number
          </h1>
          <p>Enter your phone number to get started.</p>
        </Header>
        <form noValidate autoComplete="off">
          <Grid container justify="center">
            <Grid item xs={12} sm={6}>
              <TextField
                id="standard-basic"
                label="Phone Number"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  margin: "80px 0"
                }}
              />
            </Grid>
          </Grid>
          <p className="turn-white text-grey" style={{ padding: "30px" }}>
            Please review and agree to the{" "}
            <span style={{ color: "#007AFF" }}>Terms & Conditions</span> and{" "}
            <span style={{ color: "#007AFF" }}>Privacy Policy</span> before
            continuing
          </p>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedB}
                onChange={handleChange}
                name="checkedB"
                color="third"
              />
            }
            label="I have reviewed and agree to the Terms & Conditions and Privacy Policy"
            className="check-label turn-white"
          />
          <div className="flexrow wid100">
            <Link to="/create-account">
              <Button
                variant="contained"
                color="primary"
                fullWidth="true"
                className="button btn-outlined-white hide-mobile btn-full-width"
              >
                Back
              </Button>
            </Link>
            <Link to="/background">
              <Button
                variant="contained"
                color="primary"
                fullWidth="true"
                className="button btn-responsive btn-full-width"
              >
                Verify Phone Number
              </Button>
            </Link>
          </div>
        </form>
      </Box>
    </div>
  );
}
