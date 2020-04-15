import React, { Component } from 'react';
import { bindAll } from 'lodash';
import Axios from 'axios';

import states from './Symptoms.state';
import RoundHeader from '../../components/headers/header-round';
import ProgressBottom from '../../components/progressBottom';
import OnboardingNavigation from '../../components/onboarding-navigation';

import Form from '@material-ui/core/Container';
import Box from '@material-ui/core/Container';
import { Button, Chip } from '@material-ui/core';
import {AppContext} from '../../contexts/App.context';
import PeopleService from '../../services/people.service';

class Symptom extends Component {
  state = states;
  static contextType = AppContext;

  constructor() {
    super();
    bindAll(this, [
      'componentDidMount',
      'routeChange',
      'getSymptoms',
      'handleChange',
      'deselectAll',
      'checkForSelection',
      'buildPayload',
      'submitResults',
    ]);
    this.peopleService = PeopleService.getInstance();
  }

  componentDidMount() {
    this.getSymptoms();
  }

  routeChange(route) {
    this.props.history.push(route);
  }

  getSymptoms() {
    this.setState({ loading: true });

    Axios.get('/types/symptoms', {})
      .then((response) => {
        this.setState({ symptoms: response.data });
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  handleChange(event) {
    let { symptoms } = this.state;
    // If "none" is selected, deselect the other chips
    if (event.id === 'no') {
      this.deselectAll();
    } else {
      symptoms.map((symptom) => {
        // Making sure "none" is deselected if any other chips are
        if (symptom.id === 'no') {
          symptom.isActive = false;
        } else {
          if (symptom.name === event.name) {
            symptom.isActive = !symptom.isActive;
          }
        }
        return true;
      });
    }

    this.setState({ symptoms });
    this.checkForSelection();
    sessionStorage.setItem('symptoms', JSON.stringify(symptoms));
  }

  deselectAll() {
    let { symptoms } = this.state;
    symptoms.map((symptom) => {
      if (symptom.id !== 'no') {
        symptom.isActive = false;
      } else {
        symptom.isActive = true;
      }
      return true;
    });
    this.setState({ symptoms });
    sessionStorage.setItem('symptoms', JSON.stringify(symptoms));
  }

  checkForSelection() {
    let isSelected = false;
    this.state.symptoms.map((symptom) => {
      if (symptom.isActive) {
        isSelected = true;
      }
      return true;
    });
    this.setState({ isSelected });
  }

  buildPayload() {
    const { appState } = this.context;
    // todo: set latlng to appprovider here - get
    const {latitude, longitude} = appState.person;
    const dob = sessionStorage.getItem('dob');
    const phone = sessionStorage.getItem('phone');
    // todo: none of this should be needed anymore
    // const lat = sessionStorage.getItem('lat');
    // const lng = sessionStorage.getItem('lng');
    const locationName = sessionStorage.getItem('locationName');
    const healthWorkerStatus = sessionStorage.getItem('healthWorkerStatus');
    const alertable = sessionStorage.getItem('alertable');

    // Format Conditions
    let conditions = sessionStorage.getItem('conditions');
    const conditionsArray = [];
    if (conditions) {
      if (typeof conditions === 'string') {
        conditions = JSON.parse(conditions);
      }
      conditions.forEach((condition) => {
        if (condition.isActive) {
          conditionsArray.push({
            id: condition.id,
            name: condition.name,
          });
        }
      });
    }

    // Format Exposures
    let exposures = sessionStorage.getItem('exposures');
    const exposuresArray = [];
    if (exposures) {
      if (typeof exposures === 'string') {
        exposures = JSON.parse(exposures);
      }
      exposures.forEach((exposure) => {
        if (exposure.isActive) {
          exposuresArray.push({
            id: exposure.id,
            name: exposure.name,
          });
        }
      });
    }

    // Format Symptoms
    let symptoms = sessionStorage.getItem('symptoms');
    const symptomsArray = [];
    if (symptoms) {
      if (typeof symptoms === 'string') {
        symptoms = JSON.parse(symptoms);
      }
      symptoms.forEach((symptom) => {
        if (symptom.isActive) {
          symptomsArray.push({
            id: symptom.id,
            name: symptom.name,
          });
        }
      });
    }

    const payload = {
      dob,
      alertable,
      locationName,
      name: phone,
      latitude,
      longitude,
      conditions: conditionsArray,
      exposures: exposuresArray,
      symptoms: symptomsArray,
      healthWorkerStatusId: JSON.parse(healthWorkerStatus).id,
    };
    return payload;
  }

  async submitResults() {
    this.setState({ loading: true });
    const { appState, setAppState } = this.context;

    const payload = this.buildPayload();
    const resp = await this.peopleService.register(payload);
    setAppState({
      ...appState,
      sessionId: resp.data.id,
      person: {
        ...appState.person,
        ...resp.data.person
      }
    });

    this.props.history.push('/map');
  }

  render() {
    return (
      <div className="background-responsive">
        <div className="symptoms onboarding-page">
          <RoundHeader navigate={'/health-worker'}>
            <h1 className="heading">Symptoms</h1>
            <h2 className="sub-heading">Most test centers are only seeing patients with certain symptoms.</h2>
          </RoundHeader>
          <Form noValidate autoComplete="off" className="onboarding-body">
            <Box maxWidth="md">
              <label className="label">
                <strong>Select all that apply.</strong> (Required)
              </label>
              <div className="chips-group">
                {this.state.symptoms &&
                  this.state.symptoms.map((res) => {
                    return (
                      <Chip
                        key={res.id}
                        className={'chip' + (res.isActive ? ' Active' : '')}
                        label={res.name}
                        variant="outlined"
                        onClick={() => this.handleChange(res)}
                      ></Chip>
                    );
                  })}
              </div>
            </Box>
            <OnboardingNavigation
              back={
                <Button
                  variant="contained"
                  className="back hide-mobile"
                  onClick={() => this.routeChange('/health-worker')}
                >
                  Back
                </Button>
              }
              forward={
                <Button
                  variant="contained"
                  color="primary"
                  className="next"
                  onClick={this.submitResults}
                  disabled={!this.state.isSelected}
                >
                  Finish
                </Button>
              }
              tooltipMessage={'Please make a selection'}
              triggerTooltip={!this.state.isSelected}
            ></OnboardingNavigation>
          </Form>
          <ProgressBottom progress="75%"></ProgressBottom>
        </div>
      </div>
    );
  }
}
export default Symptom;
