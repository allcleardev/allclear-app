import React from 'react';
import Box from '@material-ui/core/Box';
import SimpleBottomNavigation from './components/bottom-navigation'
import TopNavBar from './components/top-appbar'

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
import Symptom from './pages/Symptom/Symptom'
import Result from './pages/Result/Result'

export default function App() {
  return (
    <Router>
      <Box>
        {/* <TopNavBar />
        <SimpleBottomNavigation /> */}
      </Box>
      <Route exact path="/" component={Home} />
      <Route path="/forgot" component={ForgotPassword} />
      <Route path="/health" component={Health} />
      <Route path="/location" component={Location} />
      <Route path="/login" component={login} />
      <Route path="/register" component={SignIn} />
      <Route path="/symptom" component={Symptom} />
      <Route path="/result" component={Result} />
    </Router>
  );
}
