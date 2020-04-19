import React from 'react';
import { withRouter, Redirect } from 'react-router';

class ProtectedRoute extends React.Component {
  render() {
    const props = this.props;
    const Component = this.props.component;
    const isAuthenticated = localStorage.getItem('sessionId');

    // remove all associated storage items
    if (!isAuthenticated) {
      localStorage.removeItem('appState');
    }

    return isAuthenticated ? <Component {...props} /> : <Redirect to={{ pathname: '/get-started' }} />;
  }
}

export default withRouter(ProtectedRoute);
