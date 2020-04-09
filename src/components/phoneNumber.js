import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import MuiPhoneNumber from 'material-ui-phone-number';

const styles = {};
class PhoneNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultValues: {
        phone: '',
      },
    };

    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }
  handlePhoneChange(value) {
    if (value) {
      this.setState({ phone: value });
      sessionStorage.setItem('phone', `+1 ${value}`);
    }
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
        initialValues={this.state.defaultValues}
        onSubmit={(values) => {
          debugger;
          this.props.onSubmit(values);
        }}
        validateOnBlur
        validate={(values) => {
          const errors = {};
          return errors;
        }}
        render={() => (
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
      />
    );
  }
}
export default withStyles(styles)(PhoneNumber);
