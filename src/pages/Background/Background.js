import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import RoundHeader from '../../components/headers/header-round';
import ProgressBottom from '../../components/progressBottom';
import GoogleMapsAutocomplete from '../../components/inputs/google-maps-autocomplete'; // TODO: v2

import Form from '@material-ui/core/Container';
import Box from '@material-ui/core/Container';
import { Button, TextField } from '@material-ui/core';

class Background extends React.Component {
  constructor(props) {
    super(props);
    this.state = { exposure: 'live_with_someone', dob: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleDoBChange = this.handleDoBChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  getExposures() {
    this.setState({ loading: true });

    Axios.get('https://api-dev.allclear.app/types/exposures', {})
      .then((response) => {
        this.setState({ exposures: response.data });
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  handleDoBChange(event) {
    if (event && event.target && event.target.value) {
      this.setState({ dob: event.target.value });

      let dob = event.target.value + 'T00:00:00Z';
      sessionStorage.setItem('dob', dob);
    }
  }

  handleChange(event) {
    let { exposures } = this.state;
    exposures.map((exposure) => {
      if (exposure.name === event.name) {
        exposure.isActive = !exposure.isActive;
      }
      return true;
    });
    this.setState({ exposures });
    sessionStorage.setItem('exposures', JSON.stringify(exposures));
  }

  handleTextChange(address) {
    this.setState({ address });
  }

  render() {
    return (
      // TODO: Update input fields to use Material UI dropdown and date-picker
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
                  <GoogleMapsAutocomplete></GoogleMapsAutocomplete>
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
            <div className="button-container">
              <Link to="/sign-up" className="hide-mobile">
                <Button variant="contained" className="back">
                  Restart
                </Button>
              </Link>
              <Link to="/health-worker">
                <Button variant="contained" color="primary" className="next">
                  Next
                </Button>
              </Link>
            </div>
          </Form>
          <ProgressBottom progress="25%"></ProgressBottom>
        </div>
      </div>
    );
  }
}

export default Background;
