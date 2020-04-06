import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Launch from "./pages/launch";
import CreateAccount from "./pages/create-account";
import AuthVerifyCode from "./pages/authVerification";
import PhoneVerify from "./pages/phoneVerify";
import PhoneVerifyCode from "./pages/phoneVerification";
import PhoneVerifying from "./pages/phoneVerifying";
import PhoneVerifySuccess from "./pages/phone-verify-success";
import VerifyMagicLink from "./pages/verify-magic-link";
import login from "./pages/login";
import LoginVerification from "./pages/loginVerification";
import loginOrg from "./pages/loginOrg";
import Location from "./pages/location";
import Health from "./pages/health";
import Test from "./pages/test";
import UpdateTestingCenterCriteria from "./pages/updateTestingCenterCriteria";
import FindTestMap from "./pages/findTestMap";
import ProfileView from "./pages/profileView";
import ProfileEdit from "./pages/profileEdit";
import ForgotPassword from "./pages/forgot-password";
import Success from "./pages/Success/Success";
import Result from "./pages/Result/Result";
import Conditions from "./pages/Conditions/Conditions";
import Symptoms from "./pages/Symptoms/Symptoms";
import CompleteProfile from "./pages/completeProfile";
import Background from "./pages/Background/Background";
import FindTest from "./pages/ResultDetail/FindTest";
import ResultDetail from "./pages/ResultDetail/ResultDetail";
import AddTest from "./pages/Test/Add-test";
import "./styles/app.scss";

export default function App() {
  return (
    <Router>
      <Route exact path="/" component={Launch} />
      {/* <Route exact path="/" component={Home} /> */}
      {/* David start */}
      <Route path="/create-account" component={CreateAccount} />
      <Route path="/phone-verify" component={PhoneVerify} />
      <Route path="/complete-profile" component={CompleteProfile} />
      <Route path="/test" component={Test} />
      <Route path="/find-test-map" component={FindTestMap} />
      <Route path="/update-criteria" component={UpdateTestingCenterCriteria} />
      <Route path="/profile-view" component={ProfileView} />
      <Route path="/profile-edit" component={ProfileEdit} />
      <Route path="/phone-verification" component={PhoneVerifyCode} />
      <Route path="/phone-verifying" component={PhoneVerifying} />
      <Route path="/login" component={login} />
      <Route path="/auth-verification" component={AuthVerifyCode} />
      <Route path="/login-verification" component={LoginVerification} />
      {/* David end */}
      <Route path="/forgot" component={ForgotPassword} />
      <Route path="/health" component={Health} />
      <Route path="/add-test" component={AddTest} />
      <Route path="/location" component={Location} />
      <Route path="/login-org" component={loginOrg} />
      <Route path="/symptoms" component={Symptoms} />
      <Route path="/result" component={Result} />
      <Route path="/succcess" component={Success} />
      {/* <Route path="/launch" component={Launch} /> */}
      <Route path="/conditions" component={Conditions} />
      <Route path="/background" component={Background} />
      <Route path="/phone-verify-success" component={PhoneVerifySuccess} />
      <Route path="/register" component={VerifyMagicLink} />
      <Route path="/find-test" component={FindTest} />
       <Route path="/result-detail" component={ResultDetail} />
    </Router>
  );
}
