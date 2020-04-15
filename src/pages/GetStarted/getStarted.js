import React, { Component } from 'react';
import { bindAll } from 'lodash';

import { AppContext } from '../../contexts/App.context';
import Logo from '../../assets/images/logo-green-back.svg';

import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';

export default class GetStarted extends Component {
  static contextType = AppContext;
  state = {};

  constructor() {
    super();

    bindAll(this, []);
  }

  routeChange(route) {
    this.props.history.push(route);
  }

  render() {
    return (
      <div className="get-started-page">
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
