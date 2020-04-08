import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import Form from '@material-ui/core/Container';

import { Button, Grid, Tooltip, withStyles } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Axios from 'axios';

import RoundHeader from '../components/headers/header-round';
import ProgressBottom from '../components/progressBottom';
import PhoneNumber from '../components/phoneNumber';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function PhoneVerify({ props }) {
  const [state, setState] = React.useState({
    termsAndConditions: false,
    alertable: false,
    loading: false,
  });

  const history = useHistory();

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });

    // Capture alerts opt-in
    if (event.target.name === 'alertable') {
      sessionStorage.setItem('alertable', event.target.checked);
    }
  };

  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#fff',
      color: '#999',
      boxShadow: theme.shadows[4],
      fontSize: 13,
      padding: 20,
      borderRadius: 8,
    },
  }))(Tooltip);

  const onSendVerificationClicked = async () => {
    setState({ loading: true });
    let phone = sessionStorage.getItem('phone');

    if (!phone) {
      //show error message
      setState({ loading: false });
      return;
    }
    Axios.post('https://api-dev.allclear.app/peoples/start', {
      phone,
    })
      .then((response) => {
        sessionStorage.setItem('phone', phone);
        history.push('/sign-up-verification');
      })
      .catch((error) => {
        if (error && error.response) {
          if (
            error.response.data &&
            error.response.data.message &&
            error.response.data.message.includes('already exists')
          ) {
            return verifyLogin();
          } else if (error.response.data && error.response.data.message) {
            setState({
              error: true,
              message: error.response.data.message,
              loading: false,
            });
          } else {
            setState({
              error: true,
              message: 'An error occurred. Please try again later.',
              loading: false,
            });
          }
        } else {
          setState({ loading: false });
        }
      });
  };

  async function verifyLogin() {
    setState({ loading: true });
    const phone = sessionStorage.getItem('phone');

    if (!phone) {
      //show error message
      setState({ loading: false });
      return;
    }
    await Axios.post('https://api-dev.allclear.app/peoples/auth', {
      phone,
    })
      .then((response) => {
        sessionStorage.setItem('phone', phone);
        history.push('/sign-in-verification');
      })
      .catch((error) => {
        //show error message
        setState({ loading: false });
      });
  }

  return (
    <div className="background-responsive">
      <div className="sign-up onboarding-page">
        <RoundHeader>
          <h1 className="heading">Phone Number</h1>
          <h2 className="sub-heading">Enter your phone number to get started.</h2>
        </RoundHeader>
        {state.loading === false ? (
          <Form noValidate autoComplete="off" className="onboarding-body">
            <div className="content-container">
              <PhoneNumber className="hide-mobile"></PhoneNumber>
              <Link to="/sign-in" className="hide-mobile sign-in">
                Sign into Existing Account
              </Link>
              {state.error === true ? <p className="error">{state.message}</p> : ''}
            </div>

            <div className="review-container">
              <p>
                <a href="https://staging.about.allclear.app/"> Terms & Conditions </a> and
                <a href="https://staging.about.allclear.app/"> Privacy Policy </a>
              </p>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.termsAndConditions}
                    onChange={handleChange}
                    name="termsAndConditions"
                    color="secondary"
                  />
                }
                label="I have reviewed and agree to the Terms & Conditions and Privacy Policy."
              />

              <FormControlLabel
                control={
                  <Checkbox checked={state.alertable} onChange={handleChange} name="alertable" color="secondary" />
                }
                label="Receive text alerts when eligible test locations become available."
              />
            </div>

            {/* TODO: Move Onboarding button-container into its own component */}
            <div className="button-container">
              <Link to="/sign-in" className="hide-desktop sign-in">
                Sign into Existing Account
              </Link>
              <LightTooltip
                title={
                  !state.termsAndConditions
                    ? 'Please review and agree to the Terms & Conditions and Privacy Policy'
                    : ''
                }
              >
                <span className="tooltip-button">
                  <Button
                    className="next"
                    color="primary"
                    variant="contained"
                    onClick={() => onSendVerificationClicked()}
                    disabled={!state.termsAndConditions}
                  >
                    Send Verification Code
                  </Button>
                </span>
              </LightTooltip>
            </div>
          </Form>
        ) : (
          <Grid container justify="center">
            <Grid item xs={12} sm={6}>
              <LinearProgress color="primary" value="50" variant="indeterminate" />
            </Grid>
          </Grid>
        )}
        {state.loading === false ? <ProgressBottom progress="0"></ProgressBottom> : null}
      </div>
    </div>
  );
}
