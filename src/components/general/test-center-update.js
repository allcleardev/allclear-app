import React from 'react';
import styled from 'styled-components';  

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

import Header from '@general/headers/header';
import PrimaryButton from '@general/buttons/primary-button';
import SnackbarMessage from '@general/alerts/snackbar-message';

export default function TestCenterUpdate(props) {

    return ( 
        <>
            <StyledHeader>
                <h1>{props.title}</h1>
                <h2>{props.content}</h2> 
            </StyledHeader>
            <Container maxWidth="sm">
              <form noValidate autoComplete="off" onSubmit={props.handleSubmit}> 
              <Article>
                <H3>Test Center Profile</H3>
                <TextField
                  required
                  id="test-center-name"
                  className="input"
                  variant="outlined"
                  placeholder="Test Center Name*"
                  helperText="*Required"
                  value={props.state.postData.name}
                  onChange={(event) => props.onNameChange(event)}
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
                  value={props.state.postData.address}
                  onChange={(event) => props.onAddressChange(event)}
                />
                <FormControl variant="outlined" className="input">
                  <Select
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    value={props.state.postData.type.id}
                    style={{ color: '#fff' }}
                    onChange={(event) => props.onTypeChange(event)}
                  >
                    <MenuItem value="none" disabled>
                      Select Test Center Type
                    </MenuItem>
                    {props.state.testCenterTypes &&
                      props.state.testCenterTypes.map((type) => (
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
                  value={props.state.postData.notes}
                  onChange={(event) => props.onNotesChange(event)}
                />
                <FormControl component="fieldset" style={{ marginTop: 20 }}>
                  <H4>Were you able to get tested at this location?</H4>
                  <RadioGroup
                    aria-label="testedStatus"
                    name="testedStatus"
                    defaultValue={props.state.postData.gotTested}
                  >
                    {props.state.gotTested.map((option) => (
                      <FormControlLabel
                        key={option.key}
                        value={option.key}
                        control={<StyledRadio />}
                        label={option.displayName}
                        onChange={(event) => props.onGotTestedChange(event, option)}
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
                    {props.state.offerings.map((option, index) => (
                      // TODO: Make checkbox partial
                      <Checkbox
                        key={option.key}
                        className={option.value && 'checked'}
                        onClick={props.onCheckboxSelected(option)}
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
                    {props.state.screening.map((option, index) => (
                      // TODO: Make checkbox partial
                      <Checkbox
                        key={option.key}
                        className={option.value && 'checked'}
                        onClick={props.onCheckboxSelected(option)}
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
                <CancelButton onClick={props.onCancelClicked()}>Cancel</CancelButton>
                <SubmitButton color="primary" type="submit">
                  Submit Test Center
                </SubmitButton>
              </ButtonContainer>
              </form>
            </Container>
            <SnackbarMessage
                isOpen={props.state.snackbarOpen}
                severity={props.state.snackbarSeverity}
                message={props.state.snackbarMessage}
                onClose={props.handleSnackbarClose()}
            /> 
        </>
    );
}

const StyledHeader = styled(Header)`
  .color-block {
    display: none;
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

const StyledRadio = styled(Radio)`
  color: #fff;
  &.Mui-checked {
    color: #fff;
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