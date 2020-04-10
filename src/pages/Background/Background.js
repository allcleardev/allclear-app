import React, {Component} from 'react';
import {bindAll} from 'lodash';

import RoundHeader from '../../components/headers/header-round';
import ProgressBottom from '../../components/progressBottom';
import GoogleMapsAutocomplete from '../../components/inputs/google-maps-autocomplete'; // TODO: v2
import OnboardingNavigation from '../../components/onboarding-navigation';

import Form from '@material-ui/core/Container';
import Box from '@material-ui/core/Container';
import {Button, TextField} from '@material-ui/core';

class Background extends Component {
  constructor() {
    super();
    this.state = {dob: '', location: false};

    bindAll(this, ['routeChange', 'handleDoBChange', 'handleLocationChange']);
  }

  routeChange(route) {
    this.props.history.push(route);
  }

  handleDoBChange(event) {
    if (event && event.target && event.target.value) {
      this.setState({dob: event.target.value});

      let dob = event.target.value + 'T00:00:00Z';
      sessionStorage.setItem('dob', dob);
    }
  }

  async handleLocationChange(value) {
    this.setState({location: value});
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
                    <strong>Location</strong> (Required) <br/>
                    <span className="description">
                      We can give localized test center recommendations with your location.
                    </span>
                  </label>
                  <GoogleMapsAutocomplete locationSelected={this.handleLocationChange}></GoogleMapsAutocomplete>
                </article>
                <article className="article">
                  <label htmlFor="birthdate" className="label">
                    <strong>Date of Birth</strong> <br/>
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

export default Background;
