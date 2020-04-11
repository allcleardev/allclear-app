import React, { Component } from 'react';
import { bindAll } from 'lodash';

import HomescreenHeader from '../components/headers/header-homescreen';
import NavBottom from '../components/navBottom';
import PeopleService from '../services/people.service.js';
import GoogleMapsAutocomplete from '../components/inputs/google-maps-autocomplete';

import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';

export default class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    bindAll(this, ['routeChange', 'setProfile', 'handleLocationSelection', 'onUpdateProfileClicked']);
    this.peopleService = PeopleService.getInstance();
    this.state = {
      profile: {},
      newProfile: {},
      loading: true,
      error: false,
    };
  }

  routeChange(route) {
    this.props.history.push(route);
  }

  async componentDidMount() {
    if (!localStorage.getItem('session')) {
      return this.props.history('/sign-up');
    }
    this.setState({ loading: true });
    const session = JSON.parse(localStorage.getItem('session'));
    this.setProfile(session);
  }

  setProfile(session) {
    if (session.person) {
      console.log('PROFILE:::', session.person);
      this.setState({ profile: session.person, loading: false });
    }
  }

  handleLocationSelection(bool, value) {
    if (value) {
      this.setState({ newProfile: { ...this.state.newProfile, locationName: value.description } });
    }
  }

  onUpdateProfileClicked() {
    const updatedProfile = { ...this.state.profile, ...this.state.newProfile };
    this.peopleService.editProfile(updatedProfile).then((res) => this.routeChange('/profile-view'));
  }

  render() {
    const profile = this.state.profile;
    return (
      <section className="profile-edit">
        <HomescreenHeader navigate={'/profile-view'}>
          <h1 className="heading">Edit Profile</h1>
        </HomescreenHeader>

        <Container className="cards-container">
          <article className="card">
            <div className="card__content">
              <label className="card__term">Location</label>
              {this.state.loading ? (
                'Loading...'
              ) : (
                <GoogleMapsAutocomplete
                  initialValue={profile.locationName}
                  locationSelected={this.handleLocationSelection}
                ></GoogleMapsAutocomplete>
              )}
            </div>
          </article>

          <div className="button-container">
            <Button variant="contained" color="primary" fullWidth onClick={this.onUpdateProfileClicked}>
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
