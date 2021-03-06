import React, { Component } from 'react';
import { bindAll } from 'lodash';

import PeopleService from '@services/people.service.js';
import TypesService from '@services/types.service.js';
import GAService from '@services/ga.service';
import { AppContext } from '@contexts/app.context';

import MultiSelectInput from '@general/inputs/multi-select-input';
import Header from '@general/headers/header';
import GoogleMapsAutocomplete from '@general/inputs/google-maps-autocomplete';
import Toggle from '@general/buttons/toggle';
import { Button, FormControl, Select, MenuItem, Container, withStyles } from '@material-ui/core';

export default class ProfileEditPage extends Component {
  static contextType = AppContext;
  state = {
    profile: {},
    newProfile: {},
    healthWorkerStatusList: [],
    userSelectedSymptoms: [],
    symptomsList: [],
    useCurrentLocation: false,
    disableLocationToggle: false,
    loading: true,
    error: false,
  };

  constructor(props) {
    super(props);
    bindAll(this, [
      'componentDidMount',
      'fetchLocationPermissions',
      'fetchHealthWorkerStatuses',
      'fetchSymptoms',
      'setProfile',
      'onLocationToggled',
      'onUpdateProfileClicked',
      'handleLocationSelection',
      'handleHealthWorkerSelection',
      'handleSymptomsSelection',
      '_onLocationAccepted',
      '_onLocationDeclined',
    ]);
    this.gaService = GAService.getInstance();
    this.gaService.setScreenName('profile-edit');
    this.peopleService = PeopleService.getInstance();
    this.typesService = TypesService.getInstance();
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const currState = this.context.appState;
    this.fetchLocationPermissions();
    this.fetchHealthWorkerStatuses();
    this.fetchSymptoms();
    this.setProfile(currState);
  }

  async fetchLocationPermissions() {
    // Checks if user allowed geolocation on page load; disables location toggle if blocked
    // NOTE* This feature is only supported by Chrome and Edge atm
    // (https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API)
    if (navigator && navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
        if (permissionStatus.state === 'denied') {
          this.setState({ disableLocationToggle: true });
        }
      });
    }
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
      // check to see if Current Location is turned on (aka location name does not exist) and if location isnt blocked
      if (!profile.locationName && !this.state.disableLocationToggle) {
        this.setState({ useCurrentLocation: true });
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

  async onLocationToggled(state) {
    let switchValue = state.checked;
    switchValue = !switchValue;

    this.setState({ useCurrentLocation: switchValue }, () => {
      if (switchValue) {
        if (navigator && navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this._onLocationAccepted, this._onLocationDeclined);
        }
      }
    });
  }

  async _onLocationAccepted(pos) {
    this.gaService.sendEvent('current_location_enabled', {});
    if (pos && pos.coords && pos.coords.latitude) {
      const { latitude, longitude } = pos.coords;

      this.setState({
        newProfile: {
          ...this.state.newProfile,
          latitude,
          longitude,
        },
      });
    }
    this.setState({ disableLocationToggle: false, useCurrentLocation: true });
  }

  _onLocationDeclined() {
    console.warn('User declined to use browser location');
    this.setState({ disableLocationToggle: true, useCurrentLocation: false });
  }

  async onUpdateProfileClicked() {
    const { appState, setAppState } = this.context;
    const session = this.context.appState.sessionId;
    const updatedProfile = {
      ...this.state.profile,
      ...this.state.newProfile,
      // setting this to track if Current Location is on for the user
      // if new locationName was selected, use that; otherwise, use original locationName
      locationName: this.state.useCurrentLocation
        ? ''
        : this.state.newProfile.locationName
        ? this.state.newProfile.locationName
        : this.state.profile.locationName,
    };

    await this.peopleService.editProfile(updatedProfile, session);
    setAppState({
      ...appState,
      person: {
        ...appState.person,
        ...updatedProfile,
      },
    });
    this.props.history.goBack();
    // TODO: Add success snack bar
  }

  render() {
    const profile = this.state.profile;
    return (
      <section className="profile-edit">
        <Header enableBackBtn={true}>
          <h1 className="heading">Edit Profile</h1>
        </Header>

        <Container className="cards-container">
          <article className="card">
            <div
              className="card__content"
              style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <label className="card__term">Use My Location</label>
              {this.state.loading ? (
                ''
              ) : (
                <Toggle
                  className="location-toggle"
                  onToggled={this.onLocationToggled}
                  defaultValue={this.state.useCurrentLocation}
                  disableToggle={this.state.disableLocationToggle}
                  disabledToggleMessage={'This feature is unavailable due to your current browser settings.'}
                ></Toggle>
              )}
            </div>

            <div className="card__content">
              <label className="card__term">Location</label>
              {this.state.loading ? (
                ''
              ) : (
                <GoogleMapsAutocomplete
                  initialValue={profile.locationName}
                  locationSelected={this.handleLocationSelection}
                  useCurrentLocation={this.state.useCurrentLocation}
                  noOptionsText={'Please Enter a Location'}
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
                label="Symptoms"
                items={this.state.symptomsList}
                onSelectClosed={this.handleSymptomsSelection}
                existingItems={profile && profile.symptoms}
              ></MultiSelectInput>
            </div>
          </article>

          <div className="button-container">
            <DefaultButton variant="contained" color="primary" fullWidth onClick={this.onUpdateProfileClicked}>
              Update Profile
            </DefaultButton>
            <DefaultButton variant="outlined" fullWidth onClick={() => this.props.history.goBack()}>
              Cancel
            </DefaultButton>
          </div>
        </Container>
      </section>
    );
  }
}

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
    color: theme.palette.primary.main,
    borderWidth: 1,
  },
}))(Button);
