import React from "react";
import { Link, useHistory } from "react-router-dom";

import Box from "@material-ui/core/Container";
import { Button, Grid } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Axios from "axios";

import Header from "../components/header-round";
import PhoneNumber from "../components/phoneNumber";
import MuiPhoneNumber from "material-ui-phone-number";
import PropTypes from "prop-types";

const styles = {};
export default function PhoneVerify({ props }) {
  const [state, setState] = React.useState({
    checkedB: true,
    phone: ""
  });

  const history = useHistory();

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handlePhoneChange = (value) => {
    if (value) {
      setState({ phone: value });
    }
  };

  // Function to make call backend service to initiate the magic link
  const verifyPhoneNumber = async () => {
    console.log('state', state);
    console.log('props', props);

    await Axios.post(
      "https://allclear-dev.azurewebsites.net/peoples/start",
      {
        phone: state.phone,
        beenTested: true,
        haveSymptoms: true
      }
    ).then((response) => {
      console.log('response', response);
      history.push("/phone-verify-success");
    }).catch((error) => {
      console.log('error', error)
    });
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
        <form noValidate autoComplete="off" style={{ textAlign: "center" }}>
          <Grid container justify="center">
            <Grid item xs={12} sm={6}>
              <MuiPhoneNumber
                name="phone"
                label="Phone Number"
                data-cy="user-phone"
                defaultCountry={"us"}
                value={state.phone}
                onChange={handlePhoneChange}
                className="hide-desktop"
                style={{ margin: "80px 0" }}
              />
              <MuiPhoneNumber
                name="phone"
                label="Phone Number"
                data-cy="user-phone"
                defaultCountry={"us"}
                value={state.phone}
                onChange={handlePhoneChange}
                className="input-white-back-phone hide-mobile"
                style={{ margin: "80px 0" }}
              />
            </Grid>
          </Grid>
          <p className="turn-white text-grey" style={{ padding: "30px 0" }}>
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
      </Box>
    </div>
  );
}
PhoneNumber.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};
