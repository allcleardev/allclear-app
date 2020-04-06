import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import qs from 'qs';
import Form from '@material-ui/core/Container';
import { Button, Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';

import Header from '../components/header-round';
import ProgressBottom from '../components/progressBottom';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useCookies } from 'react-cookie';

export default function PhoneVerify({ props, location }) {
  const [state, setState] = React.useState({
    checkedB: true,
    loading: false
  });

  //eslint-disable-next-line
  const [cookies, setCookie] = useCookies(['cookie-name']);

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

    await Axios.put(
      'https://api-dev.allclear.app/peoples/auth',
      {
        phone: phone,
        token: code
      }
    ).then((response) => {
      console.log('response', response);
      setCookie('sessid', response.data.id);
      sessionStorage.setItem('sessid', response.data.id);
      history.push("/profile-view");
    }).catch((error) => {
      console.log('error', error);
      // TODO Display Error Message
    });

  };

  const [value, setValue] = React.useState("");

  const handleCodeChange = event => {
    setValue({ code: event.target.value });
    sessionStorage.setItem('code', event.target.value);
  };

  return (
    <div className="background-responsive">
      <div className="phone-verification onboarding-page">
        <Header>
          <h1 className="heading">Phone Number</h1>
          <h2 className="sub-heading">Enter your phone number to get started.</h2>
        </Header>

        {
          state.loading === false ?
            <Form noValidate autoComplete="off" className="onboarding-body">
              <div className="content-container">
                <p>
                  We texted a verification code to your phone. Please enter the
                  code to sign in.
                </p>

                <FormControl className="control">
                  <TextField
                    className="input"
                    defaultValue=""
                    InputLabelProps={{ shrink: false }}
                    onChange={handleCodeChange}
                    // label={value === "" ? "Verification Code" : ""} // commenting out for now
                    placeholder="Verification Code"
                    variant="outlined"
                    style={{}}
                  />
                </FormControl>
              </div>

              <div className="button-container">
                <Link to="/create-account">
                  <Button
                    variant="contained"
                    className="back"
                  >
                    Restart
                  </Button>
                </Link>
                <Button
                  onClick={() => verifyPhoneNumber()}
                  variant="contained"
                  color="primary"
                  className="next"
                >
                  Verify
                </Button>
              </div>
            </Form>
            :
            <Grid container justify="center">
              <Grid item xs={12} sm={6}>
                <LinearProgress color="primary" value="50" />
              </Grid>
            </Grid>
        }
        {
          state.loading === false ?
            <ProgressBottom progress="100px"></ProgressBottom>
            : null
        }
      </div>
    </div>
  );
}