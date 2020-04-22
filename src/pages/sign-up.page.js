import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as queryString from 'query-string';

import RoundHeader from '@general/headers/header-round';
import ProgressBottom from '@general/navs/progress-bottom';
import PhoneNumberInput from '@general/inputs/phone-number-input';

import OnboardingNavigation from '@general/navs/onboarding-navigation';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Button, Grid, Container } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { AppContext } from '@contexts/app.context';
import PeopleService from '@services/people.service';
import { bindAll } from 'lodash';
import GAService from '@services/ga.service';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default class SignUpPage extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.gaService = GAService.getInstance();
    this.gaService.setScreenName('sign-up');

    this.state = {
      termsAndConditions: false,
      ageVerification: false,
      alertable: false,
      phoneVerified: false,
      loading: false,
      error: false,
      message: undefined,
      accountExists: true,
      isSnackbarOpen: false,
    };

    this.peopleService = PeopleService.getInstance();

    bindAll(this, [
      'validateState',
      'handleChange',
      'handleSnackbarClose',
      'checkPhoneValidation',
      'onSendVerificationClicked',
    ]);
  }

  async componentDidMount() {
    this.validateState();
    const queryParams = queryString.parse(this.props.location.search);
    if (queryParams.logout) {
      this.setState({
        isSnackbarOpen: true,
      });
    }
  }

  validateState() {
    const { appState } = this.context;
    const healthWorkerStatus = appState.profile.options.healthWorkerStatus;
    const latitude = appState.person.latitude;
    const longitude = appState.person.longitude;

    if (!healthWorkerStatus || !latitude || !longitude) {
      return this.routeChange('/get-started');
    }
  }

  routeChange(route) {
    this.props.history.push(route);
  }

  handleChange(event) {
    const { appState, setAppState } = this.context;

    this.setState({
      [event.target.name]: event.target.checked,
    });

    let person = {
      ...appState.person,
    };

    person[event.target.name] = event.target.checked;

    setAppState({
      ...appState,
      person,
    });
  }

  handleSnackbarClose(event) {
    this.setState({
      isSnackbarOpen: false,
    });
  }

  checkPhoneValidation(value) {
    if (value) {
      this.setState({
        phoneVerified: true,
      });
    } else {
      this.setState({
        phoneVerified: false,
      });
    }
  }

  buildPayload() {
    const { appState } = this.context;
    const phone = appState.person.phone;

    const latitude = appState.person.latitude;
    const longitude = appState.person.longitude;
    const locationName = appState.person.locationName;
    const dob = appState.person.dob;
    const alertable = appState.person.alertable;
    const healthWorkerStatus = appState.profile.options.healthWorkerStatus;
    let exposures = appState.profile.options.exposures;
    let conditions = appState.profile.options.conditions;
    let symptoms = appState.profile.options.symptoms;

    // Format Conditions
    const conditionsArray = [];
    if (conditions) {
      if (typeof conditions === 'string') {
        conditions = JSON.parse(conditions);
      }
      conditions.forEach((condition) => {
        if (condition.isActive) {
          conditionsArray.push({
            id: condition.id,
            name: condition.name,
          });
        }
      });
    }

    // Format Exposures
    const exposuresArray = [];
    if (exposures) {
      if (typeof exposures === 'string') {
        exposures = JSON.parse(exposures);
      }
      exposures.forEach((exposure) => {
        if (exposure.isActive) {
          exposuresArray.push({
            id: exposure.id,
            name: exposure.name,
          });
        }
      });
    }

    // Format Symptoms
    const symptomsArray = [];
    if (symptoms) {
      if (typeof symptoms === 'string') {
        symptoms = JSON.parse(symptoms);
      }
      symptoms.forEach((symptom) => {
        if (symptom.isActive) {
          symptomsArray.push({
            id: symptom.id,
            name: symptom.name,
          });
        }
      });
    }

    const payload = {
      dob,
      alertable,
      locationName,
      phone,
      name: Date.now(),
      latitude,
      longitude,
      conditions: conditionsArray,
      exposures: exposuresArray,
      symptoms: symptomsArray,
      healthWorkerStatusId: healthWorkerStatus ? healthWorkerStatus.id : null,
    };

    return payload;
  }

  async onSendVerificationClicked() {
    this.setState({
      loading: true,
    });

    if (!this.state.ageVerification) {
      return this.setState({
        error: true,
        message: 'You are ineligible for registering for an account at this time.',
        loading: false,
      });
    }

    const { appState } = this.context;
    let phone = appState.person.phone;
    const payload = this.buildPayload();

    const response = await this.peopleService.authStart(payload);

    if (!response.err) {
      sessionStorage.setItem('phone', phone);
      this.props.history.push('/sign-up-verification');
    } else {
      const error = response;

      if (error && error.response) {
        if (
          error.response.data &&
          error.response.data.message &&
          error.response.data.message.includes('already exists')
        ) {
          this.state.accountExists = true;
          this.setState({
            error: true,
            message: error.response.data.message,
            loading: false,
          });
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
      }
    }
  }

  // ALLCLEAR-274
  parseError() {
    return this.state.error === true ? <p className="error">{this.state.message}</p> : '';
  }

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
          <RoundHeader navigate={'/symptoms'}>
            <h1 className="heading">Phone Number Registration</h1>
            <h2 className="sub-heading">Enter your phone number to register your account.</h2>
          </RoundHeader>
          {this.state.loading === false ? (
            <Container className="onboarding-body">
              <div className="content-container">
                <PhoneNumberInput
                  className="hide-mobile"
                  phoneValidation={this.checkPhoneValidation}
                ></PhoneNumberInput>
                <Link to="/sign-in" className="sign-in">
                  Sign into Existing Account
                </Link>
                {this.parseError()}
              </div>
              <div className="review-container">
                <p>
                  Please review and agree to the
                  <a href="https://about.allclear.app/terms-of-service/" target="_blank" rel="noopener noreferrer">
                    {''} Terms & Conditions {''}
                  </a>
                  and
                  <a href="https://about.allclear.app/privacy-policy-2/" target="_blank" rel="noopener noreferrer">
                    {''} Privacy Policy {''}
                  </a>
                  before continuing.
                </p>

                <div className="checkbox-container">
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
                        checked={this.state.ageVerification}
                        onChange={this.handleChange}
                        name="ageVerification"
                        color="secondary"
                      />
                    }
                    label="I am at least 13 years of age or older."
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
                    label="I agree to receive text message alerts when eligible tests and locations become available.
                    Text messages may be sent using an automatic telephone dialing system and standard message and data rates apply."
                  />
                </div>
              </div>
              <OnboardingNavigation
                back={
                  <Button
                    variant="contained"
                    className="back hide-mobile"
                    onClick={() => this.routeChange('/symptoms')}
                  >
                    Back
                  </Button>
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
                <LinearProgress color="primary" value={60} variant="indeterminate" />
              </Grid>
            </Grid>
          )}
          {this.state.loading === false ? <ProgressBottom progress="60%"></ProgressBottom> : null}
        </div>
      </div>
    );
  }
}
