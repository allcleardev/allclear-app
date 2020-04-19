import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import '@styles/app.scss';

// Abandoned Temporarily
// import conditions from '@pages/conditions/conditions';
// import result from '@pages/result/result';

import AppProvider from './contexts/app.context';

import AccountCreated from '@pages/account-created.page';
import AddTestPage from '@pages/add-test.page';
import SignInVerificationPage from '@pages/sign-in-verification.page';
import BackgroundPage from '@pages/background.page';
import GetStartedPage from '@pages/get-started.page';
import HealthWorkerStatusPage from '@pages/health-worker-status.page';
import LaunchPage from '@pages/launch.page';
import SignInPage from '@pages/sign-in.page';
import LoginMagicLinkPage from '@pages/login-magic-link.page';
import MapPage from '@pages/map.page';
import ProfileEditPage from '@pages/profile-edit.page';
import ProfileViewPage from '@pages/profile-view.page';
import ProtectedRoute from './routes/protected.route';
import SettingsPage from '@pages/settings.page';
import SharePage from '@pages/share.page';
import SignUpVerificationPage from '@pages/sign-up-verification.page';
import Symptoms from '@pages/symptoms.page';
import TracingPage from '@pages/tracing.page';
import UpdateTestingCenterCriteria from '@pages/update-testing-center-criteria.page';
import VerifyMagicLinkPage from '@pages/verify-magic-link.page';
import NotFoundPage from '@pages/not-found.page';
import {Redirect} from 'react-router';
import SignUpPage from '@pages/sign-up.page';

export const history = createBrowserHistory();

export default function App() {
  return (
    <Router history={history}>
      <AppProvider>
        <Switch>
          {/* Loader Page */}
          <Route exact path="/" component={LaunchPage} />

          {/* Onboarding Pages */}
          <Route path="/get-started" component={GetStartedPage} />
          <Route path="/sign-up" component={SignUpPage} />
          <Route path="/sign-up-verification" component={SignUpVerificationPage} />
          <ProtectedRoute path="/success" component={AccountCreated} />

          <Route path="/register" component={VerifyMagicLinkPage} />
          <Route path="/auth" component={LoginMagicLinkPage} />

          <Route path="/location" component={BackgroundPage} />
          <Route path="/health-worker" component={HealthWorkerStatusPage} />
          <Route path="/symptoms" component={Symptoms} />

          {/* Login Pages */}
          <Route path="/sign-in" component={SignInPage} />
          <Route path="/sign-in-verification" component={SignInVerificationPage} />

          {/* Profile Pages / SettingsPage */}
          <Route path="/profile" component={ProfileViewPage} />
          <Route path="/profile-edit" component={ProfileEditPage} />
          <Route path="/add-test" component={AddTestPage} />
          <Route path="/update-criteria" component={UpdateTestingCenterCriteria} />
          <Route path="/share" component={SharePage} />
          <Route path="/settings" component={SettingsPage} />
          <Route path="/contact-tracing" component={TracingPage} />

          {/* Map */}
          <Route path="/map" component={MapPage} />
          {/* 404 */}
          <Route path="/404" component={NotFoundPage} />
          <Route path="*">
            <Redirect to="/404" />
          </Route>
          {/* Abandoned Temporarily*/}
          {/* <ConfirmedRoute path="/conditions" component={conditions} /> */}
          {/* <ConfirmedRoute path="/results" component={result} /> */}
        </Switch>
      </AppProvider>
    </Router>
  );
}
