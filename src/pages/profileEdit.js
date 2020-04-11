import React, { Component } from 'react';
import { bindAll } from 'lodash';

import HomescreenHeader from '../components/headers/header-homescreen';
import NavBottom from '../components/navBottom';
import PeopleService from '../services/people.service.js';
// import UnderDevelopment from './UnderDevelopment';

import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';

export default class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    bindAll(this, ['routeChange']);
    this.peopleService = PeopleService.getInstance();
    this.state = {
      profile: [],
    };
  }

  routeChange(route) {
    this.props.history.push(route);
  }

  render() {
    return (
      <section className="profile-edit">
        <HomescreenHeader navigate={'/profile-view'}>
          <h1 className="heading">Edit Profile</h1>
        </HomescreenHeader>

        <Container className="cards-container">
          <article className="card">
            <dl className="card__content">
              <dt className="card__term"></dt>
              <dd className="card__description"></dd>
            </dl>
          </article>

          <div className="button-container">
            <Button variant="contained" color="primary" fullWidth>
              Update Profile
            </Button>
            <Button variant="contained" fullWidth onClick={() => this.routeChange('/profile-view')}>
              Cancel
            </Button>
          </div>
        </Container>
        <NavBottom active={3}></NavBottom>
      </section>
    );
  }
}
