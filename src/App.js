import React from 'react';
import {Route, Switch, Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import './styles/app.scss';

// Abandoned Temporarily
// import conditions from './pages/conditions/conditions';
// import result from './pages/result/result';

import AppProvider from './contexts/App.context';
import AddTestPage from './pages/add-test.page';
import AuthVerifyCode from './pages/sign-up.page';
import BackgroundPage from './pages/background.page';
import ConfirmedRoute from './routes/confirmed-route';
import HealthWorkerStatusPage from './pages/health-worker-status.page';
import LaunchPage from './pages/launch.page';
import Login from './pages/login.page';
import LoginMagicLinkPage from './pages/login-magic-link.page';
import MapPage from './pages/map.page';
import ProfileEditPage from './pages/profile-edit.page';
import ProfileViewPage from './pages/profile-view.page';
import ProtectedRoute from './routes/protected-route';
import SettingsPage from './pages/settings.page';
import SharePage from './pages/share.page';
import SignUpVerificationPage from './pages/sign-up-verification.page';
import Symptoms from './pages/symptoms.page';
import TracingPage from './pages/tracing.page';
import UpdateTestingCenterCriteria from './pages/update-testing-center-criteria.page';
import VerifyMagicLinkPage from './pages/verify-magic-link.page';
import NotFoundPage from './pages/not-found.page';
import {Redirect} from 'react-router';
import SignUpPage from './pages/sign-up.page';
import VerifyingPage from './pages/verifying.page';

export const history = createBrowserHistory();

export default function App() {
  return (
    <Router
      history={history}
    >
      <AppProvider>

        <Switch>
          <Route exact path="/" component={LaunchPage}/>
          {/* Onboarding Pages */}
          <Route path="/sign-up" component={SignUpPage}/>
          <Route path="/sign-up-verification" component={SignUpVerificationPage}/>
          <Route path="/verifying" component={VerifyingPage}/>
          <Route path="/register" component={VerifyMagicLinkPage}/>
          <Route path="/auth" component={LoginMagicLinkPage}/>
          <ConfirmedRoute path="/background" component={BackgroundPage}/>
          <ConfirmedRoute path="/health-worker" component={HealthWorkerStatusPage}/>
          <ConfirmedRoute path="/symptoms" component={Symptoms}/>
          {/* Login Pages */}
          <Route path="/sign-in" component={Login}/>
          <Route path="/sign-in-verification" component={AuthVerifyCode}/>
          {/* Profile Pages / SettingsPage */}
          <ProtectedRoute path="/profile" component={ProfileViewPage}/>
          <ProtectedRoute path="/profile-edit" component={ProfileEditPage}/>
          <ProtectedRoute path="/add-test" component={AddTestPage}/>
          <ProtectedRoute path="/update-criteria" component={UpdateTestingCenterCriteria}/>
          <ProtectedRoute path="/share" component={SharePage}/>
          <ProtectedRoute path="/settings" component={SettingsPage}/>
          <ProtectedRoute path="/contact-tracing" component={TracingPage}/>


          {/* Map */}
          <Route path="/map" component={MapPage}/>

          {/* 404 */}
          <Route path="/404" component={NotFoundPage}/>
          <Route path="*">
            <Redirect to="/404"/>
          </Route>

          {/* Abandoned Temporarily*/}
          {/* <ConfirmedRoute path="/conditions" component={conditions} /> */}
          {/* <ConfirmedRoute path="/results" component={result} /> */}
        </Switch>
      </AppProvider>
    </Router>
  );
}
