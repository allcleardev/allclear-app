import React, { Component } from 'react';
import { AppContext, INITIAL_APP_STATE } from '../contexts/app.context';
import PeopleService from '@services/people.service.js';
import { bindAll } from 'lodash';

export default class Logout extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    bindAll(this, ['componentDidMount', 'executeLogout']);
    this.peopleService = PeopleService.getInstance();
    this.executeLogout();
  }

  componentDidMount() {
    this.executeLogout();
  }

  async executeLogout() {
    const currSession = this.context.appState.sessionId;
    await this.peopleService.logout(currSession);
    localStorage.removeItem('sessionId');
    localStorage.removeItem('appState');
    localStorage.removeItem('session');
    const { setAppState } = this.context;
    setAppState(INITIAL_APP_STATE);
    return this.props.history.push('/get-started?logout=You%20have%20been%20successfully%20logged%20out.');
  }

  render() {
    return (
      <div>sup nerdz</div>
    );
  }
}