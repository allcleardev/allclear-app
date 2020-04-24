import React, { Component } from 'react';
import { bindAll } from 'lodash';

import RoundHeader from '../components/general/headers/header-round';
import ProgressBottom from '@general/navs/progress-bottom';
import GoogleMapsAutocomplete from '../components/general/inputs/google-maps-autocomplete';
import OnboardingNavigation from '../components/general/navs/onboarding-navigation';

import Form from '@material-ui/core/Container';
import Box from '@material-ui/core/Container';
import { Button } from '@material-ui/core';
import { AppContext } from '../contexts/app.context';
import GAService from '@services/ga.service';

class BackgroundPage extends Component {
  static contextType = AppContext;
  state = {
    dob: '',
    location: false,
    useCurrentLocation: false,
  };

  constructor() {
    super();

    this.gaService = GAService.getInstance();
    this.gaService.setScreenName('background');

    bindAll(this, [
      'routeChange',
      'handleLocationChange',
      'handleSwitchChange',
      '_onLocationAccepted',
      '_onLocationDeclined',
    ]);
  }

  routeChange(route) {
    this.props.history.push(route);
  }

  async handleLocationChange(bool, value) {
    this.setState({ location: bool });
    const { appState, setAppState } = this.context;

    if (value && value.description) {
      const { latitude, longitude } = value;
      const locationName = value.description;
      setAppState({
        ...appState,
        person: {
          ...appState.person,
          locationName,
          latitude,
          longitude,
        }
      });
    }
  }

  async handleSwitchChange() {
    let switchValue = this.state.useCurrentLocation;

    switchValue = !switchValue;

    this.setState({
      useCurrentLocation: switchValue,
    });

    if (switchValue) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this._onLocationAccepted, this._onLocationDeclined);
      }
    }
  }

  async _onLocationAccepted(pos) {
    this.gaService.sendEvent('current_location_enabled', {});
    if (pos && pos.coords && pos.coords.latitude) {
      this.setState({ location: true });
      const { appState, setAppState } = this.context;
      const { latitude, longitude } = pos.coords;
      setAppState({
        ...appState,
        person: {
          ...appState.person,
          latitude,
          longitude,
        },
      });
    } else {
      this.setState({ location: false });
    }
  }

  _onLocationDeclined() {
    console.warn('User declined to use browser location');

    this.setState({
      useCurrentLocation: false,
    });
  }

  render() {
    return (
      <div className="background-responsive">
        <div className="background onboarding-page">
          <RoundHeader navigate={'/sign-up'}>
            <h1 className="heading">Your Location</h1>
            <h2 className="sub-heading">
              Please provide your location information to help us recommend nearby test locations for you.
            </h2>
          </RoundHeader>
          <Form noValidate autoComplete="off" className="onboarding-body">
            <Box maxWidth="md">
              <section className="section">
                <article className="article">
                  <label htmlFor="location" className="label">
                    <strong>Select one</strong><span className="text-small"> (Required)</span> <br />
                    <span className="description">
                      We can give localized test center recommendations with your location.
                    </span>
                  </label>
                  <GoogleMapsAutocomplete
                    useCurrentLocation={this.state.useCurrentLocation}
                    locationSelected={this.handleLocationChange}
                  ></GoogleMapsAutocomplete>

                  <div className="switchContainer" onClick={this.handleSwitchChange}>
                    <div className="switch">
                      <input
                        type="checkbox"
                        onChange={this.handleSwitchChange}
                        checked={this.state.useCurrentLocation}
                      />
                      <span className="slider round"></span>
                    </div>

                    <p className="currentLocation">Use Current Location</p>
                  </div>
                </article>
              </section>
            </Box>
            <OnboardingNavigation
              back={
                <Button
                  variant="contained"
                  className="back hide-mobile"
                  onClick={() => this.routeChange('/get-started')}
                >
                  Back
                </Button>
              }
              forward={
                <Button
                  variant="contained"
                  color="primary"
                  className="next"
                  onClick={() => this.routeChange('/health-worker')}
                  disabled={!this.state.location}
                >
                  Next
                </Button>
              }
              tooltipMessage={'Please provide your location'}
              triggerTooltip={!this.state.location}
            ></OnboardingNavigation>
          </Form>
          <ProgressBottom progress="0%"></ProgressBottom>
        </div>
      </div>
    );
  }
}

export default BackgroundPage;
