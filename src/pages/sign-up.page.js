import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as queryString from 'query-string';

import RoundHeader from '@general/headers/header-round';
import ProgressBottom from '@general/navs/progress-bottom';
import PhoneNumberInput from '@general/inputs/phone-number-input';

import OnboardingNavigation from '@general/navs/onboarding-navigation';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LinearProgress from '@material-ui/core/LinearProgress';
import {Button, Grid, Container} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import PeopleService from '@services/people.service';
import {bindAll} from 'lodash';

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

    this.peopleService = PeopleService.getInstance();

    bindAll(this, [
      'handleChange',
      'handleSnackbarClose',
      'checkPhoneValidation',
      'onSendVerificationClicked',
      'verifyLogin',
    ]);

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
      this.setState({phoneVerified: true});
    } else {
      this.setState({phoneVerified: false});
    }
  }

  buildPayload() {

    // todo: do this the right way (appcontext, remove all sessionstorage usage)
    // const { appState } = this.context;
    // const {latitude, longitude} = appState.person;

    const dob = sessionStorage.getItem('dob');
    const phone = sessionStorage.getItem('phone');
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
        ...resp.data.person
      }
    });

    this.props.history.push('/map');
  }

  async onSendVerificationClicked() {
    this.setState({loading: true});
    let phone = sessionStorage.getItem('phone');

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
      }
    }
  }

  async verifyLogin() {
    this.setState({loading: true});
    const phone = sessionStorage.getItem('phone');

    const response = await this.peopleService.verifyAuthRequest({phone});

    if (!response.err) {
      sessionStorage.setItem('phone', phone);
      this.props.history.push('/sign-up-verification');
    } else {
      //TODO Error Message
    }
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
            <h1 className="heading">Phone Number Registration</h1>
            <h2 className="sub-heading">Enter your phone number to register your account.</h2>
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
                 <LinearProgress color="primary" value={75} variant="indeterminate"/>
               </Grid>
             </Grid>
           )}
          {this.state.loading === false ? <ProgressBottom progress="75%"></ProgressBottom> : null}
        </div>
      </div>
    );
  }
}
