import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { Formik, Form } from "formik";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MuiPhoneNumber from "material-ui-phone-number";
import Button from "@material-ui/core/Button";

const styles = {};
class PhoneNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultValues: {
        phone: ""
      }
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
        onSubmit={values => {
          this.props.onSubmit(values);
        }}
        validateOnBlur
        validate={values => {
          const errors = {};
          return errors;
        }}
        render={() => (
          <Form>
            <MuiPhoneNumber
              name="phone"
              label="Phone Number"
              data-cy="user-phone"
              defaultCountry={"us"}
              value={this.state.phone}
              onChange={this.handlePhoneChange}
              className="hide-desktop"
              style={{ margin: "80px 0" }}
            />
            <MuiPhoneNumber
              name="phone"
              label="Phone Number"
              data-cy="user-phone"
              defaultCountry={"us"}
              value={this.state.phone}
              onChange={this.handlePhoneChange}
              className="input-white-back-phone hide-mobile"
              style={{ margin: "80px 0" }}
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
  onSubmit: PropTypes.func.isRequired
};
export default withStyles(styles)(PhoneNumber);
