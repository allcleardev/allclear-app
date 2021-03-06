import React, { Component } from 'react';

import MuiPhoneNumber from 'material-ui-phone-number';
import { withStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';

import { AppContext } from '@contexts/app.context';

const styles = {};
class PhoneNumberInput extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      isPhoneValid: false,
    };

    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  async handlePhoneChange(value) {
    if (value) {
      const phoneNumber = value.replace(/\D/g, '');
      if (phoneNumber.length === 10) {
        await this.setState({ isPhoneValid: true, phone: value }); // needed await to update State in time
      } else {
        await this.setState({ isPhoneValid: false, phone: value }); // needed await to update State in time
      }
    } else {
      await this.setState({ isPhoneValid: false, phone: '' }); // needed await to update State in time
    }
    this.handleValidation(value);
  }

  handleValidation(value) {
    const { appState, setAppState } = this.context;

    let phone = null;

    if (this.state.isPhoneValid) {
      phone = `+1 ${value}`;
    }
    setAppState({
      ...appState,
      person: {
        ...appState.person,
        phone
      },
    });

    this.props.phoneValidation && this.props.phoneValidation(this.state.isPhoneValid);
  }

  onKeyDown(evt) {
    // todo: for enter key, investigate
    if(evt.key === 'Enter'){
      //this.props.onSubmit(this.state.phone);
    }
  }
  render() {
    return (
      <Formik
        initialValues={this.state.phone}
        onSubmit={(values) => {
          this.props.onSubmit(values);
        }}
        validateOnBlur
        validate={(values) => {
          const errors = {};
          return errors;
        }}
      >
        {(props) => (
          <Form>
            <MuiPhoneNumber
              className="input phone-input"
              name="phone"
              placeholder="Phone Number"
              type="tel"
              variant="outlined"
              autoComplete="tel"
              data-cy="user-phone"
              defaultCountry={'us'}
              onlyCountries={['us']}
              disableCountryCode={true}
              value={this.state.phone}
              onChange={this.handlePhoneChange}
              onKeyDown={this.onKeyDown}
            />
          </Form>
        )}
      </Formik>
    );
  }
}
export default withStyles(styles)(PhoneNumberInput);
