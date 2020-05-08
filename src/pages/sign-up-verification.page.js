import React, { Component } from 'react';
import { bindAll } from 'lodash';

import PeopleService from '@services/people.service';
import GAService from '@services/ga.service';

import ProgressBottom from '@general/navs/progress-bottom';
import OnboardingNavigation from '@general/navs/onboarding-navigation';
import { AppContext } from '@contexts/app.context';
import { withVerification } from '@hocs/verification';

import Header from '@components/general/headers/header';
import { ONBOARDING_NAV_ITEMS } from '@components/general/headers/header.constants';
import { Button, Container, TextField, FormControl, CircularProgress } from '@material-ui/core';

const peopleService = PeopleService.getInstance();
const onVerification = (data) => peopleService.confirmAuthRequest(data);
const onAuthentication = (authPayload) => peopleService.authStart(authPayload);

export default withVerification('sign-up-verification', 'sign-up', onVerification, onAuthentication, false);

/*
export default class SignUpVerificationPage extends Component {
  static contextType = AppContext;
  state = {
    checkedB: true,
    loading: false,
    code: undefined,
    smsTimeoutEnabled: false,
    error: false,
  };

  constructor(props) {
    super(props);
    bindAll(this, [
      'sanitizePhone',
      'verifyPhoneNumber',
      'resendCode',
      'setSMSTimeout',
      'validateState',
      'handleCodeChange',
      'onKeyPress',
    ]);
    this.peopleService = PeopleService.getInstance();
    this.gaService = GAService.getInstance();
    this.gaService.setScreenName('sign-up-verification');
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
      return this.routeChange('/sign-up');
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
  }

  // Function to make call backend service to confirm the magic link
  async verifyPhoneNumber() {
    this.setState({ loading: true });

    const { appState, setAppState } = this.context;

    let phone = appState.person.phone;
    const code = this.state.code;

    phone = this.sanitizePhone(phone);

    const response = await this.peopleService.confirmAuthRequest({ phone, code });

    if (!response.err) {
      setAppState({
        ...appState,
        sessionId: response.data.id,
        person: response.data.person,
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
  }

  async resendCode() {
    const { appState } = this.context;
    const signUpPayload = appState.signUpPayload; // different

    //reset sms text timeout
    this.setSMSTimeout();

    this.setState({ loading: true });

    if (!signUpPayload) {
      this.setState({ loading: false });
      return this.props.history.push('/sign-up');
    }

    const response = await this.peopleService.authStart(signUpPayload); // different

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
  }

  handleCodeChange(event) {
    this.setState({ code: event.target.value });
  }

  render() {
    return (
      <div className="verification onboarding-page">
        <Header navItems={ONBOARDING_NAV_ITEMS} enableBackBtn={true}>
          <h1>Verification Code</h1>
          <h2>We texted a verification code to your phone. Please enter the code to continue.</h2>
        </Header>

        {this.state.loading === false ? (
          <Container className="onboarding-body">
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
                  inputProps={{
                    maxLength: 6,
                    autoComplete: 'one-time-code',
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                  }}
                  InputLabelProps={{ shrink: false }}
                  onChange={this.handleCodeChange}
                  style={{}}
                  onKeyPress={(e) => this.onKeyPress(e)}
                />
              </FormControl>

              <div className="alert-messages">
                {this.state.error === true ? <p className="error">{this.state.message}</p> : ''}
                {this.state.smsTimeoutEnabled === true ? <p className="no-code-message">Didnt receive a code?</p> : ''}
                {this.state.smsTimeoutEnabled === true ? (
                  <Button onClick={() => this.resendCode()} variant="contained" className="back">
                    Resend Code
                  </Button>
                ) : (
                    ''
                  )}
              </div>
            </div>

            <OnboardingNavigation forwardOnClick={this.verifyPhoneNumber} forwardText={'Verify'}></OnboardingNavigation>
          </Container>
        ) : (
            <Container className="onboarding-body">
              <CircularProgress color="primary" size={108} />
            </Container>
          )}
        {this.state.loading === false ? <ProgressBottom progress="75%"></ProgressBottom> : null}
      </div>
    );
  }
}
*/
