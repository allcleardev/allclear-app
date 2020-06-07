import React, { Component } from 'react';
import { bindAll } from 'lodash';
import styled from 'styled-components';

import PeopleService from '@services/people.service';
import FacilityService from '@services/facility.service.js';

import Header from '@components/general/headers/header';
import { AppContext } from '@contexts/app.context';

import { Container, TextField, Select, MenuItem, FormControl } from '@material-ui/core';

export default class AddTestCenterPage extends Component {
  static contextType = AppContext;
  state = {};

  constructor(props) {
    super(props);
    bindAll(this, []);
    this.peopleService = PeopleService.getInstance();
    this.facilityService = FacilityService.getInstance();
  }

  render() {
    return (
      <section className="add-test-center-page">
        <StyledHeader>
          <h1>Submit New Test Center</h1>
          <h2>
            Complete the following form to propose a new test center within AllClear. All submissions will be reviewed
            by the AllClear team within 24 hours.
          </h2>
        </StyledHeader>

        <Container maxWidth="sm">
          <FormHeading>Test Center Profile</FormHeading>
          <Form noValidate autoComplete="off">
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
              placeholder="Test Center Address (or locadtion description if address is unavailable)*"
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
          </Form>
        </Container>
      </section>
    );
  }
}

const StyledHeader = styled(Header)`
  .color-block {
    height: 100vh;
  }
`;

const FormHeading = styled.h3`
  margin-bottom: 20px;
  font-size: 24px;
  color: #fff;
`;

const Form = styled.form`
  > * {
    width: 100%;
    margin-bottom: 20px;
  }
`;
