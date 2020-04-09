import React, { Component } from 'react';
import { bindAll } from 'lodash';
import Axios from 'axios';

import states from './HealthWorkerStatus.state';
import RoundHeader from '../../components/headers/header-round';
import ProgressBottom from '../../components/progressBottom';
import OnboardingNavigation from '../../components/onboarding-navigation';

import Form from '@material-ui/core/Container';
import Box from '@material-ui/core/Container';
import { Button, Chip } from '@material-ui/core';

class HealthWorkerStatus extends Component {
  state = states;

  constructor() {
    super();
    bindAll(this, ['componentDidMount', 'routeChange', 'getHealthWorkerStatuses', 'handleChange', 'render']);
  }

  componentDidMount() {
    this.getHealthWorkerStatuses();
  }

  routeChange(route) {
    this.props.history.push(route);
  }

  getHealthWorkerStatuses() {
    this.setState({ loading: true });

    Axios.get('https://api-dev.allclear.app/types/healthWorkerStatuses', {})
      .then((response) => {
        this.setState({ healthWorkerStatus: response.data });
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  handleChange(event) {
    const { healthWorkerStatus } = this.state;
    const selectedStatus = event;

    healthWorkerStatus.map((status) => {
      if (status.name === event.name) {
        status.isActive = !status.isActive;
      } else {
        // forces one selection
        status.isActive = false;
      }
      return true;
    });
    this.setState({ healthWorkerStatus });
    this.setState({ isSelected: event.isActive });
    sessionStorage.setItem('healthWorkerStatus', JSON.stringify(selectedStatus));
  }

  render() {
    return (
      <div className="background-responsive">
        <div className="health-worker onboarding-page">
          <RoundHeader navigate={'/background'}>
            <h1 className="heading">Health Worker Status</h1>
            <h2 className="sub-heading">
              Some test centers will test you if you’re a medical professional or first responder, even if you have no
              symptoms.
            </h2>
          </RoundHeader>
          <Form noValidate autoComplete="off" className="onboarding-body">
            <Box maxWidth="md">
              <div className="chips-group">
                {this.state.healthWorkerStatus &&
                  this.state.healthWorkerStatus.map((res) => {
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
                  onClick={() => this.routeChange('/background')}
                >
                  Back
                </Button>
              }
              forward={
                <Button
                  variant="contained"
                  color="primary"
                  className="next"
                  disabled={!this.state.isSelected}
                  onClick={() => this.routeChange('/symptoms')}
                >
                  Next
                </Button>
              }
              tooltipMessage={'Please make a selection'}
              disableForward={!this.state.isSelected}
            ></OnboardingNavigation>
          </Form>
          <ProgressBottom progress="50%"></ProgressBottom>
        </div>
      </div>
    );
  }
}
export default HealthWorkerStatus;
