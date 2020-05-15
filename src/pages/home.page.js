import React, { Component } from 'react';
import clsx from 'clsx';
import { bindAll, get } from 'lodash';

import PeopleService from '@services/people.service';
import FacilityService from '@services/facility.service.js';

import UserAvatar from '@assets/images/defaultProfile.svg';
import PersonShareIcon from '@assets/images/person-share-icon.svg';
import { ReactComponent as PinIcon } from '@assets/images/pin-icon.svg';
import { ReactComponent as SettingsIcon } from '@assets/images/settings-icon.svg';
import { ReactComponent as MapPin } from '@assets/images/map-pin.svg';
import { ReactComponent as HealthIcon } from '@assets/images/health-icon.svg';

import Header from '@components/general/headers/header';
import SnackbarMessage from '@general/alerts/snackbar-message';
import { triggerShareAction } from '@util/social.helpers';
import { AppContext } from '@contexts/app.context';

import Container from '@material-ui/core/Container';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'; // TODO: Ask Ashley for uncorrupted svg version from her mock
import { Button, IconButton, Tooltip, withStyles } from '@material-ui/core';

export default class HomePage extends Component {
  static contextType = AppContext;
  state = {
    locationName: '',
    testLocations: [],
    testLocationsExpanded: false,
    symptomatic: false,
    prioritized: false,
    snackbarOpen: false,
    snackbarMessage: '',
    snackbarSeverity: '',
  };

  constructor(props) {
    super(props);
    bindAll(this, [
      'componentDidMount',
      'fetchTestLocations',
      'routeChange',
      'onLocationSelected',
      'onViewMoreClicked',
      'onShareClicked',
      'handleSnackbarClose',
      'updateUserProfile',
    ]);
    this.peopleService = PeopleService.getInstance();
    this.facilityService = FacilityService.getInstance();
  }

  async componentDidMount() {
    const { appState } = this.context;
    const symptoms = get(appState, 'person.symptoms');
    const latitude = get(appState, 'person.latitude');
    const longitude = get(appState, 'person.longitude');
    const healthWorkerStatusId = get(appState, 'person.healthWorkerStatusId');

    // retrieving locations based on the user profile (instead of grabbing map locations which change when user explores places)
    this.locations = await this.fetchTestLocations(latitude, longitude);
    const testLocations =
      this.locations && this.locations.length
        ? this.locations.sort((a, b) => b.favorite - a.favorite || a.meters - b.meters)
        : [];

    this.setState({
      locationName: get(appState, 'person.locationName') || 'Using Current Location',
      testLocations: testLocations && testLocations.length ? testLocations.slice(0, 5) : [],
      symptomatic: symptoms && symptoms[0].id !== 'no' ? true : false,
      prioritized:
        healthWorkerStatusId === 'h' || (symptoms && symptoms.some((symptom) => symptom.id === 'fv')) ? true : false,
    });
  }

  async fetchTestLocations(latitude, longitude) {
    return this.facilityService
      .search({
        from: {
          latitude,
          longitude,
          miles: 100,
        },
      })
      .then((response) => response.data.records)
      .catch((error) => console.log(error));
  }

  routeChange(route) {
    this.props.history.push(route);
  }

  onLocationSelected(pinnedLocation) {
    const testLocations = [...this.state.testLocations];
    pinnedLocation.favorite = !pinnedLocation.favorite;

    // update selected location with new pinned location state
    testLocations.map((location) => {
      if (location.id === pinnedLocation.id) {
        return (location = pinnedLocation);
      }
    });
    // update local state
    this.setState({ testLocations }, () => {
      this.updateUserProfile(pinnedLocation);
    });
  }

  onViewMoreClicked() {
    const fullLocationList = [...this.locations];
    const expanded = !this.state.testLocationsExpanded;
    this.setState({
      testLocations: expanded ? fullLocationList : fullLocationList.slice(0, 5),
      testLocationsExpanded: expanded,
    });
  }

  onShareClicked() {
    triggerShareAction().then((response) => {
      let snackbarMessage;
      let snackbarSeverity;

      if (response.success) {
        snackbarMessage = response.message;
        snackbarSeverity = 'success';
      } else if (response.error) {
        snackbarMessage = response.error;
        snackbarSeverity = 'warning';
      } else {
        snackbarMessage = 'An error occured. Please try again later';
        snackbarSeverity = 'error';
      }

      this.setState({
        snackbarMessage,
        snackbarSeverity,
        snackbarOpen: true,
      });
    });
  }

  handleSnackbarClose() {
    this.setState({ snackbarOpen: false });
  }

  async updateUserProfile(pinnedLocation) {
    const { appState, setAppState } = this.context;
    const postData = [pinnedLocation.id];
    const locations = this.locations.map((location) => (location.id === pinnedLocation.id ? pinnedLocation : location));

    // update facility in server
    if (pinnedLocation.favorite) {
      await this.peopleService.addFacility(postData);
    } else {
      await this.peopleService.removeFacility(postData);
    }

    // update app state
    setAppState({
      ...appState,
      map: {
        ...appState.map,
        locations,
      },
    });
  }

