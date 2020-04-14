import React from 'react';
import {withRouter, Redirect} from 'react-router';

class ConfirmedRoute extends React.Component {

  render() {
    const props = this.props;
    const Component = this.props.component;
    const isAuthenticated = localStorage.getItem('confirm_sessid');

    // remove all associated storage items
    if(!isAuthenticated){
      localStorage.removeItem('appState');
    }

    return isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{ pathname: '/sign-up' }} />
    );
  }
}

export default withRouter(ConfirmedRoute);
