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
                  onClick={() => this.routeChange('/sign-up')}
                  disabled={!this.state.isSelected}
                >
                  Finish
                </Button>
              }
              tooltipMessage={'Please make a selection'}
              triggerTooltip={!this.state.isSelected}
            ></OnboardingNavigation>
          </Form>
          <ProgressBottom progress="50%"></ProgressBottom>
        </div>
      </div>
    );
  }
}
export default Symptom;
