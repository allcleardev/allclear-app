import React, { Component } from 'react';
import { bindAll } from 'lodash';
import { Link } from 'react-router-dom';

import PeopleService from '@services/people.service';
import GAService from '@services/ga.service';

import Header from '@general/headers/header';
import OnboardingNavigation from '@general/navs/onboarding-navigation';
import { AppContext } from '@contexts/app.context';

import PhoneNumberInput from '@components/general/inputs/phone-number-input';
import { Button, Container, CircularProgress, withStyles } from '@material-ui/core';

const DefaultButton = withStyles((theme) => ({
  root: {
    minWidth: '100%',
    padding: '12px 16px',
    fontWeight: '600',
    color: '#fff',
    marginBottom: 40,
    borderRadius: 10,
    fontSize: 17,
    [theme.breakpoints.up('md')]: {
      minWidth: 248,
    },
  },
}))(Button);

export default class SignInPage extends Component {
  static contextType = AppContext;
  state = {
    phone: undefined,
    loading: false,
    error: false,
    message: undefined,
    isSnackbarOpen: false,
  };

  constructor(props) {
    super(props);
    bindAll(this, ['verifyLogin']);
    this.peopleService = PeopleService.getInstance();
    this.gaService = GAService.getInstance();
    this.gaService.setScreenName('sign-in');
  }

  async verifyLogin() {
    const { appState } = this.context;
    const phone = appState.person.phone;

    this.setState({ loading: true });

    if (!phone) {
      return this.setState({
        error: true,
        message: 'Please enter a valid phone number',
        loading: false,
      });
    }

    const response = await this.peopleService.login({ phone });

    if (!response.err) {
      this.props.history.push('/sign-in-verification');
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

  render() {
    return (
      <div className="login onboarding-page">
        <Header enableBackBtn={true}>
          <h1>Phone Number</h1>
          <h2>Enter your phone number to access your account.</h2>
        </Header>

        {this.state.loading === false ? (
          <Container className="onboarding-body">
            <div className="content-container">
              <PhoneNumberInput></PhoneNumberInput>
              <Link to="/location" className="hide-mobile">
                Create Account
              </Link>
              {this.state.error === true ? <p className="error">{this.state.message}</p> : ''}
            </div>

            <div style={{ width: '100%' }}>
              <OnboardingNavigation
                forwardOnClick={this.verifyLogin}
                forwardText={'Send Verification Code'}
              ></OnboardingNavigation>
              <DefaultButton className="hide-desktop" onClick={() => this.props.history.push('/location')}>
                Create Account
              </DefaultButton>
            </div>
          </Container>
        ) : (
          <Container className="onboarding-body">
            <CircularProgress color="primary" size={108} />
          </Container>
        )}
      </div>
    );
  }
}
