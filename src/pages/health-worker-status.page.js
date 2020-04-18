import React, { Component } from 'react';
import { bindAll } from 'lodash';
import Form from '@material-ui/core/Container';
import Box from '@material-ui/core/Container';
import { Button, Chip } from '@material-ui/core';

import RoundHeader from '@general/headers/header-round';
import ProgressBottom from '@general/navs/progress-bottom';
import OnboardingNavigation from '@general/navs/onboarding-navigation';
import TypesService from '@services/types.service';
import {AppContext} from '@contexts/app.context';

class HealthWorkerStatusPage extends Component {
  static contextType = AppContext;
  state = {
    conditionObj: {},
    conditions: [],
  };

  constructor() {
    super();
    this.typesService = TypesService.getInstance();
    bindAll(this, ['componentDidMount', 'routeChange', 'getHealthWorkerStatuses', 'handleChange', 'render']);
  }

  componentDidMount() {
    this.getHealthWorkerStatuses();
  }

  routeChange(route) {
    this.props.history.push(route);
  }

  async getHealthWorkerStatuses() {
    const {appState, setAppState} = this.context;
    const healthWorkerStatus = await this.typesService.getHealthWorkerStatuses()
      .catch((error) => {
        this.setState({loading: false});
      });
    this.setState({ healthWorkerStatus });

    console.log('appState', appState);
    // save to global state for later usage
    setAppState({
      ...appState,
      profile:{
        ...appState.profile,
        options:{
          ...appState.profile.options,
          healthWorkerStatus
        }
      }
    });
    this.setState({ loading: false });
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
              <label className="label">
                <strong>Select one.</strong> (Required)
              </label>
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
              triggerTooltip={!this.state.isSelected}
            ></OnboardingNavigation>
          </Form>
          <ProgressBottom progress="25%"></ProgressBottom>
        </div>
      </div>
    );
  }
}
export default HealthWorkerStatusPage;
