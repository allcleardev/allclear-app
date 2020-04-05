import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import Box from '@material-ui/core/Container';
import { Button, Grid } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Axios from 'axios';

import Header from '../components/header-round';
import ProgressBottom from '../components/progressBottom';
import PhoneNumber from '../components/phoneNumber';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function PhoneVerify({ props }) {
  const [state, setState] = React.useState({
    checkedB: true,
    loading: false,
  });

  const history = useHistory();

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const verifyPhoneNumber = async () => {
    setState({ loading: true });
    let phone = sessionStorage.getItem('phone');

    if (!phone) {
      //show error message
      setState({ loading: false });
      return;
    }
    await Axios.post('https://api-dev.allclear.app/peoples/start', {
      phone: phone,
      beenTested: false,
      haveSymptoms: false,
    })
      .then((response) => {
        console.log(response);
        sessionStorage.setItem('phone', phone);
        history.push('/phone-verification');
      })
      .catch((error) => {
        //show error message
        setState({ loading: false });
      });
  };

  return (
    <div className="background-responsive">
      <Box className="phone-verify">
        <Header>
          <h1 style={{ justifyContent: 'center', margin: '0' }}>Phone Number</h1>
          <p>Enter your phone number to get started.</p>
        </Header>

        {state.loading === false ? (
          <form noValidate autoComplete="off" className="body-phone-verify" style={{ textAlign: 'center' }}>
            <Grid container justify="center">
              <Grid item xs={12} sm={6}>
                <PhoneNumber className="hide-mobile"></PhoneNumber>
              </Grid>
            </Grid>

            <p className="turn-white text-grey" style={{ padding: '30px 0' }}>
              Please review and agree to the{' '}
              <span style={{ color: '#002C83' }}>
                <strong>Terms & Conditions</strong>
              </span>{' '}
              and{' '}
              <span style={{ color: '#002C83' }}>
                <strong>Privacy Policy</strong>
              </span>{' '}
              before continuing
            </p>
            <FormControlLabel
              control={<Checkbox checked={state.checkedB} onChange={handleChange} name="checkedB" color="third" />}
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
        ) : (
          <Grid container justify="center">
            <Grid item xs={12} sm={6}>
              <LinearProgress color="primary" value="50" />
            </Grid>
          </Grid>
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
