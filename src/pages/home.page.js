import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindAll, get } from 'lodash';

import Header from '../components/general/headers/header';
import BottomNav from '../components/general/navs/bottom-nav';
import UserAvatar from '../assets/images/defaultProfile.svg';
import SettingsIcon from '../assets/images/settings-icon.svg';
import PersonShareIcon from '../assets/images/person-share-icon.svg';
import { AppContext } from '../contexts/app.context';

import Container from '@material-ui/core/Container';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'; // TODO: Ask Ashley for uncorrupted svg version from her mock
import { Button } from '@material-ui/core';

export default class HomePage extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    bindAll(this, ['componentDidMount', 'routeChange', 'onShareClicked']);
  }

  componentDidMount() {
    const { appState } = this.context;

    this.testLocations = get(appState, 'map.locations') || [];
    this.testLocations.reduce((arr, item, index) => {
      if (index > 6) {
        arr.push(item);
      }

      return arr;
    }, []);
    console.log('LOCATIONS:', this.testLocations);
  }

  routeChange(route) {
    this.props.history.push(route);
  }

  onShareClicked() {}

  render() {
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
                <dd>New York, NY</dd>
              </div>
              <div className="header-content__highlight">
                <dt>Health</dt>
                <dd>Symptomatic</dd>
              </div>
            </dl>
          </div>
        </Header>

        <Container className="cards-container">
          <Link to="/settings" className="settings-option hide-desktop">
            <img src={SettingsIcon} className="settings-option__icon" alt="Settings" />
          </Link>

          <article className="banner article">
            <WarningRoundedIcon className="banner__icon"></WarningRoundedIcon>
            <p className="banner__text">
              Your profile is not prioritized for testing per CDC Criteria. <a href="/">Learn More</a>
            </p>
          </article>

          <article className="locations article">
            <h2 className="sub-heading">
              Test Locations Near You <InfoOutlinedIcon className="info-icon"></InfoOutlinedIcon>
            </h2>

            {this.testLocations && this.testLocations.length
              ? this.testLocations.slice(0, 5).map((location) => (
                  <article className="card">
                    <dl className="card__content">
                      <dt className="card__term">{location.name}</dt>
                      <dd className="card__description">{location.address}</dd>
                      <dd className="card__description">Lorem ipsum dolor sit amet, consectetur.</dd>
                    </dl>
                  </article>
                ))
              : 'No Results Found'}

            <Button
              fullWidth
              variant="outlined"
              onClick={() => this.routeChange('/profile')}
              style={{ color: '#2A7DF4', border: '1px solid #2A7DF4' }}
              className=""
            >
              View More
            </Button>
          </article>

          <article className="share article">
            <h2 className="sub-heading">
              Friends <InfoOutlinedIcon className="info-icon"></InfoOutlinedIcon>
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
