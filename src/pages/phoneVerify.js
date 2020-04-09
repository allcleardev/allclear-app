import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import RoundHeader from '../components/headers/header-round';
import ProgressBottom from '../components/progressBottom';
import PhoneNumber from '../components/phoneNumber';
import OnboardingNavigation from '../components/onboarding-navigation';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Button, Grid, Container } from '@material-ui/core';

export default class PhoneVerify extends Component {
  constructor() {
    super();
    this.state = {
      termsAndConditions: false,
      alertable: false,
      phoneVerified: false,
      loading: false,
      error: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkPhoneValidation = this.checkPhoneValidation.bind(this);
    this.onSendVerificationClicked = this.onSendVerificationClicked.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
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

  checkPhoneValidation(value) {
    if (value) {
      this.setState({ phoneVerified: true });
    } else {
      this.setState({ phoneVerified: false });
    }
  }

  async onSendVerificationClicked() {
    this.setState({ loading: true });
    let phone = sessionStorage.getItem('phone');

    if (!phone) {
      //show error message
      this.setState({ loading: false });
      return;
    }
    Axios.post('https://api-dev.allclear.app/peoples/start', {
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
    await Axios.post('https://api-dev.allclear.app/peoples/auth', {
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
        <div className="sign-up onboarding-page">
          <RoundHeader>
            <h1 className="heading">Phone Number</h1>
            <h2 className="sub-heading">Enter your phone number to get started.</h2>
          </RoundHeader>
          {this.state.loading === false ? (
            <Container className="onboarding-body">
              <div className="content-container">
                <PhoneNumber className="hide-mobile" phoneValidation={this.checkPhoneValidation}></PhoneNumber>
                <Link to="/sign-in" className="hide-mobile sign-in">
                  Sign into Existing Account
                </Link>
                {this.state.error === true ? <p className="error">{this.state.message}</p> : ''}
              </div>
              <div className="review-container">
                <p>
                  <a href="https://staging.about.allclear.app/"> Terms & Conditions </a> and
                  <a href="https://staging.about.allclear.app/"> Privacy Policy </a>
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
                <LinearProgress color="primary" value="50" variant="indeterminate" />
              </Grid>
            </Grid>
          )}
          {this.state.loading === false ? <ProgressBottom progress="0"></ProgressBottom> : null}
        </div>
      </div>
    );
  }
}
