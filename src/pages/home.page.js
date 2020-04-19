import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindAll } from 'lodash';

import Header from '../components/general/headers/header';
import BottomNav from '../components/general/navs/bottom-nav';
import UserAvatar from '../assets/images/defaultProfile.svg';
import PeopleService from '../services/people.service.js';
import { AppContext, INITIAL_APP_STATE } from '../contexts/app.context';
import SettingsIcon from '../assets/images/settings-icon.svg';

import Container from '@material-ui/core/Container';
import { Button, IconButton, Chip } from '@material-ui/core';

export default class HomePage extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    bindAll(this, ['componentDidMount', 'fetchProfile', 'setProfile']);
    this.peopleService = PeopleService.getInstance();
    this.state = {
      profile: {},
    };
  }

  async componentDidMount() {
    if (!localStorage.getItem('session')) {
      return this.props.history('/sign-up');
    }
    const session = JSON.parse(localStorage.getItem('session'));
    console.log('SESSION:', session);

    this.setProfile(session);
    // await this.fetchProfile(session);
  }

  async fetchProfile(session) {
    const response = await this.peopleService.getById(session.person.id);
    const profile = response.data;

    session.person = profile;
    localStorage.setItem('session', JSON.stringify(session));
    this.setState({ profile });
  }

  setProfile(session) {
    if (session.person) {
      this.setState({ profile: session.person });
    }
  }

  render() {
    const profile = this.state.profile;
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

          <article className="card">
            <dl className="card__content">
              <dt className="card__term">Phone</dt>
              <dd className="card__description"> phone number</dd>
            </dl>
          </article>

          <Button
            onClick={() => this.executeLogout()}
            style={{ color: '#2A7DF4', border: '1px solid #2A7DF4' }}
            className="btn-big  fontsize-16"
          >
            Logout
          </Button>
        </Container>

        <BottomNav active={3}></BottomNav>
      </section>
    );
  }
}
