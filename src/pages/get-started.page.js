import React, { Component } from 'react';
import { bindAll } from 'lodash';

import { AppContext } from '../contexts/app.context';
import Logo from '../assets/images/logo-green-back.svg';
import Header from '../components/general/headers/header';

import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import * as queryString from 'query-string';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

function SlideTransition(props) {
  return <Slide {...props} direction="up"/>;
}

export default class GetStartedPage extends Component {
  static contextType = AppContext;
  state = {};

  constructor() {
    super();
    this.state = {
      isSnackbarOpen: false,
    };
    this.navItems = [
      { route: 'about.allclear.app', name: 'About Us', absolutePath: true },
      { route: 'about.allclear.app', name: 'Help', absolutePath: true },
    ];

    bindAll(this, [
      'routeChange',
      'handleSnackbarClose',
    ]);
  }

  componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);

    if (queryParams.logout) {
      this.setState({
        isSnackbarOpen: true,
      });
    }
  }

  routeChange(route) {
    this.props.history.push(route);
  }

  handleSnackbarClose() {
    this.setState({
      isSnackbarOpen: false
    });
  }


  render() {
    return (
      <div className="get-started-page">
        <Snackbar
          open={this.state.isSnackbarOpen}
          TransitionComponent={SlideTransition}
          autoHideDuration={4000}
          onClose={this.handleSnackbarClose}
          className={'snackbar__error'}
        >
          <Alert onClose={this.handleSnackbarClose} severity="error">
            You must be logged in to use this feature.
          </Alert>
        </Snackbar>
        <Header navItems={this.navItems}></Header>
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
