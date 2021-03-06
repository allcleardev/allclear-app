import React, { Component } from 'react';
import { bindAll } from 'lodash';

import GAService from '@services/ga.service';
import { AppContext } from '@contexts/app.context';

import Header from '@general/headers/header';
import GoogleMapsAutocomplete from '@general/inputs/google-maps-autocomplete';
import OnboardingNavigation from '@general/navs/onboarding-navigation';
import ProgressBottom from '@general/navs/progress-bottom';
import { Container } from '@material-ui/core';

class BackgroundPage extends Component {
  static contextType = AppContext;
  state = {
    dob: '',
    location: false,
    useCurrentLocation: false,
  };

  constructor() {
    super();
    bindAll(this, ['handleLocationChange', 'handleSwitchChange', '_onLocationAccepted', '_onLocationDeclined']);
    this.gaService = GAService.getInstance();
    this.gaService.setScreenName('background');
    this.navItems = [
      { route: 'home.allclear.app', name: 'Home', absolutePath: true },
      { route: 'home.allclear.app/#comitment', name: 'Help', absolutePath: true },
    ];
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
        },
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
    } else {
      this.setState({ location: false });
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
      <div className="background onboarding-page">
        <Header enableBackBtn={true}>
          <h1>Location</h1>
          <h2>Please provide your location information to help us recommend nearby test locations for you.</h2>
        </Header>
        <Container className="onboarding-body">
          <Container maxWidth="md" className="section">
            <article className="article">
              <label htmlFor="location" className="label">
                Select one <span>(Required)</span>
              </label>
              <GoogleMapsAutocomplete
                useCurrentLocation={this.state.useCurrentLocation}
                locationSelected={this.handleLocationChange}
                noOptionsText={'Please Enter a Location'}
              ></GoogleMapsAutocomplete>

              <div className="switchContainer" onClick={this.handleSwitchChange}>
                <div className="switch">
                  <input type="checkbox" onChange={this.handleSwitchChange} checked={this.state.useCurrentLocation} />
                  <span className="slider round"></span>
                </div>

                <p className="currentLocation">Use Current Location</p>
              </div>
            </article>
          </Container>
          <OnboardingNavigation
            forwardRoute={'/health-worker'}
            forwardDisabled={!this.state.location}
            triggerTooltip={!this.state.location}
            tooltipMessage={'Please provide your location'}
          ></OnboardingNavigation>
        </Container>
        <ProgressBottom
          progress="0%"
          barColor="#fff"
          barStyle="progress-bottom"
          barWidth="25%"
        ></ProgressBottom>
      </div>
    );
  }
}

export default BackgroundPage;
