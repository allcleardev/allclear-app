import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import * as queryString from 'query-string';

import RoundHeader from '../components/general/headers/header-round';
import ProgressBottom from '../components/general/navs/progress-bottom';
import PhoneNumberInput from '../components/general/inputs/phone-number-input';

import OnboardingNavigation from '@general/navs/onboarding-navigation';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LinearProgress from '@material-ui/core/LinearProgress';
import {Button, Grid, Container} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

function SlideTransition(props) {
  return <Slide {...props} direction="up"/>;
}

export default class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      termsAndConditions: false,
      alertable: false,
      phoneVerified: false,
      loading: false,
      error: false,
      isSnackbarOpen: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    this.checkPhoneValidation = this.checkPhoneValidation.bind(this);
    this.onSendVerificationClicked = this.onSendVerificationClicked.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
  }

  async componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);
    if (queryParams.logout) {
      this.setState({
        isSnackbarOpen: true
      });
    }
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.checked,
    });

    // Capture alerts opt-in
    if (event.target.name === 'alertable') {
      sessionStorage.setItem('alertable', event.target.checked);
    }
  }

  handleSnackbarClose(event) {
    this.setState({
      isSnackbarOpen: false
    });
  }

  checkPhoneValidation(value) {
    if (value) {
      this.setState({phoneVerified: true});
    } else {
      this.setState({phoneVerified: false});
    }
  }

  async onSendVerificationClicked() {
    this.setState({loading: true});
    let phone = sessionStorage.getItem('phone');

    if (!phone) {
      //show error message
      this.setState({loading: false});
      return;
    }
    Axios.post('/peoples/start', {
      phone,
    })
      .then((response) => {
        sessionStorage.setItem('phone', phone);
        this.props.history.push('/sign-up-verification');
      })
      .catch((error) => {
        if (error && error.response) {
          if (
            error.response.data &&
            error.response.data.message &&
            error.response.data.message.includes('already exists')
          ) {
            return this.verifyLogin();
          } else if (error.response.data && error.response.data.message) {
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
        } else {
          this.setState({loading: false});
        }
      });
  }

  async verifyLogin() {
    this.setState({loading: true});
    const phone = sessionStorage.getItem('phone');

    if (!phone) {
      //show error message
      this.setState({loading: false});
      return;
    }
    await Axios.post('/peoples/auth', {
      phone,
    })
      .then((response) => {
        sessionStorage.setItem('phone', phone);
        this.props.history.push('/sign-in-verification');
      })
      .catch((error) => {
        //show error message
        this.setState({loading: false});
      });
  }

  // ALLCLEAR-274
  parseError() {
    return this.state.error === true ? <p className="error">{JSON.parse(this.state.message).message}</p> : '';
  };

  render() {
    return (
      <div className="background-responsive">
        <Snackbar
          open={this.state.isSnackbarOpen}
          TransitionComponent={SlideTransition}
          autoHideDuration={4000}
          onClose={this.handleSnackbarClose}
          className={'snackbar__error'}
        >
          <Alert onClose={this.handleSnackbarClose} severity="error">
            You must be logged in to use this feature.
          </Alert>
        </Snackbar>
        <div className="sign-up onboarding-page">
          <RoundHeader>
            <h1 className="heading">COVID-19 Test Alerts</h1>
            <h2 className="sub-heading">Enter your phone number to receive SMS alerts on tests for you.</h2>
          </RoundHeader>
          {this.state.loading === false ? (
            <Container className="onboarding-body">
              <div className="content-container">
                <PhoneNumberInput className="hide-mobile" phoneValidation={this.checkPhoneValidation}></PhoneNumberInput>
                <Link to="/sign-in" className="hide-mobile sign-in">
                  Sign into Existing Account
                </Link>
                {this.parseError()}
              </div>
              <div className="review-container">
                <p>
                  <a href="https://about.allclear.app/terms-of-service/" target="_blank" rel="noopener noreferrer">
                    {' '}
                    Terms & Conditions{' '}
                  </a>{' '}
                  and
                  <a href="https://about.allclear.app/privacy-policy-2/" target="_blank" rel="noopener noreferrer">
                    {' '}
                    Privacy Policy{' '}
                  </a>
                </p>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.termsAndConditions}
                      onChange={this.handleChange}
                      name="termsAndConditions"
                      color="secondary"
                    />
                  }
                  label="I have reviewed and agree to the Terms & Conditions and Privacy Policy."
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.alertable}
                      onChange={this.handleChange}
                      name="alertable"
                      color="secondary"
                    />
                  }
                  label="Receive text alerts when eligible test locations become available."
                />
              </div>
              <OnboardingNavigation
                back={
                  <Link to="/sign-in" className="hide-desktop sign-in">
                    Sign into Existing Account
                  </Link>
                }
                forward={
                  <Button
                    className="next"
                    color="primary"
                    variant="contained"
                    onClick={() => this.onSendVerificationClicked()}
                    disabled={this.state.termsAndConditions && this.state.phoneVerified ? false : true}
                  >
                    Send Verification Code
                  </Button>
                }
                tooltipMessage={`To proceed, please
                    ${!this.state.phoneVerified ? 'enter your phone number' : ''}
                    ${!this.state.termsAndConditions && !this.state.phoneVerified ? 'and' : ''}
                    ${
                  !this.state.termsAndConditions
                  ? 'review and agree to the Terms & Conditions and Privacy Policy'
                  : ''
                }
                  `}
                triggerTooltip={this.state.termsAndConditions && this.state.phoneVerified ? false : true}
              ></OnboardingNavigation>
            </Container>
          ) : (
             <Grid container justify="center">
               <Grid item xs={12} sm={6}>
                 <LinearProgress color="primary" value={50} variant="indeterminate"/>
               </Grid>
             </Grid>
           )}
          {this.state.loading === false ? <ProgressBottom progress="0"></ProgressBottom> : null}
        </div>
      </div>
    );
  }
}
