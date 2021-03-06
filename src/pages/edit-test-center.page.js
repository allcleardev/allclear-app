import React, { Component } from 'react';
import { bindAll, cloneDeep } from 'lodash';
import styled from 'styled-components'; 

import FacilityService from '@services/facility.service.js';

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

export default class EditTestCenterPage extends Component {
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
    this.facilityService = FacilityService.getInstance();
    this.state = cloneDeep(this.initialState);  
    this.id = props.match.params.id;
  }

  async componentDidMount() {  

    try {
      const testCenterTypes = await this.typesService.getFacilities(); 
      const testCenterDetails = await this.facilityService.getFacility(this.id);

      if (testCenterTypes?.length) {
        this.setState({ testCenterTypes });
      }   

      let allTestTypes = [];
      if(testCenterDetails.data.testTypes) { 
        testCenterDetails.data.testTypes.map((testType) => {
          allTestTypes.push({id: testType.id});
        });
      }

      this.setState((prevState) => {
        const offeringsArr = prevState.offerings.map((item, j) => {
          if(allTestTypes.some((e) => e.id === item.key) || testCenterDetails.data[item.key]){
            item.value= true;
          }
          return item;
        });

        const screeningArr = prevState.screening.map((item, j) => { 
          if(testCenterDetails.data[item.key]){
            item.value=true;
          }
          return item;
        });
        return { 
          ...prevState, 
          postData: {  
            id: this.id,
            name: testCenterDetails.data.name,
            address: testCenterDetails.data.address,
            driveThru: testCenterDetails.data.driveThru,
            telescreeningAvailable: testCenterDetails.data.telescreeningAvailable,
            freeOrLowCost: testCenterDetails.data.freeOrLowCost,
            acceptsInsurance: testCenterDetails.data.acceptsInsurance,
            governmentIdRequired: testCenterDetails.data.governmentIdRequired,
            referralRequired: testCenterDetails.data.referralRequired,
            firstResponderFriendly: testCenterDetails.data.firstResponderFriendly, 
            canDonatePlasma: testCenterDetails.data.canDonatePlasma,
            appointmentRequired: testCenterDetails.data.appointmentRequired,
            notes: '',
            gotTested: undefined,
            type: testCenterDetails.data.typeId ? { id: testCenterDetails.data.typeId } : { id: 'none' },
            testTypes: allTestTypes,
            minimumAge: testCenterDetails.data.minimumAge ? '18' : undefined,
          },
          offerings: offeringsArr, 
          screening: screeningArr
        };
      });
    } catch(err) { 
      // display error if test center id is invalid
      this.setState({ 
        ...this.initialState, 
        snackbarMessage: 'Test Center does not exist.',
        snackbarSeverity: 'error',
        snackbarOpen: true,
      });
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
        this.props.history.push(`/map/selection=${this.id}`);
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
      const response = await this.facilitateService.changeFacilityByCitizen({ value: this.state.postData });
      if (response.error) {
        this.setState({
          snackbarMessage: 'An error occured. Please try again later.',
          snackbarSeverity: 'error',
          snackbarOpen: true,
        });
      } else {
        this.setState((prevState) => ({
          ...prevState,
          snackbarMessage: 'Success! The edited Test Center has been submitted',
          snackbarSeverity: 'success',
          snackbarOpen: true,
        }));
      }
    }
  }

  handleSnackbarClose() {
    this.setState({ snackbarOpen: false });

    // return to map if test center is invalid
    if(this.state.snackbarMessage === 'Test Center does not exist.'){
      this.onCancelClicked();
    }
  }

  onChange(item, value) {
    this.setState({ postData: { ...this.state.postData, [item]: value } });
  }

  render() {
    return (
      <>
        <Section className="add-test-center-page">
          <TestCenterUpdate 
            title={'Edit Existing Test Center'} 
            content={
              `Edit the following form to update a test center within AllClear. All submissions will be reviewed
              by the AllClear team within 24 hours.`
            }
            state={this.state}
            onCheckboxSelected={(option) => this.onCheckboxSelected.bind(this, option)}
            handleSnackbarClose={() => this.handleSnackbarClose}
            handleSubmit={(e) => this.handleSubmit(e)}
            onCancelClicked={() => this.onCancelClicked}
            onChange={(item, value) => this.onChange(item, value)}
          />
        </Section>
      </>
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
