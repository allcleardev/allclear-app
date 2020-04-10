import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import './styles/app.scss';

// Abandoned Routes
// import AppProvider from './contexts/App.context';
// import Test from './pages/test';
// import Success from './pages/Success/Success';
// import PhoneVerifySuccess from './pages/phone-verify-success';
// import loginOrg from './pages/loginOrg';
// import Location from './pages/location';import CompleteProfile from './pages/completeProfile';
// import CreateAccount from './pages/create-account';
// import FindTest from './pages/ResultDetail/FindTest';
// import ForgotPassword from './pages/forgot-password';
// **End of Abandoned Routes

import AddTest from './pages/Test/Add-test';
import AuthVerifyCode from './pages/authVerification';
import Background from './pages/Background/Background';
import Conditions from './pages/Conditions/Conditions';
import ConfirmedRoute from './routes/confirm-routes';
import Health from './pages/health';
import HealthWorkerStatus from './pages/HealthWorkerStatus/HealthWorkerStatus';
import Launch from './pages/launch';
import Login from './pages/login';
import LoginMagicLink from './pages/login-magic-link';
import MapPage from './pages/map.page';
import { MapPageProvider } from './contexts/MapPage.context';
import PhoneVerify from './pages/phoneVerify';
import PhoneVerifying from './pages/phoneVerifying';
import ProfileEdit from './pages/profileEdit';
import ProfileView from './pages/profileView';
import ProtectedRoute from './routes/private-routes';
import Result from './pages/Result/Result';
import ResultDetail from './pages/ResultDetail/ResultDetail';
import Settings from './pages/Settings/Settings';
import ShareApp from './pages/Share/Share';
import SignUpVerification from './pages/signUpVerification';
import Symptoms from './pages/Symptoms/Symptoms';
import Trace from './pages/Trace/Trace';
import UpdateTestingCenterCriteria from './pages/updateTestingCenterCriteria';
import VerifyMagicLink from './pages/verify-magic-link';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Launch} />
        {/* Onboarding Pages */}
        <Route path="/sign-up" component={PhoneVerify} />
        <Route path="/sign-up-verification" component={SignUpVerification} />
        <Route path="/verifying" component={PhoneVerifying} />
        <Route path="/register" component={VerifyMagicLink} />
        <Route path="/auth" component={LoginMagicLink} />
        <ConfirmedRoute path="/background" component={Background} />
        <ConfirmedRoute path="/health-worker" component={HealthWorkerStatus} />
        <ConfirmedRoute path="/symptoms" component={Symptoms} />
        <ConfirmedRoute path="/conditions" component={Conditions} />
        <ConfirmedRoute path="/results" component={Result} />
        {/* Login Pages */}
        <Route path="/sign-in" component={Login} />
        <Route path="/sign-in-verification" component={AuthVerifyCode} />
        {/* Profile Pages / Settings */}
        <ProtectedRoute path="/profile-view" component={ProfileView} />
        <ProtectedRoute path="/profile-edit" component={ProfileEdit} />
        <ProtectedRoute path="/result-detail" component={ResultDetail} />
        <ProtectedRoute path="/add-test" component={AddTest} />
        <ProtectedRoute path="/health" component={Health} />
        <ProtectedRoute path="/update-criteria" component={UpdateTestingCenterCriteria} />
        <ProtectedRoute path="/share" component={ShareApp} />
        <ProtectedRoute path="/settings" component={Settings} />
        <ProtectedRoute path="/trace" component={Trace} />
        {/* Map */}
        <MapPageProvider>
          <Route path="/map" component={MapPage} />
        </MapPageProvider>

        {/* Abandoned */}
        {/*<Route path="/create-account" component={CreateAccount} />*/}
        {/*<Route path="/phone-verify-success" component={PhoneVerifySuccess} />*/}
        {/*<Route path="/complete-profile" component={CompleteProfile} />*/}
        {/*<Route path="/succcess" component={Success} />*/}
        {/*<Route path="/forgot" component={ForgotPassword} />*/}
        {/*<Route path="/login-org" component={loginOrg} />*/}
        {/*<Route path="/location" component={Location} />*/}
        {/*<Route path="/test" component={Test} />*/}
        {/*<Route path="/find-test" component={FindTest} />*/}
        {/* End of Abandoned Routes */}
      </Switch>
    </BrowserRouter>
  );
}
