import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import Box from '@material-ui/core/Container';
import { Button, Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';

import Header from '../components/header-round';
import ProgressBottom from '../components/progressBottom';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function PhoneVerify({ props }) {
  const [state, setState] = React.useState({
    checkedB: true,
    loading: false,
  });

  const history = useHistory();

  //eslint-disable-next-line
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  //eslint-disable-next-line
  async function loginVerification() {
    setState({ loading: true });
    const phone = sessionStorage.getItem('phone');

    console.log('phone', phone);

    if (!phone) {
      //show error message
      setState({ loading: false });
      return;
    }
    await Axios.post('https://api-dev.allclear.app/peoples/start', {
      phone,
      beenTested: false,
      haveSymptoms: false,
    })
      .then((response) => {
        console.log(response);
        history.push('/phone-verify-success');
      })
      .catch((error) => {
        //show error message
        setState({ loading: false });
      });
  }

  const [value, setValue] = React.useState('');

  const handleCodeChange = (event) => {
    setValue(event.target.value);
  };

  const grid = (
    <Grid container justify="center">
      <Grid item xs={12} sm={6}>
        <LinearProgress color="primary" value="50" variant="indeterminate" />
      </Grid>
    </Grid>
  );

  return (
    <div className="background-responsive">
      <Box className="login-verification">
        <Header navigate="/login">
          <h1 style={{ justifyContent: 'center', margin: '0' }}>Sign In</h1>
          <p>Enter your phone number to be sent a verification code.</p>
        </Header>

        {state.loading === false ? (
          <form noValidate autoComplete="off" className="body-phone-verify" style={{ textAlign: 'center' }}>
            <div>
              <p className="turn-white text-grey" style={{ padding: '30px 0' }}>
                We texted your phone *** *** ***42. Please enter the code to sign in.
              </p>
              <Grid container justify="center" style={{ marginBottom: '42px' }}>
                <Grid item xs={12} sm={6}>
                  <FormControl className="form-control" style={{ height: '100%' }}>
                    <TextField
                      id="outlined-margin-none"
                      className="white-back-input"
                      variant="outlined"
                      label={value === '' ? 'Verification Code' : ''}
                      height="60px"
                      onChange={handleCodeChange}
                      InputLabelProps={{ shrink: false }}
                      value={value}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </div>
            <div className="flexrow wid100 btn-group">
              <Link to="/login" className="wid100-sm">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  className="button btn-outlined-white btn-full-width font-weight-600 mobile-grey"
                >
                  Restart
                </Button>
              </Link>
              <Button
                // onClick={() => loginVerification()}
                variant="contained"
                color="primary"
                fullWidth
                className="button btn-responsive btn-full-width font-weight-600"
              >
                Verify
              </Button>
              <p className="color-primary show-mobile-sm" style={{ padding: '15px 0', display: 'none' }}>
                <strong>Create Account</strong>
              </p>
            </div>
          </form>
        ) : (
          grid
        )}

        {state.loading === false ? (
          <div style={{ padding: '3px 0' }} className="hide-mobile">
            <ProgressBottom progress="100px"></ProgressBottom>
          </div>
        ) : null}
      </Box>
    </div>
  );
}
