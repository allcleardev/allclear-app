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

export default function App() {
  return (
    <Router>
      <Route path="/launch" component={Launch} />
      <Route path="/create-account" component={CreateAccount} />
      <Route path="/phone-verify" component={PhoneVerify} />
    </Router>
  );
}