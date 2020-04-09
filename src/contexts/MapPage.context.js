import React, { Component } from 'react';
// Set Up The Initial Context
const MapPageContext = React.createContext();
// Create an exportable consumer that can be injected into components
export const MapPageConsumer = MapPageContext.Consumer;
// Create the provider using a traditional React.Component class
class MapPageProvider extends Component {
  // Context state
  state = {
    locations: [],
    drawerOpen: false,
  };

  // Method to update state
  setLocations = (locations) => {
    //eslint-disable-next-line
    this.setState({ locations });
  };

  // setDrawerOpen = (drawerOpen) => {
  //   //eslint-disable-next-line
  //   this.setState((prevState) => {
  //     console.log('drawer', drawerOpen);
  //     return drawerOpen;
  //   });
  // };

  render() {
    const { children } = this.props;
    const { locations } = this.state;
    const { setLocations } = this;
    return (
      // value prop is where we define what values
      // that are accessible to consumer components
      <MapPageContext.Provider
        value={{
          locations,
          setLocations,
        }}
      >
        {children}
      </MapPageContext.Provider>
    );
  }
}
export default MapPageContext;
export { MapPageProvider };
