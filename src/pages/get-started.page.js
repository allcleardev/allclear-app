import React, { Component } from 'react';
import { bindAll } from 'lodash';

import { AppContext } from '@contexts/app.context';
import Logo from '@assets/images/logo-white.svg';

import Header from '@general/headers/header';

import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import * as queryString from 'query-string';
import SnackbarMessage from '@general/alerts/snackbar-message';

import GAService from '@services/ga.service';

export default class GetStartedPage extends Component {
  static contextType = AppContext;
  state = {};

  constructor() {
    super();

    this.gaService = GAService.getInstance();
    this.gaService.setScreenName('get-started');

    this.state = {
      isSnackbarOpen: false,
      snackbarMessage: 'You must be logged in to use this feature.',
    };
    this.navItems = [
      { route: 'home.allclear.app', name: 'Home', absolutePath: true },
      { route: '/map', name: 'Map', absolutePath: false },
      { route: 'about.allclear.app', name: 'Help', absolutePath: true },
    ];

    bindAll(this, ['routeChange', 'handleSnackbarClose']);
  }

  componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);

    if (queryParams.logout) {
      const snackbarMessage = (queryParams.logout === 'true') ? this.state.snackbarMessage : queryParams.logout;
      this.setState({
        snackbarMessage,
        isSnackbarOpen: true,
      });
    }
  }

  handleSnackbarClose() {
    this.setState({
      isSnackbarOpen: false,
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
          message={this.state.snackbarMessage}
          duration={4000}
        />

        <Header navItems={this.navItems}></Header>
        <Container className="content" maxWidth="md">
          <img src={Logo} alt="Logo" className="logo" />
          <div className="button-container">
            <Button className="signup" variant="contained" onClick={() => this.routeChange('/location')}>
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
