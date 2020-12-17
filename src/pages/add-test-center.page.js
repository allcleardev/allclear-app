import React, { Component } from 'react';
import { bindAll, cloneDeep } from 'lodash';
import styled from 'styled-components';

import { AppContext } from '@contexts/app.context';
import {
  GOT_TESTED_OPTIONS,
  OFFERINGS,
  SCREENING_METHODS,
  POST_DATA_STATE,
} from '@constants/add-test-center.constants';
import TypesService from '@services/types.service.js';
import FacilitateService from '@services/facilitate.service.js';

import TestCenterUpdate from '@components/general/test-center-update';

export default class AddTestCenterPage extends Component {
  static contextType = AppContext;

  initialState = {
    postData: POST_DATA_STATE,
    gotTested: GOT_TESTED_OPTIONS,
    offerings: OFFERINGS,
    screening: SCREENING_METHODS,
    snackbarOpen: false,
    snackbarSeverity: '',
    snackbarMessage: '',
  };

  constructor(props) {
    super(props);
    bindAll(this, ['onCheckboxSelected', 'onCancelClicked', 'handleSubmit', 'handleSnackbarClose']);
    this.typesService = TypesService.getInstance();
    this.facilitateService = FacilitateService.getInstance();
    this.state = cloneDeep(this.initialState);
  }

  async componentDidMount() {
    const testCenterTypes = await this.typesService.getFacilities();
    if (testCenterTypes?.length) {
      this.setState({ testCenterTypes });
    }
  }

  onCheckboxSelected(selected) {
    selected.value = !selected.value;

    if (selected.key === 'ii' || selected.key === 'rp') {
      if (selected.value) {
        // add to testTypes array
        this.setState((prevState) => ({
          postData: {
            ...prevState.postData,
            testTypes: [...prevState.postData.testTypes, { id: selected.key }],
          },
        }));
      } else {
        // remove from testTypes array
        this.setState((prevState) => ({
          postData: {
            ...prevState.postData,
            testTypes: prevState.postData.testTypes.filter((key) => key.id !== selected.key),
          },
        }));
      }
    } else if (selected.key === 'minimumAge') {
      if (selected.value) {
        // converting minimumAge boolean to actual minimum age value
        this.setState((prevState) => ({
          postData: { ...prevState.postData, [selected.key]: 18 },
        }));
      } else {
        this.setState((prevState) => ({
          postData: { ...prevState.postData, [selected.key]: undefined },
        }));
      }
    } else {
      this.setState((prevState) => ({
        postData: { ...prevState.postData, [selected.key]: selected.value },
      }));
    }
  }

  onCancelClicked() {
    this.setState(cloneDeep(this.initialState), () => {
      if (this.props.history.length > 2) {
        // if history is not empty, go back:
        this.props.history.goBack();
      } else {
        // else go to Map page
        this.props.history.push('/map');
      }
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (!this.state.postData.name || !this.state.postData.address) {
      this.setState({
        snackbarMessage: 'Please complete required fields',
        snackbarSeverity: 'error',
        snackbarOpen: true,
      });
    } else {
      const response = await this.facilitateService.addFacilityByCitizen({ value: this.state.postData });
      if (response.error) {
        this.setState({
          snackbarMessage: 'An error occured. Please try again later.',
          snackbarSeverity: 'error',
          snackbarOpen: true,
        });
      } else {
        this.setState({
          ...cloneDeep(this.initialState),
          snackbarMessage: 'Success! New Test Center has been submitted',
          snackbarSeverity: 'success',
          snackbarOpen: true,
        });
      }
    }
  }

  handleSnackbarClose() {
    this.setState({ snackbarOpen: false });
  }

  render() {
    return (
        <Section className="add-test-center-page">
          <TestCenterUpdate
            title={'Submit New Test Center'}
            content={
              `Complete the following form to propose a new test center within AllClear. All submissions will be reviewed
              by the AllClear team within 24 hours.`
            }
            state={this.state}
            onCheckboxSelected={(option) => this.onCheckboxSelected.bind(this, option)}
            handleSnackbarClose={() => this.handleSnackbarClose}
            handleSubmit={(e) => this.handleSubmit(e)}
            onCancelClicked={() => this.onCancelClicked}
            onNameChange={(event) => this.setState({ postData: { ...this.state.postData, name: event.target.value } })}
            onAddressChange={(event) => this.setState({ postData: { ...this.state.postData, address: event.target.value } })}
            onNotesChange={(event) => this.setState({ postData: { ...this.state.postData, notes: event.target.value } })}
            onTypeChange={(event) => this.setState({ postData: { ...this.state.postData, type: { id: event.target.value },}, })}
            onGotTestedChange={(event, option) => this.setState({ postData: { ...this.state.postData, gotTested: option.value } })}
          />
        </Section>
    );
  }
}

const Section = styled.section`
  background: ${(props) => props.theme.palette.gradient.mobile};
  ${(props) => props.theme.breakpoints.up('md')} {
    background: ${(props) => props.theme.palette.gradient.desktop};
  }
  svg {
    color: #fff;
  }
`;
