import React, {useEffect, useState} from 'react';
import {forEach, get} from 'lodash';
import {CRITERIA_FORM_DATA} from '@general/modals/update-criteria-modal.constants';
import {useLocation} from 'react-router';
import {getRouteQueryParams} from '@util/general.helpers';
// import TypesService from '@services/types.service';

// Set Up The Initial Context
export const AppContext = React.createContext();
// Create an exportable consumer that can be injected into components
export const AppConsumer = AppContext.Consumer;

// set default selections for non-dynamic criteria modal options
let searchCriteria = {};
forEach(CRITERIA_FORM_DATA, (e, i) => {
  if (e.options) {
    searchCriteria[e.key] = get(e, 'options[0].id');
  }
});

export const INITIAL_APP_STATE = {

  // data objects read within different components
  sessionId: undefined,
  person: {
    dob: undefined,
    alertable: undefined,
    locationName: undefined,
    phone: undefined,
    name: undefined,
    latitude: undefined,
    longitude: undefined,
  },
  map: {
    locations: [],
    expandedItems: [],
    isListLoading: true,
    searchFilterActive: false,
    latitude: undefined,
    longitude: undefined,
  },
  searchCriteria,
  profile: {
    options: {
      healthWorkerStatus: undefined,
      symptoms: undefined,
      exposures: undefined,
    },
  },
  route: {
    params: undefined
  },
  signUpPayload: undefined,

  // this is to re-trigger a render on modal (
  forceRefresh: false,
  modalSubmitCount: 0,

};

// Context state
let initialAppState = INITIAL_APP_STATE;

const possSavedState = JSON.parse(localStorage.getItem('appState'));

// on first load, check if localstorage has a saved version of app state. use it if so
initialAppState = get(possSavedState, 'sessionId') ? possSavedState : initialAppState;

export function AppProvider(props) {
  const location = useLocation();
  const params = getRouteQueryParams(location);
  const [appState, setAppState] = useState(initialAppState);

  // as routes change, parse qs into an object
  useEffect(() => {
    setAppState({
        ...appState,
        route: {
          ...appState.route,
          params,
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);


  // const typesService = TypesService.getInstance();

  // only make the ajax calls if the options dont already exist in app state
  // todo: put this back when dynamic options come back into modal
  // async function _populateFormOptions() {
  //   let {exposures, healthWorkerStatus, symptoms} = appState.profile.options;
  //
  //   exposures = (exposures) ? exposures : await typesService.getExposures();
  //   healthWorkerStatus = (healthWorkerStatus) ? healthWorkerStatus : await typesService.getHealthWorkerStatuses();
  //   symptoms = (symptoms) ? symptoms : await typesService.getSymptoms(true);
  //
  //   return {
  //     exposures,
  //     healthWorkerStatus,
  //     symptoms
  //   };
  // }

  // todo: put this back when dynamic options come back into modal
  // grab dynamic form options, set them to searchCriteria for modal usage
  // useEffect(() => {
  //   (async () => {
  //     const formOptions = await _populateFormOptions();
  //
  //     let defaultSelections = {};
  //     forEach(formOptions, (e, i) => {
  //       // if selection exists from last filter, use it. else choose the first option
  //       defaultSelections[i] = (appState.searchCriteria[i]) ? appState.searchCriteria[i] : get(e,'[0].id');
  //     });
  //
  //     setAppState({
  //       ...appState,
  //       searchCriteria: {
  //         ...appState.searchCriteria,
  //         ...defaultSelections
  //       },
  //       profile: {
  //         ...appState.profile,
  //         options: {
  //           ...appState.profile.options,
  //           ...formOptions
  //         }
  //       }
  //     });
  //   })
  //   ();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // todo: put this back when dynamic options come back into modal
  // check user profile for saved option values before modal actually opens
  // useEffect(() => {
  //
  //   // // // check one last time for profile values to pre-select (used for first map refresh on login)
  //   let dynamicSearchCriteria = {};
  //   forEach(appState.profile.options, (e, i) => {
  //     // if user has saved this part of the profile, use that
  //     const savedProfileOption = appState.person[i];
  //     if (savedProfileOption && appState.modalSubmitCount === 0) {
  //       dynamicSearchCriteria[i] = savedProfileOption.id;
  //     }
  //   });
  //   let finalAppState = {
  //     ...appState,
  //     searchCriteria: {
  //       ...appState.searchCriteria,
  //       ...dynamicSearchCriteria
  //     },
  //   };
  //
  //   setAppState(finalAppState);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [appState.forceRefresh]);

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
