import React, { Component } from 'react';
import { bindAll } from 'lodash';

import { AppContext } from '../contexts/app.context';
import Logo from '../assets/images/logo-green-back.svg';

import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import * as queryString from 'query-string';
import SnackbarMessage from '@general/alerts/snackbar-message';

export default class GetStartedPage extends Component {
  static contextType = AppContext;
  state = {};

  constructor() {
    super();
    this.state = {
      isSnackbarOpen: false,
    };

    bindAll(this, [
      'routeChange',
      'handleSnackbarClose',
    ]);
  }

  componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);

    if (queryParams.logout) {
      this.setState({
        isSnackbarOpen: true
      });
    }
  }

  handleSnackbarClose() {
    this.setState({
      isSnackbarOpen: false
    });
  }

  routeChange(route) {
    this.props.history.push(route);
  }


  render() {
    return (
      <div className="get-started-page">
        <SnackbarMessage
          isOpen={this.state.isSnackbarOpen}
          onClose={this.handleSnackbarClose}
          message={'You must be logged in to use this feature.'}
          duration={4000}
        />

        <Container className="content" maxWidth="md">
          <img src={Logo} alt="Logo" className="logo" />
          <div className="button-container">
            <Button className="signup" variant="contained" onClick={() => this.routeChange('/background')}>
              Get Started
            </Button>
            <Button className="signin" onClick={() => this.routeChange('/sign-in')}>
              Already Have an Account?
              <span className="cta">Log In</span>
            </Button>
          </div>
        </Container>
      </div>
    );
  }
}
