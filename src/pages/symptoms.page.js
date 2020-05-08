import React, { Component } from 'react';
import { bindAll } from 'lodash';

import TypesService from '@services/types.service';
import GAService from '@services/ga.service';

import ProgressBottom from '@general/navs/progress-bottom';
import OnboardingNavigation from '@general/navs/onboarding-navigation';
import { AppContext } from '@contexts/app.context';

import Header from '@components/general/headers/header';
import { Chip, Container } from '@material-ui/core';

class SymptomsPage extends Component {
  static contextType = AppContext;
  state = {
    symptomObj: {},
    symptoms: [],
  };

  constructor() {
    super();
    bindAll(this, ['componentDidMount', 'getSymptoms', 'handleChange', 'deselectAll', 'checkForSelection']);
    this.typesService = TypesService.getInstance();
    this.gaService = GAService.getInstance();
    this.gaService.setScreenName('symptoms');
  }

  componentDidMount() {
    this.getSymptoms();
  }

  async getSymptoms() {
    this.setState({ loading: true });
    const { appState, setAppState } = this.context;
    const symptoms = await this.typesService.getSymptoms(true).catch((error) => {
      this.setState({ loading: false });
    });
    this.setState({ symptoms });
    this.setState({ loading: false });

    // save to global state for later usage
    setAppState({
      ...appState,
      profile: {
        ...appState.profile,
        options: {
          ...appState.profile.options,
          symptoms,
        },
      },
    });
  }

  handleChange(event) {
    const { appState, setAppState } = this.context;
    const { symptoms } = this.state;
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

    setAppState({
      ...appState,
      profile: {
        ...appState.profile,
        options: {
          ...appState.profile.options,
          symptoms,
        },
      },
    });
  }

  deselectAll() {
    const { symptoms } = this.state;
    symptoms.map((symptom) => {
      if (symptom.id !== 'no') {
        symptom.isActive = false;
      } else {
        symptom.isActive = true;
      }
      return true;
    });
    this.setState({ symptoms });
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
      <div className="symptoms onboarding-page">
        <Header enableBackBtn={true}>
          <h1>Symptoms</h1>
          <h2>Per the CDC, certain symptoms impact test location availability.</h2>
        </Header>
        <Container className="onboarding-body">
          <Container maxWidth="md">
            <label className="label">
              Select one <span>(Required)</span>
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
          </Container>
          <OnboardingNavigation
            forwardRoute={'/sign-up'}
            forwardDisabled={!this.state.isSelected}
            triggerTooltip={!this.state.isSelected}
            tooltipMessage={'Please make a selection'}
          ></OnboardingNavigation>
        </Container>
        <ProgressBottom progress="40%"></ProgressBottom>
      </div>
    );
  }
}

export default SymptomsPage;
