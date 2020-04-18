import React, { Component } from 'react';
import { bindAll } from 'lodash';

import { AppContext } from '../contexts/App.context';
import Success from '../assets/images/success-check.svg';
import Header from '../components/headers/header';
import OnboardingNavigation from '../components/onboarding-navigation';

import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import * as queryString from 'query-string';

export default class AccountCreated extends Component {
  static contextType = AppContext;
  state = {};

  constructor() {
    super();
    bindAll(this, []);
    this.navItems = [
      { route: 'about.allclear.app', name: 'About Us', absolutePath: true },
      { route: 'about.allclear.app', name: 'Help', absolutePath: true },
    ];
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
      <div className="account-created-page">
        <Header navItems={this.navItems} enableBackBtn={true}></Header>
        <Container className="content onboarding-page" maxWidth="md">
          <div className="onboarding-body">
            <img src={Success} alt="Success" className="success" />
            <h1>Account Created</h1>
          </div>
          <OnboardingNavigation
            back={
              <Button variant="outlined" className="back hide-mobile" onClick={() => this.routeChange('/get-started')}>
                Start Over
              </Button>
            }
            forward={
              <Button variant="contained" className="next" onClick={() => this.routeChange('/maps')}>
                Continue to Profile
              </Button>
            }
          ></OnboardingNavigation>
        </Container>
      </div>
    );
  }
}
