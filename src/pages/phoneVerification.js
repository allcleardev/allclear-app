import React from "react";
import { Link, useHistory } from "react-router-dom";

import Box from "@material-ui/core/Container";
import { Button, Grid } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";

import Header from "../components/header-round";
import ProgressBottom from "../components/progressBottom";
import LinearProgress from "@material-ui/core/LinearProgress";

export default function PhoneVerify({ props }) {
  const [state, setState] = React.useState({
    checkedB: true,
    loading: false
  });

  const history = useHistory();

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const verifyPhoneNumber = async () => {
    setState({ loading: true });
    const phone = sessionStorage.getItem("phone");

    console.log("phone", phone);

    if (!phone) {
      //show error message
      setState({ loading: false });
      return;
    }
    const response = await Axios.post(
      "https://api-dev.allclear.app/peoples/start",
      {
        phone: phone,
        beenTested: false,
        haveSymptoms: false
      }
    )
      .then(response => {
        console.log(response);
        history.push("/phone-verify-success");
      })
      .catch(error => {
        //show error message
        setState({ loading: false });
      });
  };

  const [value, setValue] = React.useState("");

  const handleCodeChange = event => {
    setValue(event.target.value);
  };

  return (
    <div className="background-responsive">
      <Box className="phone-verification">
        <Header>
          <h1 style={{ justifyContent: "center", margin: "0" }}>
            Phone Number
          </h1>
          <p>Enter your phone number to get started.</p>
        </Header>

        {state.loading === false ? (
          <form
            noValidate
            autoComplete="off"
            className="body-phone-verify"
            style={{ textAlign: "center" }}
          >
            <div>
              <p className="turn-white text-grey" style={{ padding: "30px 0" }}>
                We texted a verification code to your phone. Please enter the
                code to sign in.
              </p>
              <Grid container justify="center">
                <Grid item xs={12} sm={6}>
                  <FormControl
                    className="form-control"
                    style={{ height: "100%" }}
                  >
                    <TextField
                      id="outlined-margin-none"
                      defaultValue=""
                      className="white-back-input"
                      variant="outlined"
                      label={value === "" ? "Verification Code" : ""}
                      height="60px"
                      onChange={handleCodeChange}
                      InputLabelProps={{ shrink: false }}
                      value={value}
                      style={{}}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </div>
            <div className="flexrow wid100 btn-group">
              <Link to="/create-account" className="wid100-sm">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth="true"
                  className="button btn-outlined-white btn-full-width font-weight-600 mobile-grey"
                >
                  Restart
                </Button>
              </Link>
              <Button
                onClick={() => verifyPhoneNumber()}
                variant="contained"
                color="primary"
                fullWidth="true"
                className="button btn-responsive btn-full-width font-weight-600"
              >
                Verify
              </Button>
              <p
                className="color-primary show-mobile-sm"
                style={{ padding: "15px 0", display: "none" }}
              >
                <strong>Sign into Existing Account</strong>
              </p>
            </div>
          </form>
        ) : (
          <Grid container justify="center">
            <Grid item xs={12} sm={6}>
              <LinearProgress color="primary" value="50" />
            </Grid>
          </Grid>
        )}

        {state.loading === false ? (
          <div style={{ padding: "3px 0" }} className="hide-mobile">
            <ProgressBottom progress="100px"></ProgressBottom>
          </div>
        ) : null}
      </Box>
    </div>
  );
}
