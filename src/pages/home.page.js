import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { bindAll, get } from 'lodash';
import { Tooltip, withStyles } from '@material-ui/core';

import Header from '../components/general/headers/header';
import BottomNav from '../components/general/navs/bottom-nav';
import UserAvatar from '../assets/images/defaultProfile.svg';
import SettingsIcon from '../assets/images/settings-icon.svg';
import PersonShareIcon from '../assets/images/person-share-icon.svg';
import { ReactComponent as PinIcon } from '../assets/images/pin.svg';
import { AppContext } from '../contexts/app.context';

import Container from '@material-ui/core/Container';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'; // TODO: Ask Ashley for uncorrupted svg version from her mock
import { Button, IconButton } from '@material-ui/core';

export default class HomePage extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    bindAll(this, ['componentDidMount', 'routeChange', 'onLocationSelected', 'onShareClicked']);
    this.state = {
      locationName: '',
      testLocations: [],
      testLocationsExpanded: false,
      symptomatic: false,
      prioritized: false,
    };
  }

  componentDidMount() {
    const { appState } = this.context;
    this.locations = get(appState, 'map.locations');
    const healthWorkerStatusId = get(appState, 'person.healthWorkerStatusId');
    const symptoms = get(appState, 'person.symptoms');

    this.setState({
      testLocations: this.locations && this.locations.length ? this.locations.slice(0, 5) : [],
      symptomatic: symptoms && symptoms[0].id !== 'no' ? true : false,
      prioritized: healthWorkerStatusId === 'h' || symptoms.some((symptom) => symptom.id === 'fv') ? true : false,
      locationName: get(appState, 'person.locationName'),
    });
  }

  routeChange(route) {
    this.props.history.push(route);
  }

  onLocationSelected(pinnedLocation) {
    // toggle pinned status for selected location
    pinnedLocation.favorite = !pinnedLocation.favorite;
    // making a copy of testLocations state
    const testLocations = [...this.state.testLocations];
    // override selected location with new pinned (favorite) state
    testLocations.map((location) => {
      if (location.id === pinnedLocation.id) {
        location = pinnedLocation;
      }
    });
    this.setState({ testLocations });
    // TODO: Update App State w/new favorited location status
  }

  onViewMoreClicked() {
    const expanded = !this.state.testLocationsExpanded;
    this.setState({
      testLocations: expanded ? this.locations : this.locations.slice(0, 5),
      testLocationsExpanded: expanded,
    });
  }

  onShareClicked() {}

  render() {
    const testLocations = this.state.testLocations;
    return (
      <section className="home-page">
        <Link to="/settings" className="settings-option hide-desktop">
          <img src={SettingsIcon} className="settings-option__icon" alt="Settings" />
        </Link>

        <Header navItems={this.navItems}>
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
                {this.state.prioritized ? 'prioritized' : 'not prioritized'}
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

            {testLocations && testLocations.length
              ? testLocations.map((location) => (
                  <article className="card" key={location.id}>
                    <dl className="card__content">
                      <dt className="card__term">{location.name}</dt>
                      <dd className="card__description">{location.address}</dd>
                      <dd className="card__description">{location.phone.substring(2)}</dd>
                    </dl>
                    <IconButton
                      className="pin-button"
                      aria-label="pin"
                      onClick={this.onLocationSelected.bind(this, location)}
                    >
                      <PinIcon className={location.favorite ? 'pin active' : 'pin'} key={location.id} />
                    </IconButton>
                  </article>
                ))
              : 'No Results Found'}

            <Button
              fullWidth
              variant="outlined"
              onClick={() => this.onViewMoreClicked()}
              style={{ color: '#2A7DF4', border: '1px solid #2A7DF4' }}
              className=""
            >
              {this.state.testLocationsExpanded ? 'View Less' : 'View More'}
            </Button>
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
            <Button fullWidth variant="contained" onClick={() => this.onShareClicked()} className="share__button">
              <img src={PersonShareIcon} className="share__icon" alt="Share" />
              <span>Share allclear</span>
            </Button>
          </article>
        </Container>

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
