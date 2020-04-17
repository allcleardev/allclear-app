import React, { Component } from 'react';
import { bindAll } from 'lodash';

import RoundHeader from '../components/general/headers/header-round';
import ProgressBottom from '@general/navs/progress-bottom';
import GoogleMapsAutocomplete from '../components/general/inputs/google-maps-autocomplete';
import OnboardingNavigation from '../components/general/navs/onboarding-navigation';

import Form from '@material-ui/core/Container';
import Box from '@material-ui/core/Container';
import { Button, TextField } from '@material-ui/core';
import {AppContext} from '../contexts/app.context';

class BackgroundPage extends Component {
  static contextType = AppContext;
  state = {
    dob: '',
    location: false,
    useCurrentLocation: false
  };

  constructor() {
    super();

    bindAll(this, [
      'routeChange',
      'handleDoBChange',
      'handleLocationChange',
      'handleSwitchChange',
      '_onLocationAccepted',
      '_onLocationDeclined',
    ]);
  }

  routeChange(route) {
    this.props.history.push(route);
  }

  handleDoBChange(event) {
    if (event && event.target && event.target.value) {
      this.setState({ dob: event.target.value });

      let dob = event.target.value + 'T00:00:00Z';
      sessionStorage.setItem('dob', dob);
    }
  }

  async handleLocationChange(bool, value) {
    this.setState({ location: bool });
    const { appState, setAppState } = this.context;

    if (value && value.description) {
      const {latitude, longitude} = value;
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
    }
  }

  async _onLocationAccepted(pos) {
    if (pos && pos.coords && pos.coords.latitude) {
      this.setState({ location: true });
      const {appState, setAppState} = this.context;
      const {latitude, longitude} = pos.coords;
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
            <h1 className="heading">Background</h1>
            <h2 className="sub-heading">Provide information to help us recommend the test sites for you.</h2>
          </RoundHeader>
          <Form noValidate autoComplete="off" className="onboarding-body">
            <Box maxWidth="md">
              <section className="section">
                <article className="article">
                  <label htmlFor="location" className="label">
                    <strong>Location</strong> (Required) <br />
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
                <article className="article">
                  <label htmlFor="birthdate" className="label">
                    <strong>Date of Birth</strong> <br />
                    <span className="description">Some test centers have minimum age requirements.</span>
                  </label>
                  {/* TODO: swap w/ Material UI Date Picker https://material-ui.com/components/pickers/ */}
                  <TextField
                    id="birthdate"
                    className="input"
                    type="date"
                    placeholder="MM/DD/YYYY"
                    variant="outlined"
                    onChange={this.handleDoBChange}
                  />
                </article>
              </section>
            </Box>
            <OnboardingNavigation
              back={
                <Button variant="contained" className="back hide-mobile" onClick={() => this.routeChange('/sign-up')}>
                  Restart
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
          <ProgressBottom progress="25%"></ProgressBottom>
        </div>
      </div>
    );
  }
}

export default BackgroundPage;
