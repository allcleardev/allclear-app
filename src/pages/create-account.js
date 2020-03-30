import React from "react";
import Header from "../components/header-round";
import ProgressBottom from "../components/progressBottom";

import Box from "@material-ui/core/Container";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const bodyStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // height: "100vh",
  flexDirection: "column",
  alignContent: "space-between"
};

const useStyles = makeStyles(theme => ({
  toggleButtonStyle: {},
  MuiToggleButton: {
    color: "red"
  }
}));

export default function CreateAccount() {
  const classes = useStyles();

  const [valueSympotyms, setSymptomsValue] = React.useState("nosymptoms");

  const [valueTesting, setValue] = React.useState("tested");

  const handleSymtomsChange = (event, newValue) => {
    if (!newValue) return;
    setValue(newValue);
  };

  const handleChange = (event, newValue) => {
    if (!newValue) return;
    setSymptomsValue(newValue);
  };

  return (
    <div className="background-responsive">
      <Box className="create-profile">
        <Header>
          <h1>Create Account</h1>
          <p>
            First, tell us a litte about yourself so we know how to help you
            best.
          </p>
        </Header>


      <div style={bodyStyle}>
        <h4>COVID-19 TESTING</h4>


          <ToggleButtonGroup
            value={valueTesting}
            exclusive
            onChange={handleSymtomsChange}
            aria-label="Testing"
            className="toggleButtonGroup"
          >
            <ToggleButton
              value="wantTest"
              aria-label="wantTest"
              className="toggleButton"
            >
              I want to be tested
            </ToggleButton>
            <ToggleButton
              value="tested"
              aria-label="tested"
              className="toggleButton"
            >
              I have been tested
            </ToggleButton>
            <ToggleButton
              value="neither"
              aria-label="neither"
              className="toggleButton"
            >
              Neither
            </ToggleButton>
          </ToggleButtonGroup>

          <h4>CORVID-19 SYMPTOMS</h4>
          <ToggleButtonGroup
            value={valueSympotyms}
            exclusive
            onChange={handleChange}
            aria-label="Testing"
            className="toggleButtonGroup"
          >
            <ToggleButton
              value="nosymptoms"
              aria-label="nosymptoms"
              className="toggleButton"
            >
              I don't have symptoms
            </ToggleButton>
            <ToggleButton
              value="hadsymtoms"
              aria-label="hadsymtoms"
              className="toggleButton"
            >
              I had symptoms
            </ToggleButton>
            <ToggleButton
              value="havesymtoms"
              aria-label="havesymtoms"
              className="toggleButton"
            >
              I have symptoms
            </ToggleButton>
          </ToggleButtonGroup>
          <Grid container justify="center">
            <Grid item xs={12} sm={4}>
              <Link to="/phone-verify">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth="true"
                  className="button btn-responsive font-weight-600"
                >
                  Create Account
                </Button>
              </Link>

              <p className="text-grey hide-desktop">
                Already have an account?{" "}
                <span style={{ color: "#007AFF" }}>Sign In</span>
              </p>
            </Grid>
          </Grid>
        </div>
        <ProgressBottom></ProgressBottom>
      </Box>
    </div>
  );
}
