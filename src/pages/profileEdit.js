import React, { Component } from 'react';
import { bindAll } from 'lodash';

import HomescreenHeader from '../components/headers/header-homescreen';
import NavBottom from '../components/navBottom';
import GoogleMapsAutocomplete from '../components/inputs/google-maps-autocomplete';

import PeopleService from '../services/people.service.js';
import TypesService from '../services/types.service.js';

import Container from '@material-ui/core/Container';
import { Button, FormControl, Select, MenuItem, Input, Chip } from '@material-ui/core';

export default class ProfileEdit extends Component {
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
    const session = JSON.parse(localStorage.getItem('session'));

    this.setProfile(session);
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
      this.setState({ newProfile: { ...this.state.newProfile, locationName: value.description } });
    }
  }

  handleHealthWorkerSelection(event) {
    if (event.target.value) {
      this.setState({
        newProfile: { ...this.state.newProfile, healthWorkerStatusId: event.target.value },
      });
    }
  }

  handleSymptomsSelection(event, value) {
    const selectedValue = value.props.value;
    let selectedList = event.target.value;

    // return empty lists (forces user to select at least one)
    if (!selectedList.length) {
      return;
    }

    // if 'none' is selectedValue, deselect the rest
    if (selectedValue.id === 'no') {
      this.setState({
        userSelectedSymptoms: [selectedValue],
        newProfile: { ...this.state.newProfile, symptoms: [selectedValue] },
      });
    } else {
      // if 'none' was previously selected, remove from current selectedList
      if (selectedList.length) {
        selectedList = selectedList.filter((selected) => selected.id !== 'no');
      }

      this.setState({
        // set chips/dropdown selection state
        userSelectedSymptoms: selectedList,
        // update newProfile to be sent to the server on submit
        newProfile: { ...this.state.newProfile, symptoms: selectedList },
      });
    }
  }

  onUpdateProfileClicked() {
    const updatedProfile = { ...this.state.profile, ...this.state.newProfile };
    this.peopleService.editProfile(updatedProfile).then((res) => this.routeChange('/profile'));
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
              <label className="card__term">Symptoms</label>
              <FormControl>
                {this.state.loading ? (
                  ''
                ) : (
                  <Select
                    multiple
                    value={this.state.userSelectedSymptoms}
                    onChange={this.handleSymptomsSelection}
                    input={<Input />}
                    renderValue={(selected) => (
                      <div className="chips-container">
                        {selected.map((option) => (
                          <Chip key={option.id} label={option.name} className="chip" />
                        ))}
                      </div>
                    )}
                  >
                    {this.state.symptomsList.map((option) => (
                      <MenuItem key={option.id} value={option}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </FormControl>
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
        <NavBottom active={3}></NavBottom>
      </section>
    );
  }
}
