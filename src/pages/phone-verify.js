import React from "react";
import { Link, useHistory } from "react-router-dom";

import Box from "@material-ui/core/Container";
import { Button, Grid } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";

import Header from "../components/header-round";
import ProgressBottom from "../components/progressBottom";

export default function PhoneVerify({ props }) {
  const [state, setState] = React.useState({
    checkedB: true
  });

  const history = useHistory();
  let textInput = React.createRef();

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const verifyPhoneNumber = async () => {
    // console.log(history);
    // console.log(textInput.current.value);

    const response = await Axios.post(
      "https://allclear-dev.azurewebsites.net/",
      {
        phone: textInput.current.value,
        beenTested: true,
        haveSymptoms: true
      }
    );
    console.log(response);
    history.push("/complete-profile");
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
                inputRef={textInput}
                id="standard-basic"
                label="Phone Number"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  margin: "80px 0"
                }}
                v
              />
            </Grid>
          </Grid>
          <p className="turn-white text-grey" style={{ padding: "30px" }}>
            Please review and agree to the{" "}
            <span style={{ color: "#002C83" }}>
              <strong>Terms & Conditions</strong>
            </span>{" "}
            and{" "}
            <span style={{ color: "#002C83" }}>
              <strong>Privacy Policy</strong>
            </span>{" "}
            before continuing
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
                className="button btn-outlined-white hide-mobile btn-full-width font-weight-600"
              >
                Back
              </Button>
            </Link>
            <Button
              onClick={() => verifyPhoneNumber()}
              variant="contained"
              color="primary"
              fullWidth="true"
              className="button btn-responsive btn-full-width font-weight-600"
            >
              Verify Phone Number
            </Button>
          </div>
        </form>
        <ProgressBottom progress="100px"></ProgressBottom>
      </Box>
    </div>
  );
}
