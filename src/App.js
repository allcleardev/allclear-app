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
import FindTestMap from './pages/findTestMap';
import ForgotPassword from './pages/forgot-password';
import Health from './pages/health';
import HealthWorkerStatus from './pages/HealthWorkerStatus/HealthWorkerStatus';
import Launch from './pages/launch';
import Location from './pages/location';
import login from './pages/login';
import loginOrg from './pages/loginOrg';
import PhoneVerify from './pages/phoneVerify';
import PhoneVerifyCode from './pages/phoneVerification';
import PhoneVerifying from './pages/phoneVerifying';
import PhoneVerifySuccess from './pages/phone-verify-success';
import ProfileEdit from './pages/profileEdit';
import ProfileView from './pages/profileView';
import Result from './pages/Result/Result';
import ResultDetail from './pages/ResultDetail/ResultDetail';
import Success from './pages/Success/Success';
import Symptoms from './pages/Symptoms/Symptoms';
import Test from './pages/test';
import UpdateTestingCenterCriteria from './pages/updateTestingCenterCriteria';
import VerifyMagicLink from './pages/verify-magic-link';

export default function App() {
  return (
    <Router>
      <Route exact path="/" component={Launch} />
      {/* Onboarding Pages */}
      <Route path="/sign-up" component={PhoneVerify} />
      <Route path="/sign-up-verification" component={PhoneVerifyCode} />
      <Route path="/verifying" component={PhoneVerifying} /> {/* Note: This is a loading screen */}
      <Route path="/background" component={Background} />
      <Route path="/health-worker" component={HealthWorkerStatus} />
      <Route path="/symptoms" component={Symptoms} />
      {/* Login Pages */}
      <Route path="/login" component={login} />
      <Route path="/login-verification" component={AuthVerifyCode} />
      {/* Profile Pages / Settings */}
      <Route path="/profile-view" component={ProfileView} />
      <Route path="/profile-edit" component={ProfileEdit} />
      <Route path="/result-detail" component={ResultDetail} />
      <Route path="/add-test" component={AddTest} />
      <Route path="/health" component={Health} />
      <Route path="/update-criteria" component={UpdateTestingCenterCriteria} />
      {/* Map */}
      <Route path="/find-test-map" component={FindTestMap} />
      {/* Abandoned??? */}
      <Route path="/create-account" component={CreateAccount} />
      <Route path="/phone-verify-success" component={PhoneVerifySuccess} />
      <Route path="/complete-profile" component={CompleteProfile} />
      <Route path="/succcess" component={Success} />
      <Route path="/register" component={VerifyMagicLink} />
      <Route path="/forgot" component={ForgotPassword} />
      <Route path="/login-org" component={loginOrg} />
      <Route path="/location" component={Location} />
      <Route path="/test" component={Test} />
      <Route path="/find-test" component={FindTest} />
      {/* Definitely Abandoned (for now) */}
      <Route path="/conditions" component={Conditions} />
      <Route path="/results" component={Result} />
    </Router>
  );
}
