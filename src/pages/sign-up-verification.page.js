import React, {useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useCookies} from 'react-cookie';

import Axios from 'axios';
import Form from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import {Button, Grid} from '@material-ui/core';

import RoundHeader from '../components/general/headers/header-round';
import ProgressBottom from '../components/general/navs/progress-bottom';
import LinearProgress from '@material-ui/core/LinearProgress';

import PeopleService from '@services/people.service';

import {AppContext} from '@contexts/app.context';

export default function SignUpVerificationPage({props, location}) {
  const { appState, setAppState } = useContext(AppContext);
  const peopleService = PeopleService.getInstance();

  //eslint-disable-next-line
  const [state, setState] = React.useState({
    checkedB: true,
    loading: false,
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

    const response = await peopleService.confirmAuthRequest({phone, code});

    if (!response.err) {
      setAppState({
        ...appState,
        sessionId: response.data.id,
        person:response.data.person
      });

      this.props.history.push('/map');
    } else {
      //TODO Error Message
    }
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      verifyPhoneNumber();
    }
  };

  //eslint-disable-next-line
  const [value, setValue] = React.useState('');

  const handleCodeChange = (event) => {
    setValue({code: event.target.value});
    sessionStorage.setItem('code', event.target.value);
  };

  return (
    <div className="background-responsive">
      <div className="verification onboarding-page">
        <RoundHeader navigate={'/sign-up'}>
          <h1 className="heading">Phone Number</h1>
          <h2 className="sub-heading">
            We texted a verification code to your phone. Please enter the code to continue.
          </h2>
        </RoundHeader>

        {state.loading === false ? (
          <Form noValidate autoComplete="off" className="onboarding-body">
            <div className="content-container">
              <FormControl className="control">
                <TextField
                  id="token"
                  name="token"
                  className="input code-input"
                  placeholder="Enter Code"
                  variant="outlined"
                  defaultValue=""
                  autoComplete="one-time-code"
                  inputProps={{maxLength: 6, autoComplete: 'one-time-code', inputMode: 'numeric', pattern: '[0-9]*'}}
                  InputLabelProps={{shrink: false}}
                  onChange={handleCodeChange}
                  style={{}}
                  onKeyPress={(e) => onKeyPress(e)}
                />
              </FormControl>
            </div>

            <div className="button-container">
              <Link to="/sign-up">
                <Button variant="contained" className="back hide-mobile">
                  Back
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
               <LinearProgress color="primary" value={50} variant="indeterminate"/>
             </Grid>
           </Grid>
         )}
        {state.loading === false ? <ProgressBottom progress="75%"></ProgressBottom> : null}
      </div>
    </div>
  );
}
