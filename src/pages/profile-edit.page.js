import React, { Component } from 'react';
import { bindAll } from 'lodash';

import HomescreenHeader from '../components/general/headers/header-homescreen';
import BottomNav from '../components/general/navs/bottom-nav';
import GoogleMapsAutocomplete from '../components/general/inputs/google-maps-autocomplete';

import PeopleService from '../services/people.service.js';
import TypesService from '../services/types.service.js';

import Container from '@material-ui/core/Container';
import { Button, FormControl, Select, MenuItem } from '@material-ui/core';
import { AppContext } from '@contexts/app.context';
import MultiSelectInput from '@general/inputs/multi-select-input';

export default class ProfileEditPage extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    bindAll(this, [
      'routeChange',
      'componentDidMount',
      'fetchHealthWorkerStatuses',
      'fetchSymptoms',
      'setProfile',
      'onUpdateProfileClicked',
      'handleLocationSelection',
      'handleHealthWorkerSelection',
      'handleSymptomsSelection',
    ]);
    this.peopleService = PeopleService.getInstance();
    this.typesService = TypesService.getInstance();
    this.state = {
      profile: {},
      newProfile: {},
      healthWorkerStatusList: [],
      userSelectedSymptoms: [],
      symptomsList: [],
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
    const currState = this.context.appState;

    this.setProfile(currState);
    this.fetchHealthWorkerStatuses();
    this.fetchSymptoms();
  }

  async fetchHealthWorkerStatuses() {
    const response = await this.typesService.getHealthWorkerStatuses();
    this.setState({ healthWorkerStatusList: response });
  }

  async fetchSymptoms() {
    const response = await this.typesService.getSymptoms();
    const selectedSymptoms = this.state.userSelectedSymptoms;

    // merge user selected symptoms w/server symptoms list to mark active selection status in dropdown on load
    const combined = selectedSymptoms.concat(
      response.filter((responseOption) =>
        selectedSymptoms.every((selectedOption) => selectedOption.id !== responseOption.id),
      ),
    );
    this.setState({ symptomsList: combined });
  }

  setProfile(session) {
    if (session.person) {
      const profile = session.person;

      // need to pull out user selected symptoms and set to own state for isolated data handling
      if (profile.symptoms && profile.symptoms.length) {
        this.setState({ userSelectedSymptoms: profile.symptoms });
      }
      this.setState({ profile, loading: false });
    }
  }

  handleLocationSelection(bool, value) {
    if (value) {
      const { latitude, longitude } = value;
      this.setState({
        newProfile: {
          ...this.state.newProfile,
          locationName: value.description,
          latitude,
          longitude,
        },
      });
    }
  }

  handleHealthWorkerSelection(event) {
    if (event.target.value) {
      this.setState({
        newProfile: { ...this.state.newProfile, healthWorkerStatusId: event.target.value },
      });
    }
  }

  handleSymptomsSelection(symptomList) {
      this.setState({
        // set chips/dropdown selection state
        userSelectedSymptoms: symptomList,
        // update newProfile to be sent to the server on submit
        newProfile: { ...this.state.newProfile, symptoms: symptomList },
      });
  }

  async onUpdateProfileClicked() {
    const { appState, setAppState } = this.context;
    const updatedProfile = {
      ...this.state.profile,
      ...this.state.newProfile,
    };
    await this.peopleService.editProfile(updatedProfile);
    setAppState({
      ...appState,
      person: {
        ...appState.person,
        ...updatedProfile,
      },
    });
    this.routeChange('/profile');
  }

  render() {
    const profile = this.state.profile;
    return (
      <section className="profile-edit">
        <HomescreenHeader navigate={'/profile'}>
          <h1 className="heading">Edit Profile</h1>
        </HomescreenHeader>

        <Container className="cards-container">
          <article className="card">
            <div className="card__content">
              <label className="card__term">Location</label>
              {this.state.loading ? (
                ''
              ) : (
                <GoogleMapsAutocomplete
                  initialValue={profile.locationName}
                  locationSelected={this.handleLocationSelection}
                ></GoogleMapsAutocomplete>
              )}
            </div>

            <div className="card__content">
              <label className="card__term">Health Worker Status</label>
              <FormControl variant="outlined">
                {this.state.loading ? (
                  ''
                ) : (
                  <Select
                    className="input"
                    defaultValue={profile.healthWorkerStatusId}
                    onChange={this.handleHealthWorkerSelection}
                  >
                    {this.state.healthWorkerStatusList
                      ? this.state.healthWorkerStatusList.map((option) => (
                          <MenuItem value={option.id} key={option.id}>
                            {option.name}
                          </MenuItem>
                        ))
                      : ''}
                  </Select>
                )}
              </FormControl>
            </div>

            <div className="card__content">
              <MultiSelectInput
                label='Symptoms'
                items={this.state.symptomsList}
                onSelectClosed={this.handleSymptomsSelection}
                existingItems={profile && profile.symptoms}
              >
              </MultiSelectInput>
            </div>
          </article>

          <div className="button-container">
            <Button variant="contained" color="primary" fullWidth onClick={this.onUpdateProfileClicked}>
              Update Profile
            </Button>
            <Button variant="contained" fullWidth onClick={() => this.routeChange('/profile')}>
              Cancel
            </Button>
          </div>
        </Container>
        <BottomNav active={3}></BottomNav>
      </section>
    );
  }
}
