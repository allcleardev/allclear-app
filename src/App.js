import React from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import './styles/app.scss';

// Abandoned Temporarily
// import Conditions from './pages/Conditions/Conditions';
// import Result from './pages/Result/Result';

import AppProvider from './contexts/App.context';
import AddTest from './pages/Test/Add-test';
import AuthVerifyCode from './pages/authVerification';
import Background from './pages/Background/Background';
import ConfirmedRoute from './routes/confirmed-route';
import HealthWorkerStatus from './pages/HealthWorkerStatus/HealthWorkerStatus';
import Launch from './pages/launch';
import Login from './pages/login';
import LoginMagicLink from './pages/login-magic-link';
import MapPage from './pages/map.page';
// import {MapPageProvider} from './contexts/MapPage.context';
import PhoneVerify from './pages/phoneVerify';
import PhoneVerifying from './pages/phoneVerifying';
import ProfileEdit from './pages/profileEdit';
import ProfileView from './pages/profileView';
import ProtectedRoute from './routes/protected-route';
import Settings from './pages/Settings/Settings';
import ShareApp from './pages/Share/Share';
import SignUpVerification from './pages/signUpVerification';
import Symptoms from './pages/Symptoms/Symptoms';
import Trace from './pages/Trace/Trace';
import UpdateTestingCenterCriteria from './pages/updateTestingCenterCriteria';
import VerifyMagicLink from './pages/verify-magic-link';
import NotFound from './pages/not-found';
import {Redirect} from 'react-router';

export const history = createBrowserHistory();

export default function App() {
  return (
    <BrowserRouter
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
          <ConfirmedRoute path="/background" component={Background}/>
          <ConfirmedRoute path="/health-worker" component={HealthWorkerStatus}/>
          <ConfirmedRoute path="/symptoms" component={Symptoms}/>
          {/* Login Pages */}
          <Route path="/sign-in" component={Login}/>
          <Route path="/sign-in-verification" component={AuthVerifyCode}/>
          {/* Profile Pages / Settings */}
          <ProtectedRoute path="/profile" component={ProfileView}/>
          <ProtectedRoute path="/profile-edit" component={ProfileEdit}/>
          <ProtectedRoute path="/add-test" component={AddTest}/>
          <ProtectedRoute path="/update-criteria" component={UpdateTestingCenterCriteria}/>
          <ProtectedRoute path="/share" component={ShareApp}/>
          <ProtectedRoute path="/settings" component={Settings}/>
          <ProtectedRoute path="/contact-tracing" component={Trace}/>


          {/* Map */}
          {/*<MapPageProvider>*/}
          <Route path="/map" component={MapPage}/>
          {/*</MapPageProvider>*/}

          {/* 404 */}
          <Route path="/404" component={NotFound}/>
          <Route path="*">
            <Redirect to="/404"/>
          </Route>

          {/* Abandoned Temporarily*/}
          {/* <ConfirmedRoute path="/conditions" component={Conditions} /> */}
          {/* <ConfirmedRoute path="/results" component={Result} /> */}
        </Switch>
      </AppProvider>
    </BrowserRouter>
  );
}
