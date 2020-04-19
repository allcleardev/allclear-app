import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import Form from '@material-ui/core/Container';

import { Button, Grid } from '@material-ui/core';

import RoundHeader from '../components/general/headers/header-round';
import PhoneNumberInput from '../components/general/inputs/phone-number-input';
import LinearProgress from '@material-ui/core/LinearProgress';

import { AppContext } from '@contexts/app.context';
import PeopleService from '@services/people.service';
import {bindAll} from 'lodash';

export default class SignInPage extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      phone: undefined,
      loading: false,
      error: false,
      message: undefined,
      isSnackbarOpen: false,
    };

    this.peopleService = PeopleService.getInstance();

    bindAll(this, [
      'verifyLogin',
      'handleChange'
    ]);
  }

  //eslint-disable-next-line
  handleChange (event) {
    this.setState({ ...this.state, [event.target.name]: event.target.checked });
  };

  //eslint-disable-next-line
  async verifyLogin() {
    const { appState } = this.context;
    const phone = appState.person.phone;

    this.setState({ loading: true });

    if (!phone) {
      this.setState({ loading: false });
      return;
    }

    const response = await this.peopleService.login({phone});

    if (!response.err) {
      this.props.history.push('/sign-in-verification');
    } else {
      const error = response;

      if (error && error.response) {
        if (error.response.data && error.response.data.message) {
          this.setState({
            error: true,
            message: error.response.data.message,
            loading: false,
          });
        } else {
          this.setState({
            error: true,
            message: 'An error occurred. Please try again later.',
            loading: false,
          });
        }
      }
    }
  }

  render() {
    return (
      <div className="background-responsive">
        <div className="login onboarding-page">
          <RoundHeader>
            <h1 className="heading">Phone Number</h1>
            <h2 className="sub-heading">Enter your phone number to access your account.</h2>
          </RoundHeader>
          {this.state.loading === false ? (
            <Form noValidate autoComplete="off" className="onboarding-body">
              <div className="content-container">
                <PhoneNumberInput onSubmit={() => this.verifyLogin()} className="hide-mobile"></PhoneNumberInput>
                <Link to="/sign-up" className="hide-mobile login">
                  Create Account
                </Link>
                {this.state.error === true ? <p className="error">{this.state.message}</p> : ''}
              </div>

              <div className="button-container">
                <Link to="/background" className="hide-desktop login">
                  Create Account
                </Link>
                <Button onClick={() => this.verifyLogin()} variant="contained" color="primary" className="next">
                  Send Verification Code
                </Button>
              </div>
            </Form>
          ) : (
            <Grid container justify="center">
              <Grid item xs={12} sm={6}>
                <LinearProgress color="primary" value={50} variant="indeterminate"/>
              </Grid>
            </Grid>
          )}
        </div>
      </div>
    );
  }
}
