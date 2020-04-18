import React, {useEffect, useState} from 'react';
import {forEach, get} from 'lodash';
import {CRITERIA_FORM_DATA} from '@general/modals/update-criteria-modal.constants';
import TypesService from '@services/types.service';

// Set Up The Initial Context
export const AppContext = React.createContext();
// Create an exportable consumer that can be injected into components
export const AppConsumer = AppContext.Consumer;

// set default selections for non-dynamic criteria modal options
let searchCriteria = {};
forEach(CRITERIA_FORM_DATA, (e, i) => {
  if(e.options){
    searchCriteria[e.key] = e.options[0].id;
  }
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
  },

  // this is to re-trigger a render on modal (
  forceRefresh: false,
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
    symptoms = (symptoms) ? symptoms : await typesService.getSymptoms(true);

    return {
      exposures,
      healthWorkerStatus,
      symptoms
    };
  }

  // grab dynamic form options, set them to searchCriteria for modal usage
  useEffect(() => {
    (async () => {
      const formOptions = await _populateFormOptions();

      let dynamicSearchCriteria = {};
      forEach(formOptions, (e, i) => {

        // if selection exists from last filter, use it. else choose the first option
        dynamicSearchCriteria[i] = (appState.searchCriteria[i]) ? appState.searchCriteria[i] : e[0].id;

        // if user has saved this part of the profile, use that
        const savedProfileOption = appState.person[i];
        if (savedProfileOption) {
          dynamicSearchCriteria[i] = savedProfileOption.id;
        }

      });

      setAppState({
        ...appState,
        searchCriteria: {
          ...appState.searchCriteria,
          ...dynamicSearchCriteria
        },
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

  useEffect(() => {

    // // // check one last time for profile values to pre-select (used for first map refresh on login)
    let dynamicSearchCriteria = {};
    forEach(appState.profile.options, (e, i) => {
      // if user has saved this part of the profile, use that
      const savedProfileOption = appState.person[i];
      if (savedProfileOption) {
        dynamicSearchCriteria[i] = savedProfileOption.id;
      }
    });
    let finalAppState = {
      ...appState,
      searchCriteria: {
        ...appState.searchCriteria,
        ...dynamicSearchCriteria
      },
    };

    setAppState(finalAppState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState.forceRefresh]);

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
