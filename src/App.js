import React from 'react';
import {Route, Switch, Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import './styles/app.scss';

// Abandoned Temporarily
// import conditions from './pages/conditions/conditions';
// import result from './pages/result/result';

import AppProvider from './contexts/App.context';
import AddTestPage from './pages/add-test/add-test.page';
import AuthVerifyCode from './pages/authVerification';
import BackgroundPage from './pages/background/background.page';
import ConfirmedRoute from './routes/confirmed-route';
import HealthWorkerStatusPage from './pages/health-worker-status/health-worker-status.page';
import Launch from './pages/launch';
import Login from './pages/login';
import LoginMagicLink from './pages/login-magic-link';
import MapPage from './pages/map/map.page';
import PhoneVerify from './pages/phoneVerify';
import PhoneVerifying from './pages/phoneVerifying';
import ProfileEdit from './pages/profileEdit';
import ProfileView from './pages/profileView';
import ProtectedRoute from './routes/protected-route';
import SettingsPage from './pages/settings/settings.page';
import SharePage from './pages/share/share.page';
import SignUpVerification from './pages/signUpVerification';
import Symptoms from './pages/symptoms/symptoms.page';
import TracingPage from './pages/tracing/tracing.page';
import UpdateTestingCenterCriteria from './pages/updateTestingCenterCriteria';
import VerifyMagicLink from './pages/verify-magic-link';
import NotFound from './pages/not-found';
import {Redirect} from 'react-router';

export const history = createBrowserHistory();

export default function App() {
  return (
    <Router
      history={history}
    >
      <AppProvider>

        <Switch>
          <Route exact path="/" component={Launch}/>
          {/* Onboarding Pages */}
          <Route path="/sign-up" component={PhoneVerify}/>
          <Route path="/sign-up-verification" component={SignUpVerification}/>
          <Route path="/verifying" component={PhoneVerifying}/>
          <Route path="/register" component={VerifyMagicLink}/>
          <Route path="/auth" component={LoginMagicLink}/>
          <ConfirmedRoute path="/background" component={BackgroundPage}/>
          <ConfirmedRoute path="/health-worker" component={HealthWorkerStatusPage}/>
          <ConfirmedRoute path="/symptoms" component={Symptoms}/>
          {/* Login Pages */}
          <Route path="/sign-in" component={Login}/>
          <Route path="/sign-in-verification" component={AuthVerifyCode}/>
          {/* Profile Pages / SettingsPage */}
          <ProtectedRoute path="/profile" component={ProfileView}/>
          <ProtectedRoute path="/profile-edit" component={ProfileEdit}/>
          <ProtectedRoute path="/add-test" component={AddTestPage}/>
          <ProtectedRoute path="/update-criteria" component={UpdateTestingCenterCriteria}/>
          <ProtectedRoute path="/share" component={SharePage}/>
          <ProtectedRoute path="/settings" component={SettingsPage}/>
          <ProtectedRoute path="/contact-tracing" component={TracingPage}/>


          {/* Map */}
          <Route path="/map" component={MapPage}/>

          {/* 404 */}
          <Route path="/404" component={NotFound}/>
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
