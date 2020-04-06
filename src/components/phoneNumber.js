import React from 'react';
import PropTypes from 'prop-types';

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
      sessionStorage.setItem('phone', value);
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
              className="phone-input"
              name="phone"
              label="Phone Number"
              data-cy="user-phone"
              defaultCountry={'us'}
              value={this.state.phone}
              onChange={this.handlePhoneChange}
            />
          </Form>
        )}
      />
    );
  }
}
PhoneNumber.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
export default withStyles(styles)(PhoneNumber);
