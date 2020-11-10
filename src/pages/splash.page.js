import React, { Component } from 'react';
import { bindAll } from 'lodash';
import { Link } from 'react-router-dom';

import { ReactComponent as MapMarker } from '@assets/images/map-marker-plus.svg';
import { AppContext } from '@contexts/app.context';

import Header from '@general/headers/header';
import OnboardingNavigation from '@general/navs/onboarding-navigation';
import ProgressBottom from '@general/navs/progress-bottom';
import { Container } from '@material-ui/core';

export default class SplashPage extends Component {
  static contextType = AppContext;
  state = {};

  constructor() {
    super();
    bindAll(this, []);
  }

  render() {
    return (
      <div className="splash-page onboarding-page">
        <Header enableBackBtn={true}></Header>
        <Container className="onboarding-body">
          <Container maxWidth="lg">
            <div className="onboarding-body">
              <MapMarker className="marker"></MapMarker>
              <h1>Learn about new test centers first.</h1>
              <h2>
                Create an account to get personalized alerts when new test centers become available according to your
                location and test center preferences.
              </h2>
            </div>
          </Container>
          <OnboardingNavigation forwardRoute={'/location'} forwardText={'Create Account'}>
            <Link to="/sign-in" className="hide-mobile">
              Already have an account? <strong>Log In</strong>
            </Link>
          </OnboardingNavigation>
        </Container>
        <ProgressBottom progress="0%" 
          barColor="#fff" 
          barStyle="progress-bottom" 
          barWidth="25%"
        >
        </ProgressBottom>
      </div>
    );
  }
}
