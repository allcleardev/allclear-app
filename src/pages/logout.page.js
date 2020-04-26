import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext, INITIAL_APP_STATE } from '../contexts/app.context';
import { CircularProgress } from '@material-ui/core';
import PeopleService from '@services/people.service.js';

export default function Logout() {
  const peopleService = PeopleService.getInstance();
  const { setAppState, appState } = useContext(AppContext);
  const history = useHistory();

  executeLogout();

  async function executeLogout() {
    const currSession = appState.sessionId;
    await peopleService.logout(currSession);
    localStorage.removeItem('sessionId');
    localStorage.removeItem('appState');
    localStorage.removeItem('session');
    setAppState(INITIAL_APP_STATE);
    return routeChange('/get-started?logout=You%20have%20been%20successfully%20logged%20out.');
  }

  function routeChange(route) {
    history.push(route);
  };

  return (
    <div className="logout">
      <CircularProgress style={{ color: 'white' }} size={70} />
      <p>Logging Out...</p>
    </div>
  );
}