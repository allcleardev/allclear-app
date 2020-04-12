import React from 'react';
import { Link, useHistory } from 'react-router-dom';
// import qs from 'qs';
import Form from '@material-ui/core/Container';
import { Button, Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';
import RoundHeader from '../components/headers/header-round';

export default function PhoneVerify({ props, location }) {
  const [state] = React.useState({
    checkedB: true,
    loading: false,
  });
  const [isError, setValue] = React.useState(false);

  const history = useHistory();

  const sanitizePhone = (phone) => {
    if (phone && typeof phone === 'string') {
      phone = phone.replace(/ /g, '');
      phone = phone.replace('(', '');
      phone = phone.replace(')', '');
      phone = phone.replace('-', '');
    }

    return phone;
  };

  // Function to make call backend service to confirm the magic link
  const verifyPhoneNumber = async () => {
    let phone = sessionStorage.getItem('phone');
    const code = sessionStorage.getItem('code');

    phone = sanitizePhone(phone);

    await Axios.put('/peoples/auth', {
      phone,
      token: code,
    })
      .then((response) => {
        localStorage.setItem('sessid', response.data.id);
        localStorage.setItem('session', JSON.stringify(response.data));

        if (response.data.person) {
          // todo: set latlng to appprovider here
        }

        history.push('/map');
      })
      .catch((error) => {
        setValue(true);
        console.log('error', error);
        // TODO Display Error Message
      });
  };

  const handleCodeChange = (event) => {
    setValue(false);
    sessionStorage.setItem('code', event.target.value);
  };

  return (
    <div className="background-responsive">
      <div className="verification onboarding-page">
        <RoundHeader navigate={'/sign-in'}>
          <h1 className="heading">Sign In</h1>
          <h2 className="sub-heading">Enter your phone number to be sent a verification code.</h2>
        </RoundHeader>

        {state.loading === false ? (
          <Form noValidate autoComplete="off" className="onboarding-body">
            <div className="content-container">
              <p>We texted a verification code to your phone. Please enter the code to sign in.</p>

              <FormControl className="control">
                <TextField
                  id="token"
                  name="token"
                  className="input code-input"
                  placeholder="Enter Code"
                  variant="outlined"
                  defaultValue=""
                  autoComplete="one-time-code"
                  inputProps={{ maxLength: 6, autoComplete: 'one-time-code', inputMode: 'numeric', pattern: '[0-9]*' }}
                  InputLabelProps={{ shrink: false }}
                  onChange={handleCodeChange}
                  style={{}}
                />
                {isError ? <p className="codeError">You're entered an incorrect code. Please Try again</p>: ''}
              </FormControl>
            </div>

            <div className="button-container">
              <Link to="/sign-up">
                <Button variant="contained" className="back">
                  Restart
                </Button>
              </Link>
              <Button onClick={() => verifyPhoneNumber()} variant="contained" color="primary" className="next">
                Verify
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
