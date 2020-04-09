import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import RoundHeader from '../../components/headers/header-round';
import ProgressBottom from '../../components/progressBottom';

import Form from '@material-ui/core/Container';
import Box from '@material-ui/core/Container';
import { Button, TextField } from '@material-ui/core';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class Background extends React.Component {
  constructor(props) {
    super(props);
    this.state = { exposure: 'live_with_someone', dob: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleDoBChange = this.handleDoBChange.bind(this);
    this.getExposures = this.getExposures.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.getExposures();
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

  handleLocationChange(event) {
    if (event && event.target && event.target.value) {
      this.setState({ location: event.target.value });
      sessionStorage.setItem('location', event.target.value);
    }
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

  async handleSelect(address) {
    this.setState({ address });
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      const sessionId = sessionStorage.getItem('sessid');
      sessionStorage.setItem('lat', latLng.lat);
      sessionStorage.setItem('lng', latLng.lng);
      const response = await Axios.put(
        'https://api-dev.allclear.app/peoples',
        {
          latitude: latLng.lat,
          longitude: latLng.lng,
        },
        {
          headers: {
            'X-AllClear-SessionID': sessionId,
          },
        },
      );
      console.log(response);

      // .then((response) => {
      //   setCookie('sessid', response.data.id);
      //   sessionStorage.setItem('sessid', response.data.id);
      //   history.push('/map');
      // })
      // .catch((error) => {
      //   console.log('error', error);
      //   // TODO Display Error Message
      // });
    } catch (err) {
      console.error('Error', err);
    }
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
                  <div className="autocomplete">
                    <PlacesAutocomplete
                      value={this.state.address}
                      onChange={this.handleTextChange}
                      onSelect={this.handleSelect}
                    >
                      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                          {/* TODO: Do not allow submit w/o required field filled out */}
                          <TextField
                            required
                            variant="outlined"
                            {...getInputProps({
                              placeholder: 'New York, NY or 11211',
                              className: 'input',
                              type: 'search',
                            })}
                          />
                          <div className="autocomplete-dropdown-container">
                            {loading && <div className="suggestion-item">Loading...</div>}
                            {suggestions.map((suggestion) => {
                              const className = suggestion.active
                                ? 'suggestion-item suggestion-item--active'
                                : 'suggestion-item';
                              return (
                                <div
                                  {...getSuggestionItemProps(suggestion, {
                                    className,
                                  })}
                                >
                                  <span>{suggestion.description}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>
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
