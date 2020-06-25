import React, {Component} from 'react';

import Header from '@general/headers/header';
import {CircularProgress} from '@material-ui/core';
import {Container} from '@material-ui/core';

import {bindAll} from 'lodash';

import PeopleService from '@services/people.service';
import {AppContext} from '@contexts/app.context';
import GAService from '@services/ga.service';
import {getRouteQueryParams} from '@util/general.helpers';
import SnackbarMessage from '@general/alerts/snackbar-message';

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

    bindAll(this, ['verifyMagicLink', 'handleSnackbarClose']);
  }

  componentDidMount() {
    this.verifyMagicLink();
  }

  // Function to make call backend service to confirm the magic link
  async verifyMagicLink() {
    const {appState, setAppState} = this.context;
    let {phone, token, lastAlertedAt} = getRouteQueryParams(this.props.location);

    const response = await this.peopleService.verifyAuthRequest({
      phone,
      token,
    });

    if (!response.err) {
      setAppState({
        ...appState,
        sessionId: response.data.id,
        person: response.data.person,
      });

      localStorage.setItem('sessionId', response.data.id);
      localStorage.setItem('session', JSON.stringify(response.data));

      // if coming from alert, maintain lastAlertedAt
      const mapRoute = (lastAlertedAt) ? `/map?lastAlertedAt=${lastAlertedAt}` : '/map';
      this.props.history.push(mapRoute);

    } else {
      const error = response;

      this.setState({
        error: true,
        message: error.response.data.message,
        loading: false,
      });
    }
  }

  handleSnackbarClose() {
    this.setState({
      error: false,
    });
  }


  render() {
    return (
      <div className="sign-up onboarding-page">
        <Header enableBackBtn={true}>
          <h1>Verifying Phone Number</h1>
          <h2>
            We are verifying your phone number.
            <br/>
            After verifying it, you will advance to complete your profile.
          </h2>
        </Header>

        <Container className="onboarding-body">
          {this.state.error ? (
            <SnackbarMessage
              isOpen={this.state.error}
              onClose={this.handleSnackbarClose}
              message={this.state.message}
              severity={'error'}
              duration={4000}
            />
          ) : (
             <CircularProgress color="primary" size={108}/>
           )}
        </Container>
      </div>
    );
  }
}
