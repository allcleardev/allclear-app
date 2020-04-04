import React from "react";
import Header from "../components/header-round";
import ProgressBottom from "../components/progressBottom";

import Box from "@material-ui/core/Container";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import TextField from "@material-ui/core/TextField";

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

  const [valueExposure, setExposureValue] = React.useState("live_with_someone");
  const [dobExposure, setDobValue] = React.useState("");

  sessionStorage.setItem('exposure', "live_with_someone");
  sessionStorage.setItem('testing', "tested");

  const handleExposureChange = (event, newValue) => {
    if (!newValue) return;
    setExposureValue(newValue);
    sessionStorage.setItem('exposure', newValue);
  };

  const handleLocationChange = (event) => {
    console.log(event.target.value);
    if (event && event.target && event.target.value) {
      setDobValue(event.target.value);
      sessionStorage.setItem('location', event.target.value);
    }
  };

  const handleDoBChange = (event) => {
    console.log(event.target.value);
    if (event && event.target && event.target.value) {
      sessionStorage.setItem('dob', event.target.value);
    }
  };

  return (
    <div className="background-responsive">
      <div className="background onboarding-page">
        <Header>
          <h1 class="heading">Background</h1>
          <h2 class="sub-heading">Provide information to help us recommend the test sites for you.</h2>
        </Header>

        <div style={bodyStyle}>
          <div className="">

            <div className="row wid100">
              <div className="col-lg-7 text-left">
                <div className="BGleft">
                  <div className="BGheadings">
                    <div className="bg1 bgsyle1"><strong>Location</strong> (Required)</div>
                    <div className="bg2 bgsyle2">We can give localized test center recommendations with
                      your location.
                    </div>
                    <p>
                      <input className="inputSet" type="text" placeholder="Location"
                              onchange={handleLocationChange}/>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 text-left">
                <div className="BGright">
                  <div className="BGheadings">
                    <div className="bg1 bgsyle1"><strong>Date of Birth</strong> (Required)</div>
                    <div className="bg2 bgsyle2">Some test centers have minimum age requirements.</div>
                    <p>
                      <input className="inputSets" type="text" placeholder="MM/DD/YYYY"
                              onchange={handleDoBChange} value={dobExposure}/>
                      <TextField
                        className="inputSets"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="dob"
                        onchange={handleDoBChange}
                        label="MM/DD/YYYY"
                        name="dob"
                        autoComplete="dob"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="BGheadings">
              <div className="bg1">Exposure to COVID-19</div>
              <div className="bg2">Some test centers require knowledge of your exposure to people who have
                tested positive for COVID-19.</div>
            </div>

            <ToggleButtonGroup
              value={valueExposure}
              exclusive
              onChange={handleExposureChange}
              aria-label="Testing"
              className="toggleButtonGroup"
            >
              <ToggleButton
                value="live_with_someone"
                aria-label="live_with_someone"
                className="toggleButton"
              >
                Live with someone
              </ToggleButton>
              <ToggleButton
                value="known_contact_with_someone"
                aria-label="known_contact_with_someone"
                className="toggleButton"
              >
                Known contact with someone
              </ToggleButton>
              <ToggleButton
                value="not_sure"
                aria-label="not_sure"
                className="toggleButton"
              >
                Not sure
              </ToggleButton>
              <ToggleButton
                value="no_contact"
                aria-label="no_contact"
                className="toggleButton"
              >
                No Contact (Self-Quarantine)
              </ToggleButton>
            </ToggleButtonGroup>
          </div>





          <Grid container justify="center">
            <Grid item xs={12} sm={4}>
              <Link to="/condition">
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
        <ProgressBottom progress="1"></ProgressBottom>
      </div>
    </div>
  );
}
