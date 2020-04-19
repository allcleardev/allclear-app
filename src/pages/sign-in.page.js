import React, {useContext} from 'react';
import { Link, useHistory } from 'react-router-dom';

import Form from '@material-ui/core/Container';

import { Button, Grid } from '@material-ui/core';
import Axios from 'axios';

import RoundHeader from '../components/general/headers/header-round';
import PhoneNumberInput from '../components/general/inputs/phone-number-input';
import LinearProgress from '@material-ui/core/LinearProgress';
import {AppContext} from '@contexts/app.context';

export default function SignInPage({ props }) {

  const { appState } = useContext(AppContext);

  const [state, setState] = React.useState({
    loading: false,
  });

  const history = useHistory();

  //eslint-disable-next-line
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  async function verifyLogin() {

    setState({ loading: true });
    const phone = appState.person.phone;

    if (!phone) {
      setState({ loading: false });
      return;
    }
    await Axios.post('/peoples/auth', {
      phone,
    })
      .then((response) => {
        history.push('/sign-in-verification');
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
  }

  return (
    <div className="background-responsive">
      <div className="login onboarding-page">
        <RoundHeader>
          <h1 className="heading">Phone Number</h1>
          <h2 className="sub-heading">Enter your phone number to access your account.</h2>
        </RoundHeader>
        {state.loading === false ? (
          <Form noValidate autoComplete="off" className="onboarding-body">
            <div className="content-container">
              <PhoneNumberInput onSubmit={() => verifyLogin()} className="hide-mobile"></PhoneNumberInput>
              <Link to="/sign-up" className="hide-mobile login">
                Create Account
              </Link>
              {state.error === true ? <p className="error">{state.message}</p> : ''}
            </div>

            <div className="button-container">
              <Link to="/background" className="hide-desktop login">
                Create Account
              </Link>
              <Button onClick={() => verifyLogin()} variant="contained" color="primary" className="next">
                Send Verification Code
              </Button>
            </div>
          </Form>
        ) : (
          <Grid container justify="center">
            <Grid item xs={12} sm={6}>
              <LinearProgress color="primary" value={50} variant="indeterminate" />
            </Grid>
          </Grid>
        )}
      </div>
    </div>
  );
}
