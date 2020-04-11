import React, {useState} from 'react';
// Set Up The Initial Context
export const AppContext = React.createContext();
// Create an exportable consumer that can be injected into components
export const AppConsumer = AppContext.Consumer;

// Context state
const initialAppState = {
  searchCriteria: {
    driveThru: 'Any',
    appointmentRequired: 'Any',

    // symptoms: ['none'],
    // exposure: 'Select Exposure',
    // conditions: ['none'],
    // healthWorkerStatus: ['none'],
  }
};

export function AppProvider(props) {

  const [appState, setAppState] = useState(initialAppState);

  return (
    // value prop is where we define what values
    // that are accessible to consumer components
    <AppContext.Provider
      value={{
        appState,
        setAppState
      }}
    >
      {props.children}
    </AppContext.Provider>
  );

}

export default AppProvider;
