import React, { Component } from 'react';

import MuiPhoneNumber from 'material-ui-phone-number';
import { withStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';

const styles = {};
class PhoneNumber extends Component {
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
    if (this.state.isPhoneValid) {
      sessionStorage.setItem('phone', `+1 ${value}`);
    } else {
      sessionStorage.setItem('phone', '');
    }
    this.props.phoneValidation(this.state.isPhoneValid);
  }

  onKeyDown(evt) {
    // todo: for enter key
    // if(evt.key === 'Enter'){
    //   debugger;
    //   this.props.onSubmit(this.state.phone);
    // }
  }
  render() {
    return (
      <Formik
        initialValues={this.state.phone}
        onSubmit={(values) => {
          debugger;
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
              placeholder="(555) 123-4567"
              type="tel"
              variant="outlined"
              autoComplete="phone"
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
export default withStyles(styles)(PhoneNumber);
