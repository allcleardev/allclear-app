import React, { useState} from 'react';
import {Route, Switch, Router as ReactRouter} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {Helmet} from 'react-helmet';

import '@styles/app.scss';

import AppProvider from './contexts/app.context';
import AccountCreated from '@pages/account-created.page';
import AddTestPage from '@pages/add-test.page';
import SignInVerificationPage from '@pages/sign-in-verification.page';
import BackgroundPage from '@pages/background.page';
import GetStartedPage from '@pages/get-started.page';
import HealthWorkerStatusPage from '@pages/health-worker-status.page';
import SignInPage from '@pages/sign-in.page';
import LoginMagicLinkPage from '@pages/login-magic-link.page';
import HomePage from '@pages/home.page';
import MapPage from '@pages/map.page';
import ProfileEditPage from '@pages/profile-edit.page';
import ProfileViewPage from '@pages/profile-view.page';
import ProtectedRoute from '@routes/protected.route';
import SettingsPage from '@pages/settings.page';
import SignUpVerificationPage from '@pages/sign-up-verification.page';
import SplashPage from '@pages/splash.page';
import Symptoms from '@pages/symptoms.page';
import TracingPage from '@pages/tracing.page';
import VerifyMagicLinkPage from '@pages/verify-magic-link.page';
import NotFoundPage from '@pages/not-found.page';
import {Redirect} from 'react-router';
import SignUpPage from '@pages/sign-up.page';
import LogoutPage from '@pages/logout.page';
import TestCenterPage from '@pages/test-center.page';
import StateListPage from '@pages/state-list.page';
import StatePage from '@pages/state.page';
import CityPage from '@pages/city.page';
import MetadataService from '@services/metadata.service';

export const history = createBrowserHistory();

export default function Router() {
  const metadataService = MetadataService.getInstance();
  const initialPageState = {
    title: 'AllClear | Find COVID-19 tests near you',
    description: `AllClear has the largest database of COVID-19 test centers in the country.
          Each listing is manually verified and regularly checked for updates and changes.`
  };
  const [pageState, setPageState] = useState(initialPageState);
  metadataService.setPageHead = setPageHead;

  function setPageHead({title, description}){

    // reset if its an unmount
    title = (title === 'RESET') ? initialPageState.title : title;
    description = (title === 'RESET') ? initialPageState.description : description;

    setPageState({
      title,
      description
    });
  }

  return (
    <ReactRouter
      history={history}
    >
      <Helmet>
        <meta charSet='utf-8'/>
        <meta charSet='utf-8'/>
        <title>{pageState.title}</title>
        <meta
          name="description"
          content={pageState.description}
        />
      </Helmet>
      <AppProvider>
        <Switch>
          {/* Loader Page */}
          {/*<Route exact path="/" component={LaunchPage} />*/}

          {/* Onboarding flow start page */}
          {/*<Route exact path="/" component={GetStartedPage} />*/}

          <Route exact path="/">
            <Redirect to="/map"/>
          </Route>

          {/* Onboarding Pages */}
          <Route path="/get-started" component={GetStartedPage}/>
          <Route path="/create-account" component={SplashPage}/>
          <Route path="/sign-up" component={SignUpPage}/>
          <Route path="/sign-up-verification" component={SignUpVerificationPage}/>
          <ProtectedRoute path="/success" component={AccountCreated}/>

          {/* Auth Pages */}
          <Route path="/register" component={VerifyMagicLinkPage}/>
          <Route path="/auth" component={LoginMagicLinkPage}/>
          <Route path="/sign-in" component={SignInPage}/>
          <Route path="/logout" component={LogoutPage}/>
          <Route path="/sign-in-verification" component={SignInVerificationPage}/>

          {/* Profile Creation */}
          <Route path="/location" component={BackgroundPage}/>
          <Route path="/health-worker" component={HealthWorkerStatusPage}/>
          <Route path="/symptoms" component={Symptoms}/>

          {/* Profile Pages / SettingsPage */}
          <ProtectedRoute path="/profile" component={ProfileViewPage}/>
          <ProtectedRoute path="/profile-edit" component={ProfileEditPage}/>
          <ProtectedRoute path="/add-test" component={AddTestPage}/>
          <ProtectedRoute path="/settings" component={SettingsPage}/>
          <Route path="/contact-tracing" component={TracingPage}/>

          {/* Home Pages */}
          <ProtectedRoute path="/home" component={HomePage}/>

          {/* Test Center Page */}
          <Route path="/test-centers/:id" component={TestCenterPage}/>
          {/* /:city/:test-center-name */}

          {/* SEO */}
          <Route path="/state-list" component={StateListPage}/>
          <Route exact path="/locations/:state" component={StatePage}/>
          <Route exact path="/locations/:state/:city" component={CityPage}/>
          <Route exact path="/locations/:state/:city/:id" component={TestCenterPage}/>

          {/* Map */}
          <Route path="/map/:state" component={MapPage}/>
          <Route path="/map" component={MapPage}/>

          {/* 404 */}
          <Route path="/404" component={NotFoundPage}/>
          <Route path="*">
            <Redirect to="/404"/>
          </Route>
        </Switch>
      </AppProvider>
    </ReactRouter>
  );
}
