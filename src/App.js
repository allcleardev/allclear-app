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

export default function App() {
  return (
    <Router>
        <Box>
          <TopNavBar />
          <SimpleBottomNavigation />
        </Box>
        <Route exact path="/" component={Home}/>
        <Route path="/health" component={Health} />
        <Route path="/location" component={Location}/>
        <Route path="/login" component={login} />
        <Route path="/register" component={SignIn} />
      </Router>
  );
}
