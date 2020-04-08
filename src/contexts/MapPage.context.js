import React, {Component} from 'react';
// Set Up The Initial Context
export const MapPageContext = React.createContext();
// Create an exportable consumer that can be injected into components
export const MapPageConsumer = MapPageContext.Consumer;
// Create the provider using a traditional React.Component class
class MapPageProvider extends Component {
  // Context state
  state = {
    user: 'joe',
    drawerOpen: false,
  };


  // Method to update state
  // setUser = (user) => {
  //   //eslint-disable-next-line
  //   this.setState((prevState) => {
  //     return user;
  //   });
  // };
  //
  // setDrawerOpen = (drawerOpen) => {
  //   //eslint-disable-next-line
  //   this.setState((prevState) => {
  //     console.log('drawer', drawerOpen);
  //     return drawerOpen;
  //   });
  // };

  render() {
    return (
      // value prop is where we define what values
      // that are accessible to consumer components
      <MapPageContext.Provider
        value={this.state}
      >
        {this.props.children}
      </MapPageContext.Provider>
    );
  }

}

export default MapPageProvider;
