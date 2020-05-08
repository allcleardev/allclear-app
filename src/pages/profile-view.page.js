import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindAll } from 'lodash';

import PeopleService from '@services/people.service.js';
import UserAvatar from '@assets/images/defaultProfile.svg';
import { ReactComponent as SettingsIcon } from '@assets/images/settings-icon.svg';
import { AppContext } from '@contexts/app.context';

import Header from '@components/general/headers/header';
import { Button, IconButton, Chip, Container, withStyles } from '@material-ui/core';

export default class ProfileViewPage extends Component {
  static contextType = AppContext;
  state = {
    profile: {},
  };

  constructor(props) {
    super(props);
    bindAll(this, ['routeChange', 'componentDidMount', 'fetchProfile', 'setProfile']);
    this.peopleService = PeopleService.getInstance();
  }

  routeChange(route) {
    this.props.history.push(route);
  }

  async componentDidMount() {
    const currState = this.context.appState;
    this.setProfile(currState);
    await this.fetchProfile(currState);
  }

  async fetchProfile(session) {
    const currSession = this.context.appState.sessionId;
    const { id } = this.context.appState.person;

    const response = await this.peopleService.getById(id, currSession);
    const profile = response.data;

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
      <section className="profile-view">
        <IconButton
          className="settings-option hide-desktop"
          aria-label="settings"
          onClick={() => this.routeChange('/settings')}
        >
          <SettingsIcon className="settings-option__icon" />
        </IconButton>

        <Header enableBackBtn={true}>
          <div className="header-content">
            <h1 className="header-content__heading">Your Profile</h1>

            <div className="avatar-container">
              <img src={UserAvatar} className="avatar-container__img" alt="Avatar" />
            </div>
          </div>
        </Header>

        <Container className="cards-container">
          <IconButton
            className="settings-option hide-mobile"
            aria-label="settings"
            onClick={() => this.routeChange('/settings')}
          >
            <SettingsIcon className="settings-option__icon" />
          </IconButton>

          <article className="card">
            <dl className="card__content">
              <dt className="card__term">Phone</dt>
              <dd className="card__description"> {profile.phone}</dd>
            </dl>
          </article>

          <article className="card">
            <Link to="/profile-edit" className="edit">
              <EditIconButton></EditIconButton>
            </Link>

            <dl className="card__content">
              <dt className="card__term">Location</dt>
              {profile.locationName ? (
                <dd className="card__description">{profile.locationName}</dd>
              ) : (
                <dd className="card__description">My Current Location</dd>
              )}
            </dl>

            {profile.exposures && profile.exposures.length ? (
              <dl className="card__content">
                <dt className="card__term">Exposure to COVID-19</dt>
                {profile.exposures.map((res) => {
                  return (
                    <dd className="card__description" key={res.id}>
                      {res.name}
                    </dd>
                  );
                })}
              </dl>
            ) : (
              ''
            )}

            {profile.healthWorkerStatus ? (
              <dl className="card__content">
                <dt className="card__term">Health Worker Status</dt>
                <dd className="card__description">{profile.healthWorkerStatus.name}</dd>
              </dl>
            ) : (
              ''
            )}

            {profile.conditions && profile.conditions.length ? (
              <dl className="card__content">
                <dt className="card__term">Conditions</dt>
                <dd className="card__description">
                  {profile.conditions.map((res) => {
                    return <Chip label={res.name} className="chip" key={res.id}></Chip>;
                  })}
                </dd>
              </dl>
            ) : (
              ''
            )}

            {profile.symptoms && profile.symptoms.length ? (
              <dl className="card__content">
                <dt className="card__term">Symptoms</dt>
                <dd className="card__description">
                  {profile.symptoms.map((res) => {
                    return <Chip label={res.name} className="chip" key={res.id}></Chip>;
                  })}
                </dd>
              </dl>
            ) : (
              ''
            )}
          </article>

          <Link to="/logout">
            <DefaultButton
              fullWidth
              color="primary"
              variant="outlined"
              className="default-button"
            >
              Logout
            </DefaultButton>
          </Link>
        </Container>
      </section>
    );
  }
}

const EditIconButton = () => {
  return (
    <IconButton>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.7437 0.712402L18.7437 5.7124L5.74365 18.7124H0.743652V13.7124L13.7437 0.712402Z"
          stroke="#242424"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconButton>
  );
};

// TODO: Move to own general component
const DefaultButton = withStyles((theme) => ({
  root: {
    padding: '12px 16px',
    fontWeight: '600',
    fontSize: '17px',
    borderRadius: '10px',
  },
  outlined: {
    borderColor: theme.palette.primary.main,
    borderWidth: 1,
  },
}))(Button);
