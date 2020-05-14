import React from 'react';
import {hydrate, render} from 'react-dom';
import {colorLog} from '@util/general.helpers';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';

import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/core/styles';

import theme from './theme';
import Router from './Router';

import * as serviceWorker from './service-worker';
import {bootstrapAxios} from '@util/bootstrap.helpers';
import GAService from '@services/ga.service';

import 'typeface-heebo';

const isLocalDevBuild = process.env.NODE_ENV === 'development';

// run GA and logrocket on deployed versions of the app
if (!isLocalDevBuild) {

  GAService.getInstance().initialize();

  //Initiate LogRocket
  LogRocket.init('jeskuj/allclear');
  setupLogRocketReact(LogRocket);
}

bootstrapAxios();

// remove loader, make root visible
const el = document.getElementById('loader__container');
el && el.parentNode.removeChild(el);

const appRoot = document.getElementById('root');
appRoot.style.display = 'flex';

const rootElement = document.getElementById('root');
const app = (
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline/>
    <Router/>
  </ThemeProvider>);
if (rootElement.hasChildNodes()) {
  hydrate(app, rootElement);
} else {
  render(app, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

colorLog('blue', `Allclear App v${process.env.REACT_APP_VERSION} | ${process.env.NODE_ENV || 'production'} build`);
colorLog('red', `Built at: ${process.env.REACT_APP_BUILT_AT}`);
colorLog('green', `Current ENV: ${process.env.REACT_APP_BASE_URL}`);

// for HMR
if (module.hot && process.env.NODE_ENV !== 'production') {
  console.log('%c ===== Hot Reload ===== ', 'background: #222; color: #bada55');
  module.hot.accept();
}
