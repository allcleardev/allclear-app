import React, { Component } from 'react';
import { bindAll } from 'lodash';
import * as queryString from 'query-string';

import Logo from '@assets/images/logo-white.svg';
import Header from '@general/headers/header';
import { AppContext } from '@contexts/app.context';

import SnackbarMessage from '@general/alerts/snackbar-message';
import { Button, Container, withStyles } from '@material-ui/core';

import GAService from '@services/ga.service';

const DefaultButton = withStyles((theme) => ({
  root: {
    padding: '12px 16px',
    fontWeight: '600',
    fontSize: '17px',
    borderRadius: '10px',
    minWidth: '100%',
    [theme.breakpoints.up('md')]: {
      minWidth: '248px',
    },
  },
  contained: {
    backgroundColor: '#fff',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: '#e1efff',
    },
  },
}))(Button);

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
      const snackbarMessage = queryParams.logout === 'true' ? this.state.snackbarMessage : queryParams.logout;
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
          severity={'info'}
          duration={4000}
        />

        <Header navItems={this.navItems}></Header>
        <Container className="content" maxWidth="md">
          <img src={Logo} alt="Logo" className="logo" />
          <div className="button-container">
            <DefaultButton className="signup" variant="contained" onClick={() => this.routeChange('/location')}>
              Get Started
            </DefaultButton>
            <DefaultButton className="signin" onClick={() => this.routeChange('/sign-in')}>
              Already Have an Account?
              <span className="cta">Log In</span>
            </DefaultButton>
          </div>
        </Container>
      </div>
    );
  }
}
