import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import Header from '../../components/header-round';
import ProgressBottom from '../../components/progressBottom';

import Form from '@material-ui/core/Container';
import Box from '@material-ui/core/Container';
import { Button, Chip, TextField } from '@material-ui/core';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

class Background extends React.Component {
  constructor(props) {
    super(props);
    this.state = { exposure: 'live_with_someone', dob: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleDoBChange = this.handleDoBChange.bind(this);
    this.getExposures = this.getExposures.bind(this);
  }

  componentDidMount() {
    this.getExposures();
  };

  getExposures() {
    this.setState({ loading: true });

    Axios.get(
      'https://api-dev.allclear.app/types/exposures', {}
    ).then((response) => {
      this.setState({ exposures: response.data });
      this.setState({ loading: false });
    }).catch((error) => {
      console.log(error);
      this.setState({ loading: false });
    });
  };

  handleLocationChange(event) {
    if (event && event.target && event.target.value) {
      this.setState({ location: event.target.value });
      sessionStorage.setItem('location', event.target.value);
    }
  };

  handleDoBChange(event) {
    if (event && event.target && event.target.value) {
      this.setState({ dob: event.target.value });

      let dob = event.target.value + 'T00:00:00Z';
      sessionStorage.setItem('dob', dob);
    }
  };

  handleChange(event) {
    let { exposures } = this.state;
    exposures.filter((exposure) => {
      if (exposure.name === event.name) {
        exposure.isActive = !exposure.isActive;
      }
    });
    this.setState({ exposures });
    sessionStorage.setItem('exposures', JSON.stringify(exposures));
  };

  render() {
    return (
      <div className="background-responsive">
        <div className="background onboarding-page">
          <Header>
            <h1 className="heading">Background</h1>
            <h2 className="sub-heading">Provide information to help us recommend the test sites for you.</h2>
          </Header>
          <Form noValidate autoComplete="off" className="onboarding-body">
            <Box maxWidth="md">
              <section className="section">
                <article className="article">
                  <label htmlFor="location" className="label">
                    <strong>Location</strong> (Required) <br />
                    <span className="description">We can give localized test center recommendations with your location.</span>
                  </label>
                  <TextField
                    id="location"
                    className="input"
                    type="text"
                    placeholder="Location"
                    variant="outlined"
                    onChange={this.handleLocationChange}
                  />
                </article>
                <article className="article">
                  <label htmlFor="birthdate" className="label">
                    <strong>Date of Birth</strong> (Required) <br />
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
              <section>
                <label className="label">
                  <strong>Exposure to COVID-19</strong> <br />
                  <span className="description">
                    Some test centers require knowledge of your exposure to people who have tested positive for COVID-19.
                  </span>
                </label>
                <div className="chips-group">
                  {/* TODO: Convert group to "Chip array" https://material-ui.com/components/chips/#chip-array */}
                  {this.state.exposures && this.state.exposures.map((res) => {
                    return (
                      <Chip
                        key={res.id}
                        className={'chip' + (res.isActive ? ' Active' : '')}
                        label={res.name}
                        variant="outlined"
                        onClick={() => this.handleChange(res)}
                      >
                      </Chip>
                    );
                  })}
                </div>
              </section>
            </Box>
            <div className="button-container">
              <Link to="/phone-verify" className="hide-mobile">
                <Button
                  variant="contained"
                  className="back"
                >Back
                </Button>
              </Link>
              <Link to="/conditions">
                <Button
                  variant="contained"
                  color="primary"
                  className="next"
                >Next
                </Button>
              </Link>
            </div>
          </Form>
          <ProgressBottom progress="14%"></ProgressBottom>
        </div>
      </div>
    );
  }
}

export default Background;
