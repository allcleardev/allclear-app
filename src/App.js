import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './styles/app.scss';

import AddTest from './pages/Test/Add-test';
import AuthVerifyCode from './pages/authVerification';
import Background from './pages/Background/Background';
import CompleteProfile from './pages/completeProfile';
import Conditions from './pages/Conditions/Conditions';
import CreateAccount from './pages/create-account';
import FindTest from './pages/ResultDetail/FindTest';
import MapPage from './pages/map.page';
import ForgotPassword from './pages/forgot-password';
import Health from './pages/health';
import HealthWorkerStatus from './pages/HealthWorkerStatus/HealthWorkerStatus';
import Launch from './pages/launch';
import Location from './pages/location';
import login from './pages/login';
import loginOrg from './pages/loginOrg';
import PhoneVerify from './pages/phoneVerify';
import PhoneVerifying from './pages/phoneVerifying';
import PhoneVerifySuccess from './pages/phone-verify-success';
import ProfileEdit from './pages/profileEdit';
import ProfileView from './pages/profileView';
import Result from './pages/Result/Result';
import ResultDetail from './pages/ResultDetail/ResultDetail';
import ShareApp from './pages/Share/Share';
import SignUpVerification from './pages/signUpVerification';
import Success from './pages/Success/Success';
import Symptoms from './pages/Symptoms/Symptoms';
import Test from './pages/test';
import UpdateTestingCenterCriteria from './pages/updateTestingCenterCriteria';
import VerifyMagicLink from './pages/verify-magic-link';
import LoginMagicLink from './pages/login-magic-link';
import MapPageProvider from './contexts/MapPage.context';
import AppProvider from './contexts/App.context';
import Settings from './pages/Settings/Settings';

export default function App() {
  return (
    <Router>
      <AppProvider>
        <Route exact path="/" component={Launch} />
        {/* Onboarding Pages */}
        <Route path="/sign-up" component={PhoneVerify} />
        <Route path="/sign-up-verification" component={SignUpVerification} />
        <Route path="/verifying" component={PhoneVerifying} /> {/* Note: This is a loading screen */}
        <Route path="/background" component={Background} />
        <Route path="/health-worker" component={HealthWorkerStatus} />
        <Route path="/symptoms" component={Symptoms} />
        {/* Login Pages */}
        <Route path="/sign-in" component={login} />
        <Route path="/sign-in-verification" component={AuthVerifyCode} />
        {/* Profile Pages / Settings */}
        <Route path="/profile-view" component={ProfileView} />
        <Route path="/profile-edit" component={ProfileEdit} />
        <Route path="/result-detail" component={ResultDetail} />
        <Route path="/add-test" component={AddTest} />
        <Route path="/health" component={Health} />
        <Route path="/update-criteria" component={UpdateTestingCenterCriteria} />
        <Route path="/share" component={ShareApp} />
        <Route path="/setting" component={Settings} />
        {/* Map */}
        <MapPageProvider>
          <Route path="/map" component={MapPage} />
        </MapPageProvider>
        {/* Abandoned??? */}
        <Route path="/create-account" component={CreateAccount} />
        <Route path="/phone-verify-success" component={PhoneVerifySuccess} />
        <Route path="/complete-profile" component={CompleteProfile} />
        <Route path="/succcess" component={Success} />
        <Route path="/register" component={VerifyMagicLink} />
        <Route path="/auth" component={LoginMagicLink} />
        <Route path="/forgot" component={ForgotPassword} />
        <Route path="/login-org" component={loginOrg} />
        <Route path="/location" component={Location} />
        <Route path="/test" component={Test} />
        <Route path="/find-test" component={FindTest} />
        {/* Definitely Abandoned (for now) */}
        <Route path="/conditions" component={Conditions} />
        <Route path="/results" component={Result} />
      </AppProvider>
    </Router>
  );
}
