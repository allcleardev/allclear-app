import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import { Button, Grid } from '@material-ui/core';

import RoundHeader from '@general/headers/header-round';
import ProgressBottom from '@general/navs/progress-bottom';
import LinearProgress from '@material-ui/core/LinearProgress';

import PeopleService from '@services/people.service';
import { AppContext } from '@contexts/app.context';
import { bindAll } from 'lodash';
import GAService from '@services/ga.service';

export default class SignInVerificationPage extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.gaService = GAService.getInstance();
    this.gaService.setScreenName('sign-in-verification');

    this.peopleService = PeopleService.getInstance();

    //eslint-disable-next-line
    this.state = {
      checkedB: true,
      loading: false,
      code: undefined,
      smsTimeoutEnabled: false
    };

    bindAll(this, [
      'sanitizePhone',
      'verifyPhoneNumber',
      'resendCode',
      'handleCodeChange',
      'routeChange',
      'onKeyPress',
      'validateState'
    ]);
  }

  componentDidMount() {
    this.validateState();
    this.setSMSTimeout();
  }

  setSMSTimeout() {
    this.setState({ smsTimeoutEnabled: false });

    setTimeout(() => {
      this.setState({ smsTimeoutEnabled: true });
    }, 20000);
  }

  validateState() {
    const { appState } = this.context;
    const phone = appState.person.phone;

    if (!phone) {
      return this.routeChange('/sign-in');
    }
  }

  sanitizePhone = (phone) => {
    if (phone && typeof phone === 'string') {
      phone = phone.replace(/ /g, '');
      phone = phone.replace('(', '');
      phone = phone.replace(')', '');
      phone = phone.replace('-', '');
    }

    return phone;
  };

  // Function to make call backend service to confirm the magic link
  async verifyPhoneNumber() {
    const { appState, setAppState } = this.context;

    let phone = appState.person.phone;
    const token = this.state.code;

    phone = this.sanitizePhone(phone);

    const response = await this.peopleService.verifyAuthRequest({ phone, token });

    if (!response.err) {
      setAppState({
        ...appState,
        sessionId: response.data.id,
        person: response.data.person
      });

      localStorage.setItem('sessionId', response.data.id);
      localStorage.setItem('session', JSON.stringify(response.data));

      this.props.history.push('/map');
    } else {
      const error = response;

      if (error && error.response) {
        if (error.response.data && error.response.data.message) {
          this.setState({
            error: true,
            message: error.response.data.message,
            loading: false,
          });
        } else {
          this.setState({
            error: true,
            message: 'An error occurred. Please try again later.',
            loading: false,
          });
        }
      }
    }
  };

  async resendCode() {
    const { appState } = this.context;
    const phone = appState.person.phone;

    //reset sms text timeout
    this.setSMSTimeout();

    this.setState({ loading: true });

    if (!phone) {
      this.setState({ loading: false });
      return this.props.history.push('/sign-in');
    }

    const response = await this.peopleService.login({ phone });

    this.setState({ loading: false });

    if (response.err) {
      this.setState({ smsTimeoutEnabled: true });
      const error = response;

      if (error && error.response) {
        if (error.response.data && error.response.data.message) {
          this.setState({
            error: true,
            message: error.response.data.message,
            loading: false,
          });
        } else {
          this.setState({
            error: true,
            message: 'An error occurred. Please try again later.',
            loading: false,
          });
        }
      }
    }
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.verifyPhoneNumber();
    }
  };

  handleCodeChange(event) {
    this.setState({ code: event.target.value });
  };

  routeChange(route) {
    this.props.history.push(route);
  }

  render() {
    return (
      <div className="background-responsive">
        <div className="verification onboarding-page">
          <RoundHeader navigate={'/get-started'}>
            <h1 className="heading">Phone Number</h1>
            <h2 className="sub-heading">
              We texted a verification code to your phone. Please enter the code to continue.
            </h2>
          </RoundHeader>

          {this.state.loading === false ? (
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
                    inputProps={{ maxLength: 6, autoComplete: 'one-time-code', inputMode: 'numeric', pattern: '[0-9]*' }}
                    InputLabelProps={{ shrink: false }}
                    onChange={this.handleCodeChange}
                    style={{}}
                    onKeyPress={(e) => this.onKeyPress(e)}
                  />
                  {this.state.error && (
                    <FormLabel error={this.state.error} classes={{ error: 'error-message' }}>
                      You've entered an incorrect code. Please try again.
                    </FormLabel>
                  )}
                  {this.state.smsTimeoutEnabled === true ? <p className="no-code-message">Didnt receive a code?</p> : ''}
                  {this.state.smsTimeoutEnabled === true ?
                    <Button onClick={() => this.resendCode()} variant="contained" className="back">
                      Resend Code
                   </Button> : ''}


                </FormControl>

                {this.state.error === true ? <p className="error">{this.state.message}</p> : ''}
              </div>

              <div className="button-container">
                <Link to="/sign-in">
                  <Button variant="contained" className="back hide-mobile">
                    Restart
                  </Button>
                </Link>
                <Button onClick={() => this.verifyPhoneNumber()} variant="contained" color="primary" className="next">
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
          {this.state.loading === false ? <ProgressBottom progress="75%"></ProgressBottom> : null}
        </div>
      </div>
    );
  }
}
