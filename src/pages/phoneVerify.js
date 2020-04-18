import React, { Component } from 'react';
import Axios from 'axios';
import * as queryString from 'query-string';

import RoundHeader from '../components/headers/header-round';
import ProgressBottom from '../components/progressBottom';
import PhoneNumber from '../components/phoneNumber';
import OnboardingNavigation from '../components/onboarding-navigation';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Button, Grid, Container } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default class PhoneVerify extends Component {
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
        isSnackbarOpen: true,
      });
    }
  }

  routeChange(route) {
    this.props.history.push(route);
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
      isSnackbarOpen: false,
    });
  }

  checkPhoneValidation(value) {
    if (value) {
      this.setState({ phoneVerified: true });
    } else {
      this.setState({ phoneVerified: false });
    }
  }

  buildPayload() {
    // const { appState } = this.context;
    // todo: set latlng to appprovider here - get
    // const {latitude, longitude} = appState.person;
    const dob = sessionStorage.getItem('dob');
    const phone = sessionStorage.getItem('phone');
    // todo: none of this should be needed anymore
    const latitude = sessionStorage.getItem('lat');
    const longitude = sessionStorage.getItem('lng');
    const locationName = sessionStorage.getItem('locationName');
    const healthWorkerStatus = sessionStorage.getItem('healthWorkerStatus');
    const alertable = sessionStorage.getItem('alertable');

    // Format Conditions
    let conditions = sessionStorage.getItem('conditions');
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
    let exposures = sessionStorage.getItem('exposures');
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
    let symptoms = sessionStorage.getItem('symptoms');
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
      healthWorkerStatusId: JSON.parse(healthWorkerStatus).id,
    };

    return payload;
  }

  async submitResults() {
    this.setState({ loading: true });
    const { appState, setAppState } = this.context;

    const payload = this.buildPayload();
    const resp = await this.peopleService.register(payload);
    setAppState({
      ...appState,
      sessionId: resp.data.id,
      person: {
        ...appState.person,
        ...resp.data.person,
      },
    });

    this.props.history.push('/map');
  }

  async onSendVerificationClicked() {
    this.setState({ loading: true });
    let phone = sessionStorage.getItem('phone');

    const payload = this.buildPayload();

    console.log('payload', payload);

    if (!phone) {
      //show error message
      this.setState({ loading: false });
      return;
    }

    Axios.put('/peoples/start', payload)
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
          this.setState({ loading: false });
        }
      });
  }

  async verifyLogin() {
    this.setState({ loading: true });
    const phone = sessionStorage.getItem('phone');

    if (!phone) {
      //show error message
      this.setState({ loading: false });
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
        this.setState({ loading: false });
      });
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
            You must be logged in to use the map feature.
          </Alert>
        </Snackbar>
        <div className="sign-up onboarding-page">
          <RoundHeader>
            <h1 className="heading">Phone Number Registration</h1>
            <h2 className="sub-heading">Enter your phone number to register your account.</h2>
          </RoundHeader>
          {this.state.loading === false ? (
            <Container className="onboarding-body">
              <div className="content-container">
                <PhoneNumber className="hide-mobile" phoneValidation={this.checkPhoneValidation}></PhoneNumber>
                {this.state.error === true ? <p className="error">{this.state.message}</p> : ''}
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
