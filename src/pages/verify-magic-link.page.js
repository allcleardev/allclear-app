import React, {Component} from 'react';
import qs from 'qs';

import Box from '@material-ui/core/Container';

import RoundHeader from '../components/general/headers/header-round';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Grid } from '@material-ui/core';

import {bindAll} from 'lodash';

import PeopleService from '@services/people.service';
import {AppContext} from '@contexts/app.context';
import GAService from '@services/ga.service';

export default class VerifyMagicLinkPage extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.gaService = GAService.getInstance();
    this.gaService.setScreenName('verify-magic-link');

    this.peopleService = PeopleService.getInstance();

    //eslint-disable-next-line
    this.state = {
      checkedB: true,
      loading: false,
      error: false
    };

    bindAll(this, [
      'santizeSearchParams',
      'verifyMagicLink'
    ]);
  }

  componentDidMount() {
    this.verifyMagicLink();
  }

  santizeSearchParams = (searchParams) => {
    searchParams = searchParams.replace('?', '');
    searchParams = qs.parse(searchParams, []);
    return searchParams;
  }

  // Function to make call backend service to confirm the magic link
  async verifyMagicLink() {
    const { appState, setAppState } = this.context;
    let searchParams = this.santizeSearchParams(this.props.location.search);

    const response = await this.peopleService.confirmAuthRequest({phone: searchParams.phone, code: searchParams.code});

    if (!response.err) {
      setAppState({
        ...appState,
        sessionId: response.data.id,
        person:response.data.person
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

  // ALLCLEAR-274
  parseError() {
    return this.state.error === true ? <p className="error">{this.state.message}</p> : '';
  }

  render() {
    return (
      <div className="background-responsive">
        <Box className="sign-up">
          <RoundHeader>
            <h1 style={{justifyContent: 'center', margin: '0'}}>Verifying Phone Number</h1>
            <p>We are verifying your phone number.</p>
            <p>After verifying it, you will advance to complete your profile.</p>
          </RoundHeader>

          {this.parseError()}

          <Grid container justify="center">
            <Grid item xs={12} sm={6}>
              <LinearProgress color="primary" value={50} variant="indeterminate"/>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
}
