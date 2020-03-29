import React from 'react';
import './styles/app.scss';

import Launch from './pages/launch';
import CreateAccount from './pages/create-account';
import PhoneVerify from './pages/phone-verify';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import SignIn from './pages/signup';
import login from './pages/login';
import Location from './pages/location';
import Health from './pages/health';
import Home from './pages/home';
import ForgotPassword from './pages/forgot-password';
import Symptom from './pages/Symptom/Symptom';
import Success from './pages/Success/Success';
import Result from './pages/Result/Result';
import Condition from './pages/Condition/Condition';

export default function App() {
  return (
    <Router>
      <Route exact path="/" component={Launch} />
      {/* <Route exact path="/" component={Home} /> */}
      <Route path="/forgot" component={ForgotPassword} />
      <Route path="/health" component={Health} />
      <Route path="/location" component={Location} />
      <Route path="/login" component={login} />
      <Route path="/register" component={SignIn} />
      <Route path="/symptom" component={Symptom} />
      <Route path="/result" component={Result} />
      <Route path="/succcess" component={Success} />
      {/* <Route path="/launch" component={Launch} /> */}
      <Route path="/condition" component={Condition} />
      <Route path="/create-account" component={CreateAccount} />
      <Route path="/phone-verify" component={PhoneVerify} />

    </Router>
  );
}