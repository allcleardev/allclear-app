import React, { Component } from 'react';
import { bindAll, get } from 'lodash';

import PeopleService from '@services/people.service';

import Header from '../components/general/headers/header';
import BottomNav from '../components/general/navs/bottom-nav';
import UserAvatar from '../assets/images/defaultProfile.svg';
import PersonShareIcon from '../assets/images/person-share-icon.svg';
import { ReactComponent as PinIcon } from '../assets/images/pin-icon.svg';
import { ReactComponent as SettingsIcon } from '../assets/images/settings-icon.svg';
import { AppContext } from '../contexts/app.context';

import SnackbarMessage from '@general/alerts/snackbar-message';

import Container from '@material-ui/core/Container';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'; // TODO: Ask Ashley for uncorrupted svg version from her mock
import { Button, IconButton, Tooltip, withStyles } from '@material-ui/core';

export default class HomePage extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    bindAll(this, [
      'componentDidMount',
      'routeChange',
      'onLocationSelected',
      'onViewMoreClicked',
      'onShareClicked',
      'handleSnackbarClose',
      'updateUserProfile',
    ]);
    this.peopleService = PeopleService.getInstance();
    this.navItems = [
      { route: '/map', name: 'Find Tests' },
      { route: '/contact-tracing', name: 'Tracing' },
      { route: '/profile', name: 'Profile' },
    ];
    this.state = {
      locationName: '',
      testLocations: [],
      testLocationsExpanded: false,
      symptomatic: false,
      prioritized: false,
      isSnackbarOpen: false,
    };
  }

  componentDidMount() {
    const { appState } = this.context;
    this.locations = get(appState, 'map.locations');
    const symptoms = get(appState, 'person.symptoms');
    const healthWorkerStatusId = get(appState, 'person.healthWorkerStatusId');
    const testLocations = this.locations.sort((a, b) => b.favorite - a.favorite || a.meters - b.meters);

    this.setState({
      locationName: get(appState, 'person.locationName') || 'Using Current Location',
      testLocations: testLocations && testLocations.length ? testLocations.slice(0, 5) : [],
      symptomatic: symptoms && symptoms[0].id !== 'no' ? true : false,
      prioritized:
        healthWorkerStatusId === 'h' || (symptoms && symptoms.some((symptom) => symptom.id === 'fv')) ? true : false,
    });
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
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText('https://go.allclear.app');
      this.setState({ isSnackbarOpen: true });
    }
  }

  handleSnackbarClose() {
    this.setState({ isSnackbarOpen: false });
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

        <Header navItems={this.navItems} enableBackBtn={true}>
          <div className="header-content">
            <h1 className="header-content__heading">allclear</h1>

            <div className="avatar-container">
              <img src={UserAvatar} className="avatar-container__img" alt="Avatar" />
            </div>

            <dl className="header-content__highlights">
              <div className="header-content__highlight">
                <dt>Location</dt>
                {this.state.locationName ? <dd>{this.state.locationName}</dd> : <dd>Using Current Location</dd>}
              </div>
              <div className="header-content__highlight">
                <dt>Health</dt>
                {this.state.symptomatic ? <dd>Symptomatic</dd> : <dd>No Symptoms</dd>}
              </div>
            </dl>
          </div>
        </Header>

        <Container className="cards-container">
          <article className="banner article">
            <p className="banner__content">
              {this.state.prioritized ? (
                <CheckRoundedIcon className="banner__icon banner__icon--pass" />
              ) : (
                <WarningRoundedIcon className="banner__icon banner__icon--warn" />
              )}
              <span>
                Your profile is
                {this.state.prioritized ? ' prioritized ' : ' not prioritized '}
                for testing per CDC Criteria. <a href="/">Learn More</a>
              </span>
            </p>
          </article>

          <article className="locations article">
            <h2 className="sub-heading">
              Test Locations Near You
              <LightTooltip
                title="Below are test locations that you qualify for followed by test locations that you
                currently don’t qualify for based on your profile. Contact the test locations for more details."
              >
                <InfoOutlinedIcon className="info-icon"></InfoOutlinedIcon>
              </LightTooltip>
            </h2>

            {testLocations && testLocations.length ? (
              testLocations.map((location) => (
                <section className="card" key={location.id}>
                  <dl className="card__content">
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
              Friends
              <LightTooltip
                title="None of your contacts are currently on allclear.
                Invite your friends and family to keep track of their status."
              >
                <InfoOutlinedIcon className="info-icon"></InfoOutlinedIcon>
              </LightTooltip>
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
          severity="success"
          isOpen={this.state.isSnackbarOpen}
          onClose={this.handleSnackbarClose}
          message={'Link Copied!'}
        />

        <BottomNav active={0}></BottomNav>
      </section>
    );
  }
}

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    boxShadow: theme.shadows[4],
    padding: 20,
    borderRadius: 8,
    fontSize: 15,
    lineHeight: '20px',
    color: '#999',
    backgroundColor: '#fff',
  },
}))(Tooltip);
