import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindAll } from 'lodash';
import Container from '@material-ui/core/Container';

import HomescreenHeader from '../components/headers/header-homescreen';
import NavBottom from '../components/navBottom';
import userAvatar from '../assets/images/defaultProfile.svg';
import PeopleService from '../services/people.service.js';

import { Button, IconButton, Chip } from '@material-ui/core';

export default class ProfileView extends Component {
  constructor(props) {
    super(props);
    bindAll(this, ['componentDidMount']);
    this.peopleService = PeopleService.getInstance();
    this.state = {
      profile: {},
    };
  }

  async componentDidMount() {
    const session = localStorage.getItem('session');

    this._setProfile(JSON.parse(session));
  }

  _setProfile(session) {
    console.log('SESSION:', session);
    this.setState({ profile: session.person });
  }

  render() {
    const profile = this.state.profile;
    return (
      <section className="profile-view">
        <HomescreenHeader>
          <div className="avatar-edit">
            <div className="avatar">
              <img
                src={userAvatar}
                alt="avatar"
                style={{ borderRadius: '50%', backgroundColor: 'white', border: '1px solid white' }}
              />
            </div>
          </div>
        </HomescreenHeader>

        <Container className="cards-container">
          <article className="card">
            <dl className="card__content">
              <dt className="card__term">Phone</dt>
              <dd className="card__description"> {profile.name}</dd>
            </dl>
          </article>

          <article className="card">
            <Link to="/profile-edit" className="edit">
              <EditIconButton></EditIconButton>
            </Link>

            <dl className="card__content">
              <dt className="card__term">Location</dt>
              <dd className="card__description">11211</dd>
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

          <Button style={{ color: '#2A7DF4', border: '1px solid #2A7DF4' }} className="btn-big  fontsize-16">
            Logout
          </Button>
        </Container>

        <NavBottom active={3}></NavBottom>
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
