import React, {createContext} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Launch from './pages/launch';
import CreateAccount from './pages/create-account';
import AuthVerifyCode from './pages/authVerification';
import PhoneVerify from './pages/phoneVerify';
import PhoneVerifyCode from './pages/phoneVerification';
import PhoneVerifying from './pages/phoneVerifying';
import PhoneVerifySuccess from './pages/phone-verify-success';
import VerifyMagicLink from './pages/verify-magic-link';
import login from './pages/login';
import loginOrg from './pages/loginOrg';
// import Location from './pages/location';
import Health from './pages/health';
import Test from './pages/test';
import UpdateTestingCenterCriteria from './pages/updateTestingCenterCriteria';
import MapPage from './pages/map.page';
import ProfileView from './pages/profileView';
import ProfileEdit from './pages/profileEdit';
import ForgotPassword from './pages/forgot-password';
import Success from './pages/Success/Success';
import Result from './pages/Result/Result';
import Conditions from './pages/Conditions/Conditions';
import Symptoms from './pages/Symptoms/Symptoms';
import CompleteProfile from './pages/completeProfile';
import Background from './pages/Background/Background';
import FindTest from './pages/ResultDetail/FindTest';
import ResultDetail from './pages/ResultDetail/ResultDetail';
import MapPageProvider from './contexts/MapPage.context';
import AddTest from './pages/Test/Add-test';
import './styles/app.scss';

export const AppContext = createContext({});

export default function App() {

  return (
    <Router>
      <AppContext.Provider value={{test: 'cool test'}}>
        <Route exact path="/" component={Launch}/>
        {/* Onboarding Pages */}
        <Route path="/phone-verify" component={PhoneVerify}/>
        <Route path="/phone-verification" component={PhoneVerifyCode}/>
        <Route path="/phone-verifying" component={PhoneVerifying}/> {/* Note: This is a loading screen */}
        <Route path="/auth-verification" component={AuthVerifyCode}/> {/* Note: This is a loading screen */}
        <Route path="/background" component={Background}/>
        <Route path="/conditions" component={Conditions}/>
        <Route path="/symptoms" component={Symptoms}/>
        <Route path="/results" component={Result}/> {/* TODO: Finish style refactor (carrie) */}
        {/* Login Pages */}
        <Route path="/login" component={login}/>
        <Route path="/login-verification" component={AuthVerifyCode}/>
        {/* Profile Pages / Settings */}
        <Route path="/complete-profile" component={CompleteProfile}/>
        <Route path="/profile-view" component={ProfileView}/>
        <Route path="/profile-edit" component={ProfileEdit}/>
        <Route path="/result-detail" component={ResultDetail}/>
        <Route path="/add-test" component={AddTest}/>
        <Route path="/health" component={Health}/>
        <Route path="/update-criteria" component={UpdateTestingCenterCriteria}/>
        {/* Map */}
        <MapPageProvider>
          <Route path="/map" component={MapPage}/>
        </MapPageProvider>
        {/* Abandoned??? */}
        <Route path="/create-account" component={CreateAccount}/>
        <Route path="/phone-verify-success" component={PhoneVerifySuccess}/>
        <Route path="/succcess" component={Success}/>
        <Route path="/register" component={VerifyMagicLink}/>
        <Route path="/forgot" component={ForgotPassword}/>
        <Route path="/login-org" component={loginOrg}/>
        <Route path="/location" component={Location}/>
        <Route path="/test" component={Test}/>
        <Route path="/find-test" component={FindTest}/>
      </AppContext.Provider>
    </Router>
  );
}
