import React, { Component } from 'react';
import { bindAll, cloneDeep } from 'lodash';
import styled from 'styled-components'; 

import FacilityService from '@services/facility.service.js';

import {
  Container,
  TextField,
  MenuItem,
  Select,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
} from '@material-ui/core';

import { AppContext } from '@contexts/app.context';
import {
  GOT_TESTED_OPTIONS,
  OFFERINGS,
  SCREENING_METHODS,
  POST_DATA_STATE,
} from '@constants/add-test-center.constants';
import Header from '@general/headers/header';
import PrimaryButton from '@general/buttons/primary-button';
import SnackbarMessage from '@general/alerts/snackbar-message';
import TypesService from '@services/types.service.js';
import FacilitateService from '@services/facilitate.service.js';

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
          if(allTestTypes.some((e) => e.id === item.key)){
            item.value= true;
          } else if(testCenterDetails.data.driveThru && item.key==='driveThru'){ 
            item.value=true;
          } else if(testCenterDetails.data.freeOrLowCost && item.key==='freeOrLowCost'){ 
            item.value=true;
          } else if(testCenterDetails.data.teleScreeningAvailable && item.key==='teleScreeningAvailable'){ 
            item.value=true;
          } else if(testCenterDetails.data.canDonatePlasma && item.key==='canDonatePlasma'){ 
            item.value=true;
          } 
          return item;
        });

        const screeningArr = prevState.screening.map((item, j) => { 
          if(testCenterDetails.data.minimumAge && item.key==='minimumAge'){ 
            item.value=true;
          } else if(testCenterDetails.data.appointmentRequired && item.key==='appointmentRequired'){ 
            item.value=true;
          } else if(testCenterDetails.data.acceptsInsurance && item.key==='acceptsInsurance'){ 
            item.value=true;
          } else if(testCenterDetails.data.governmentIdRequired && item.key==='governmentIdRequired'){ 
            item.value=true;
          } else if(testCenterDetails.data.referralRequired && item.key==='referralRequired'){ 
            item.value=true;
          } else if(testCenterDetails.data.firstResponderFriendly && item.key==='firstResponderFriendly'){ 
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
            teleScreeningAvailable: testCenterDetails.data.teleScreeningAvailable,
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

  render() {
    return (
      <>
        <Section className="add-test-center-page">
          <StyledHeader>
            <h1>Edit Existing Test Center</h1>
            <h2>
              Edit the following form to update a test center within AllClear. All submissions will be reviewed
              by the AllClear team within 24 hours.
            </h2>
          </StyledHeader>
          <Container maxWidth="sm">
            <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
              <Article>
                <H3>Test Center Profile</H3>
                <TextField
                  required
                  id="test-center-name"
                  className="input"
                  variant="outlined"
                  placeholder="Test Center Name*"
                  helperText="*Required"
                  value={this.state.postData.name}
                  onChange={(event) =>
                    this.setState({ postData: { ...this.state.postData, name: event.target.value } })
                  }
                />
                <TextField
                  required
                  multiline
                  id="test-center-address"
                  className="input"
                  variant="outlined"
                  placeholder="Test Center Address (or test center description if address is unavailable)*"
                  helperText="*Required"
                  rows={4}
                  value={this.state.postData.address}
                  onChange={(event) =>
                    this.setState({ postData: { ...this.state.postData, address: event.target.value } })
                  }
                />
                <FormControl variant="outlined" className="input">
                  <Select
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    value={this.state.postData.type.id}
                    style={{ color: '#fff' }}
                    onChange={(event) =>
                      this.setState({
                        postData: {
                          ...this.state.postData,
                          type: { id: event.target.value },
                        },
                      })
                    }
                  >
                    <MenuItem value="none" disabled>
                      Select Test Center Type
                    </MenuItem>
                    {this.state.testCenterTypes &&
                      this.state.testCenterTypes.map((type) => (
                        <MenuItem value={type.id} key={type.id}>
                          {type.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <TextField
                  multiline
                  id="test-center-notes"
                  className="input"
                  variant="outlined"
                  placeholder="Test Center Additional Notes (email, phone number, website, etc.)"
                  rows={4}
                  value={this.state.postData.notes}
                  onChange={(event) =>
                    this.setState({ postData: { ...this.state.postData, notes: event.target.value } })
                  }
                />
                <FormControl component="fieldset" style={{ marginTop: 20 }}>
                  <H4>Were you able to get tested at this location?</H4>
                  <RadioGroup
                    aria-label="testedStatus"
                    name="testedStatus"
                    defaultValue={this.state.postData.gotTested}
                  >
                    {this.state.gotTested.map((option) => (
                      <FormControlLabel
                        key={option.key}
                        value={option.key}
                        control={<StyledRadio />}
                        label={option.displayName}
                        onChange={(event) =>
                          this.setState({ postData: { ...this.state.postData, gotTested: option.value } })
                        }
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Article>
              <Article>
                <H3>Test Center Offerings</H3>
                <div>
                  <H4>Select all offerings that exist at this test center:</H4>
                  <Checkboxes>
                    {this.state.offerings.map((option, index) => (
                      // TODO: Make checkbox partial
                      <Checkbox
                        key={option.key}
                        className={option.value && 'checked'}
                        onClick={this.onCheckboxSelected.bind(this, option)}
                      >
                        <img src={option.icon} alt={`Select ${option.displayName}`} style={{ margin: 'auto' }} />
                        <label>{option.displayName}</label>
                        <input readOnly hidden type="checkbox" id={option.key} checked={option.value}></input>
                      </Checkbox>
                    ))}
                  </Checkboxes>
                </div>
                <div>
                  <H4>Select all screening methods used at this test center:</H4>
                  <Checkboxes>
                    {this.state.screening.map((option, index) => (
                      // TODO: Make checkbox partial
                      <Checkbox
                        key={option.key}
                        className={option.value && 'checked'}
                        onClick={this.onCheckboxSelected.bind(this, option)}
                      >
                        <img src={option.icon} alt={`Select ${option.displayName}`} style={{ margin: 'auto' }} />
                        <label>{option.displayName}</label>
                        <input readOnly hidden type="checkbox" id={option.key} checked={option.value}></input>
                      </Checkbox>
                    ))}
                  </Checkboxes>
                </div>
              </Article>
              <ButtonContainer>
                <CancelButton onClick={this.onCancelClicked}>Cancel</CancelButton>
                <SubmitButton color="primary" type="submit">
                  Submit Test Center
                </SubmitButton>
              </ButtonContainer>
            </form>
          </Container>
        </Section>
        <SnackbarMessage
          isOpen={this.state.snackbarOpen}
          severity={this.state.snackbarSeverity}
          message={this.state.snackbarMessage}
          onClose={this.handleSnackbarClose}
        />
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

const H3 = styled.h3`
  margin-bottom: 20px;
  font-size: 24px;
`;

const H4 = styled.h4`
  margin-bottom: 20px;
  font-size: 16px;
`;

const StyledHeader = styled(Header)`
  .color-block {
    display: none;
  }
`;

const Article = styled.article`
  padding: 44px 0;
  color: #fff;

  &:first-child {
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  }

  > * {
    width: 100%;
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
`;

const Checkboxes = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(172px, 1fr));
  column-gap: 17px;
  row-gap: 17px;
  margin-bottom: 40px;
`;

const Checkbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 122.78px;
  text-align: center;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  transition: background-color ease 0.5s;
  cursor: pointer;

  * {
    cursor: inherit;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &.checked {
    border-color: ${(props) => props.theme.palette.secondary.main};
    background-color: ${(props) => props.theme.palette.secondary.main};
  }
`;

const StyledRadio = styled(Radio)`
  color: #fff;
  &.Mui-checked {
    color: #fff;
  }
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  column-gap: 32px;
  row-gap: 32px;
  margin-bottom: 61px;

  button {
    font-size: 17px;
  }
`;

const CancelButton = styled(PrimaryButton)`
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
`;

const SubmitButton = styled(PrimaryButton)`
  color: ${(props) => props.theme.palette.primary.main};
  background-color: #fff;

  &:hover {
    background-color: #e1efff;
  }
`;
