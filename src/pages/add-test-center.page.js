import React, { Component } from 'react';
import { bindAll } from 'lodash';
import styled from 'styled-components';

import {
  Container,
  TextField,
  MenuItem,
  Select,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  FormControl,
} from '@material-ui/core';

import { AppContext } from '@contexts/app.context';
import { LOCATION_PROFILE_RADIO_OPTIONS, OFFERINGS, SCREENING_METHODS } from '@constants/add-test-center.constants';
import Header from '@components/general/headers/header';
import PrimaryButton from '@components/general/buttons/primary-button';
import PeopleService from '@services/people.service';
import FacilityService from '@services/facility.service.js';

export default class AddTestCenterPage extends Component {
  static contextType = AppContext;
  state = {};

  constructor(props) {
    super(props);
    bindAll(this, ['handleSubmit']);
    this.peopleService = PeopleService.getInstance();
    this.facilityService = FacilityService.getInstance();
  }

  handleChange(option, index) {
    console.log('option', option);
    console.log('CHANGE:', index);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit', e);
  };

  render() {
    return (
      <Section className="add-test-center-page">
        <StyledHeader>
          <h1>Submit New Test Center</h1>
          <h2>
            Complete the following form to propose a new test center within AllClear. All submissions will be reviewed
            by the AllClear team within 24 hours.
          </h2>
        </StyledHeader>

        <Container maxWidth="sm">
          <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
            <Article>
              <H3>Test Center Profile</H3>
              <TextField
                id="test-center-name"
                className="input"
                variant="outlined"
                placeholder="Test Center Name*"
                helperText="*Required"
                required
              />

              <TextField
                id="test-center-address"
                className="input"
                variant="outlined"
                placeholder="Test Center Address (or test center description if address is unavailable)*"
                helperText="*Required"
                rows={4}
                multiline
                required
              />

              <FormControl variant="outlined" className="input">
                <Select
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  // value={10}
                  // onChange={handleChange}
                >
                  <MenuItem value="" disabled>
                    Test Center Type
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>

              <TextField
                id="test-center-notes"
                className="input"
                variant="outlined"
                placeholder="Test Center Additional Notes (email, phone number, website, etc.)"
                rows={4}
                multiline
              />

              <FormControl component="fieldset" style={{ marginTop: 20 }}>
                <H4>Were you able to get tested at this location?</H4>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  // value={value}
                  // onChange={handleChange}
                >
                  {LOCATION_PROFILE_RADIO_OPTIONS.map((option) => (
                    <FormControlLabel
                      key={option.key}
                      value={option.key}
                      control={<StyledRadio />}
                      label={option.displayName}
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
                  {OFFERINGS.map((option, index) => (
                    <Checkbox key={option.key}>
                      <img src={option.icon} alt={`Select ${option.displayName}`} style={{ margin: 'auto' }} />
                      <label htmlFor={option.key}>{option.displayName}</label>
                      <input
                        type="checkbox"
                        id={option.key}
                        checked={option.value}
                        onChange={this.handleChange.bind(this, option, index)}
                        hidden
                      ></input>
                    </Checkbox>
                  ))}
                </Checkboxes>
              </div>
              <div>
                <H4>Select all screening methods used at this test center:</H4>
                <Checkboxes>
                  {SCREENING_METHODS.map((option, index) => (
                    <Checkbox key={option.key} checked={this.state.checked}>
                      <img src={option.icon} alt={`Select ${option.displayName}`} style={{ margin: 'auto' }} />
                      <label htmlFor={option.key}>{option.displayName}</label>
                      <input
                        type="checkbox"
                        id={option.key}
                        checked={option.value}
                        onChange={this.handleChange.bind(this, option, index)}
                        hidden
                      ></input>
                    </Checkbox>
                  ))}
                </Checkboxes>
              </div>
            </Article>
            <ButtonContainer>
              <CancelButton>Cancel</CancelButton>
              <SubmitButton color="primary" type="submit">
                Submit Test Center
              </SubmitButton>
            </ButtonContainer>
          </form>
        </Container>
      </Section>
    );
  }
}

const Section = styled.section`
  background: ${(props) => props.theme.palette.gradient.mobile};
  ${(props) => props.theme.breakpoints.up('md')} {
    background: ${(props) => props.theme.palette.gradient.desktop};
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
  height: 122.78px;
  text-align: center;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.5);
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
`;
