import React, { Component } from 'react';

import Header from '@general/headers/header';
import { CircularProgress } from '@material-ui/core';
import { Container } from '@material-ui/core';

import { bindAll } from 'lodash';

import PeopleService from '@services/people.service';
import { AppContext } from '@contexts/app.context';
import GAService from '@services/ga.service';
import { getRouteQueryParams } from '@util/general.helpers';

export default class LoginMagicLinkPage extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.gaService = GAService.getInstance();
    this.gaService.setScreenName('login-magic-link');

    this.peopleService = PeopleService.getInstance();

    //eslint-disable-next-line
    this.state = {
      checkedB: true,
      loading: false,
      error: false,
    };

    bindAll(this, ['verifyMagicLink']);
  }

  componentDidMount() {
    this.verifyMagicLink();
  }

  // Function to make call backend service to confirm the magic link
  async verifyMagicLink() {
    const { appState, setAppState } = this.context;
    let searchParams = getRouteQueryParams(this.props.location);

    const response = await this.peopleService.verifyAuthRequest({
      phone: searchParams.phone,
      token: searchParams.token,
    });

    if (!response.err) {
      setAppState({
        ...appState,
        sessionId: response.data.id,
        person: response.data.person,
      });

      localStorage.setItem('sessionId', response.data.id);
      localStorage.setItem('session', JSON.stringify(response.data));

      this.props.history.push('/map');
    } else {
      const error = response;

      this.setState({
        error: true,
        message: error.response.data.message,
        loading: false,
      });
    }
  }

  render() {
    return (
      <div className="sign-up onboarding-page">
        <Header enableBackBtn={true}>
          <h1>Verifying Phone Number</h1>
          <h2>
            We are verifying your phone number.
            <br />
            After verifying it, you will advance to complete your profile.
          </h2>
        </Header>

        <Container className="onboarding-body">
          {this.state.error ? (
            <p className="error">{this.state.message}</p>
          ) : (
            <CircularProgress color="primary" size={108} />
          )}
        </Container>
      </div>
    );
  }
}
