import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { bindAll } from 'lodash';
import RoundHeader from '../../components/headers/header-round';
import ProgressBottom from '../../components/progressBottom';
import states from './Symptoms.state';

import Form from '@material-ui/core/Container';
import Box from '@material-ui/core/Container';
import { Button, Chip } from '@material-ui/core';

class Symptom extends Component {
  state = states;

  constructor() {
    super();
    bindAll(this, ['componentDidMount', 'getSymptoms', 'handleChange', 'buildPayload', 'submitResults']);
  }

  componentDidMount() {
    this.getSymptoms();
  }

  getSymptoms() {
    this.setState({ loading: true });

    Axios.get('https://api-dev.allclear.app/types/symptoms', {})
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
    symptoms.map((symptom) => {
      if (symptom.name === event.name) {
        symptom.isActive = !symptom.isActive;
      }
      return true;
    });
    this.setState({ symptoms });
    sessionStorage.setItem('symptoms', JSON.stringify(symptoms));
  }

  buildPayload() {
    const dob = sessionStorage.getItem('dob');
    const phone = sessionStorage.getItem('phone');
    const lat = sessionStorage.getItem('lat');
    const lng = sessionStorage.getItem('lng');
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
      name: phone,
      latitude: lat,
      longitude: lng,
      conditions: conditionsArray,
      exposures: exposuresArray,
      symptoms: symptomsArray,
      healthWorkerStatus: JSON.parse(healthWorkerStatus),
    };
    return payload;
  }

  async submitResults() {
    const sessionId = sessionStorage.getItem('sessid');

    this.setState({ loading: true });

    const payload = this.buildPayload();

    await Axios.post('https://api-dev.allclear.app/peoples/register', payload, {
      headers: {
        'X-AllClear-SessionID': sessionId,
      },
    })
      .then((response) => {
        // this.setCookie('sessid', response.data.id); // TODO: blocks progress. check fn
        sessionStorage.setItem('sessid', response.data.id);
        sessionStorage.setItem('session', response.data);
        this.props.history.push('/map');
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
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
                <strong>Select all that apply.</strong>
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
            <div className="button-container">
              <Link to="/health-worker" className="hide-mobile">
                <Button variant="contained" className="back">
                  Back
                </Button>
              </Link>

              {/* Todo: Make `profile-view` access conditional on successful profile creation */}
              <Button variant="contained" color="primary" className="next" onClick={this.submitResults}>
                Continue to Home page
              </Button>
            </div>
          </Form>
          <ProgressBottom progress="75%"></ProgressBottom>
        </div>
      </div>
    );
  }
}
export default Symptom;