  render() {
    const testLocations = this.state.testLocations;
    return (
      <section className="home-page">
        <IconButton
          className="settings-option hide-desktop"
          aria-label="settings"
          onClick={() => this.routeChange('/profile-edit')}
        >
          <SettingsIcon className="settings-option__icon" />
        </IconButton>

        <Header>
          <Container className="header-content" maxWidth="md">
            <h1 className="header-content__heading">Home</h1>

            <div className="header-content__card">
              <img src={UserAvatar} className="avatar" alt="Avatar" />

              <dl className="header-content__highlights">
                <div className="header-content__highlight">
                  <MapPin className="icon" />
                  <div>
                    <dt>Location</dt>
                    {this.state.locationName ? <dd>{this.state.locationName}</dd> : <dd>Using Current Location</dd>}
                  </div>
                </div>
                <div className="header-content__highlight">
                  <HealthIcon className="icon" />
                  <div>
                    <dt>Health</dt>
                    {this.state.symptomatic ? <dd>Symptomatic</dd> : <dd>No Symptoms</dd>}
                  </div>
                </div>
              </dl>
            </div>

            <IconButton
              className="settings-option hide-mobile"
              aria-label="settings"
              onClick={() => this.routeChange('/profile-edit')}
            >
              <SettingsIcon className="settings-option__icon" />
            </IconButton>
          </Container>
        </Header>

        <Container className="cards-container" maxWidth="md">
          <article className={clsx(this.state.prioritized ? 'banner--pass' : 'banner--warn', 'banner', 'article')}>
            <p className="banner__content">
              {this.state.prioritized ? (
                <CheckRoundedIcon className="banner__icon" />
              ) : (
                  <WarningRoundedIcon className="banner__icon" />
                )}
              <span>
                Your profile
                {this.state.prioritized ? ' may be prioritized ' : ' may not be prioritized '}
                for testing per CDC Criteria.{' '}
                <a
                  href="https://www.cdc.gov/coronavirus/2019-nCoV/hcp/clinical-criteria.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn More
                </a>
              </span>
            </p>
          </article>

          <article className="locations article">
            <h2 className="sub-heading">
              Test Locations Near You
              <LightTooltip title="Below are test locations nearest to the location associated with your profile.">
                <InfoOutlinedIcon className="info-icon"></InfoOutlinedIcon>
              </LightTooltip>
            </h2>

            {testLocations && testLocations.length ? (
              testLocations.map((location) => (
                <section className="card" key={location.id}>
                  <dl className="card__content" onClick={() => this.routeChange(`/map?selection=${location.id}`)}>
                    <dt className="card__term">{location.name}</dt>
                    <dd className="card__description">{location.address}</dd>
                    <dd className="card__description">
                      {location.phone ? location.phone.substring(2) : 'Phone number unavailable'}
                    </dd>
                  </dl>
                  <IconButton
                    className="pin-button"
                    aria-label="pin"
                    onClick={this.onLocationSelected.bind(this, location)}
                  >
                    <PinIcon className={location.favorite ? 'pin active' : 'pin'} key={location.id} />
                  </IconButton>
                </section>
              ))
            ) : (
                <section className="card card--no-results">
                  <p>No exact match locations found. </p>
                  <p>You may not be eligible for testing at locations listed below.</p>
                </section>
              )}

            {testLocations && testLocations.length && this.locations && this.locations.length > 5 ? (
              <Button
                fullWidth
                variant="outlined"
                onClick={() => this.onViewMoreClicked()}
                style={{ color: '#2A7DF4', border: '1px solid #2A7DF4' }}
                className="home-page__button"
              >
                {this.state.testLocationsExpanded ? 'View Less' : 'View More'}
              </Button>
            ) : (
                ''
              )}
          </article>

          <article className="share article">
            <h2 className="sub-heading">
              Sharing
              {/* Hiding until we implement Friends */}
              {/* <LightTooltip
                title="None of your contacts are currently on allclear.
                Invite your friends and family to keep track of their status."
              >
                <InfoOutlinedIcon className="info-icon"></InfoOutlinedIcon>
              </LightTooltip> */}
            </h2>
            <Button
              fullWidth
              variant="contained"
              onClick={() => this.onShareClicked()}
              className="home-page__button share__button"
            >
              <img src={PersonShareIcon} className="share__icon" alt="Share" />
              <span>Share allclear</span>
            </Button>
          </article>
        </Container>

        <SnackbarMessage
          isOpen={this.state.snackbarOpen}
          severity={this.state.snackbarSeverity}
          message={this.state.snackbarMessage}
          onClose={this.handleSnackbarClose}
          duration={100000000}
        />
      </section>
    );
  }
}

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    boxShadow: theme.shadows[4],
    padding: 20,
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 'normal',
    color: '#999',
    backgroundColor: '#fff',
  },
}))(Tooltip);
