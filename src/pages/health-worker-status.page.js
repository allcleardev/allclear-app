import React, { Component } from 'react';
import { bindAll } from 'lodash';

import TypesService from '@services/types.service';
import GAService from '@services/ga.service';

import ProgressBottom from '@general/navs/progress-bottom';
import OnboardingNavigation from '@general/navs/onboarding-navigation';
import { AppContext } from '@contexts/app.context';

import Header from '@components/general/headers/header';
import { Container, Chip } from '@material-ui/core';

class HealthWorkerStatusPage extends Component {
  static contextType = AppContext;
  state = {
    conditionObj: {},
    conditions: [],
  };

  constructor() {
    super();
    bindAll(this, ['componentDidMount', 'getHealthWorkerStatuses', 'handleChange', 'render']);
    this.typesService = TypesService.getInstance();
    this.gaService = GAService.getInstance();
    this.gaService.setScreenName('health-worker');
  }

  componentDidMount() {
    this.getHealthWorkerStatuses();
  }

  async getHealthWorkerStatuses() {
    const healthWorkerStatus = await this.typesService.getHealthWorkerStatuses().catch((error) => {
      this.setState({ loading: false });
    });
    this.setState({ healthWorkerStatus });

    this.setState({ loading: false });
  }

  handleChange(event) {
    const { appState, setAppState } = this.context;
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

    setAppState({
      ...appState,
      profile: {
        ...appState.profile,
        options: {
          ...appState.profile.options,
          healthWorkerStatus: selectedStatus,
        },
      },
    });
  }

  render() {
    return (
      <div className="health-worker onboarding-page">
        <Header enableBackBtn={true}>
          <h1>Health Worker Status</h1>
          <h2>Per the CDC, Health Worker and First Responder statuses impact test location availability.</h2>
        </Header>
        <Container className="onboarding-body">
          <Container maxWidth="md">
            <label className="label">
              Select one <span>(Required)</span>
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
          </Container>
          <OnboardingNavigation
            forwardRoute={'/symptoms'}
            forwardDisabled={!this.state.isSelected}
            triggerTooltip={!this.state.isSelected}
            tooltipMessage={'Please make a selection'}
          ></OnboardingNavigation>
        </Container>
        <ProgressBottom progress="20%"></ProgressBottom>
      </div>
    );
  }
}
export default HealthWorkerStatusPage;
