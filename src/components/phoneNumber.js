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
  }
  handlePhoneChange(value) {
    if (value) {
      this.setState({ phone: value });
      sessionStorage.setItem('phone', `+1 ${value}`);
    }
  }
  render() {
    return (
      <Formik
        initialValues={this.state.defaultValues}
        onSubmit={(values) => {
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
            />
          </Form>
        )}
      />
    );
  }
}
export default withStyles(styles)(PhoneNumber);
