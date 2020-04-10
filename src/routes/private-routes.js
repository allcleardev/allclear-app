import React from 'react';
import {withRouter, Redirect} from 'react-router';

class ProtectedRoute extends React.Component {

  render() {
    const props = this.props;
    const Component = this.props.component;
    const isAuthenticated = localStorage.getItem('sessid');

    return isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/sign-up' }} />
    );
  }
}

export default withRouter(ProtectedRoute);
