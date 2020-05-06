import React, { Component } from 'react';
import { AppContext, INITIAL_APP_STATE } from '../contexts/app.context';
import { CircularProgress } from '@material-ui/core';
import PeopleService from '@services/people.service.js';

export default class Logout extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.peopleService = PeopleService.getInstance();
  }

  componentDidMount() {
    this.executeLogout();
  }

  async executeLogout() {
    const currSession = this.context.appState.sessionId;
    localStorage.clear();
    this.context.setAppState(INITIAL_APP_STATE);
    await this.peopleService.logout(currSession);
    return this.routeChange('/get-started?logout=You%20have%20been%20successfully%20logged%20out.');
  }

  routeChange(route) {
    this.props.history.push(route);
  };

  render() {
    return (
      <div className="logout">
        <CircularProgress color="primary" size={108} />
        <p>Logging Out...</p>
      </div>
    );
  }
}
