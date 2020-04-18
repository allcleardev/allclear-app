import React, {useEffect, useState} from 'react';
import {forEach, get} from 'lodash';
import {CRITERIA_FORM_DATA} from '@general/modals/update-criteria-modal.constants';
import TypesService from '@services/types.service';

// Set Up The Initial Context
export const AppContext = React.createContext();
// Create an exportable consumer that can be injected into components
export const AppConsumer = AppContext.Consumer;

let searchCriteria = {};
forEach(CRITERIA_FORM_DATA, (e, i) => {
  searchCriteria[e.key] = e.options[0].value;
});

export const INITIAL_APP_STATE = {
  sessionId: undefined,
  person: {},
  map: {
    locations: [],
    expandedItems: [],
    isListLoading: true,
    searchFilterActive: false,
  },
  searchCriteria,
  profile: {
    options: {
      healthWorkerStatus: undefined,
      symptoms: undefined,
      exposures: undefined,
    }
  }

  // searchCriteria: {
  //   // driveThru: 'Any',
  //   // appointmentRequired: 'Any',
  //   // symptoms: ['none'],
  //   // exposure: 'Select Exposure',
  //   // conditions: ['none'],
  //   // healthWorkerStatus: ['none'],
  // }
};

// Context state
let initialAppState = INITIAL_APP_STATE;

const possSavedState = JSON.parse(localStorage.getItem('appState'));

// on first load, check if localstorage has a saved version of app state. use it if so
initialAppState = get(possSavedState, 'sessionId') ? possSavedState : initialAppState;

export function AppProvider(props) {
  const [appState, setAppState] = useState(initialAppState);
  const typesService = TypesService.getInstance();

  async function _populateFormOptions() {
    let {exposures, healthWorkerStatus, symptoms} = appState.profile.options;

    // only make the ajax calls if the options dont already exist in app state
    exposures = (exposures) ? exposures : await typesService.getExposures();
    healthWorkerStatus = (healthWorkerStatus) ? healthWorkerStatus : await typesService.getHealthWorkerStatuses();
    symptoms = (symptoms) ? symptoms : await typesService.getSymptoms();

    return {
      exposures,
      healthWorkerStatus,
      symptoms
    };
  }


  useEffect(() => {
    (async () => {
      const formOptions = await _populateFormOptions();
      setAppState({
        ...appState,
        profile: {
          ...appState.profile,
          options: {
            ...appState.profile.options,
            ...formOptions
          }
        }
      });
    })
    ();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // save it for later
  localStorage.setItem('appState', JSON.stringify(appState));
  return (
    // value prop is where we define what values
    // that are accessible to consumer components
    <AppContext.Provider
      value={{
        appState,
        setAppState,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppProvider;
