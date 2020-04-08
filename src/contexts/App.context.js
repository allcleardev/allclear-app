import React, {Component} from 'react';
// Set Up The Initial Context
export const AppContext = React.createContext();
// Create an exportable consumer that can be injected into components
export const AppConsumer = AppContext.Consumer;
// Create the provider using a traditional React.Component class
class AppProvider extends Component {
  // Context state
  state = {
    searchCriteria: {
      driveThru: 'any',
      appointmentRequired: 'any',
      // symptoms: ['none'],
      // exposure: 'Select Exposure',
      // conditions: ['none'],
      // healthWorkerStatus: ['none'],
    }
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
      <AppContext.Provider
        value={this.state}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }

}

export default AppProvider;
