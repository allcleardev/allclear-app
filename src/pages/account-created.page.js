import React, { Component } from 'react';
import { bindAll } from 'lodash';
import * as queryString from 'query-string';

import { ReactComponent as Success } from '@assets/images/success-check.svg';
import { AppContext } from '@contexts/app.context';

import Header from '@components/general/headers/header';
import OnboardingNavigation from '@components/general/navs/onboarding-navigation';
import { ONBOARDING_NAV_ITEMS } from '@components/general/headers/header.constants';
import { Container } from '@material-ui/core';

export default class AccountCreated extends Component {
  static contextType = AppContext;
  state = {};

  constructor() {
    super();
    bindAll(this, []);
  }

  componentDidMount() {
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

  render() {
    return (
      <div className="account-created-page onboarding-page">
        <Header navItems={ONBOARDING_NAV_ITEMS} enableBackBtn={true}></Header>
        <Container className="onboarding-body">
          <Container maxWidth="md">
            <div className="onboarding-body">
              <Success className="success"></Success>
              <h1>Account Created</h1>
            </div>
          </Container>
          <OnboardingNavigation forwardRoute={'/map'} forwardText={'Continue to Home'}></OnboardingNavigation>
        </Container>
      </div>
    );
  }
}
