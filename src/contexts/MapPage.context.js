import React, {useState} from 'react';
// Set Up The Initial Context
export const MapPageContext = React.createContext();
// Create an exportable consumer that can be injected into components
export const MapPageConsumer = MapPageContext.Consumer;

// Context state
const initialMapPageState = {
  // selectedPin: '',
  locations:[]
  // todo: store the refs here, useEffect to scrollto. potentially can close the other expanders as well.
};

export function MapPageProvider(props) {

  const [mapPageState, setMapPageState] = useState(initialMapPageState);

  return (
    // value prop is where we define what values
    // that are accessible to consumer components
    <MapPageContext.Provider
      value={{
        mapPageState,
        setMapPageState
      }}
    >
      {props.children}
    </MapPageContext.Provider>
  );

}

export default MapPageContext;
