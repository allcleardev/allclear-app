import React from 'react';
import ReactDOM from 'react-dom';
import { colorLog } from './util/helpers';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import App from './App';
import theme from './theme';

import * as serviceWorker from './serviceWorker';
import {bootstrapAxios} from './util/bootstrap.helpers';

//Initiate LogRocket
LogRocket.init('jeskuj/allclear');
setupLogRocketReact(LogRocket);


bootstrapAxios();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

colorLog('blue', `Allclear App v${process.env.REACT_APP_VERSION}`);
colorLog('red', `Built at: ${process.env.REACT_APP_BUILT_AT}`);
colorLog('green', `Current ENV: ${process.env.REACT_APP_BASE_URL}`);

// for HMR
if (module.hot && process.env.NODE_ENV !== 'production') {
  console.log('%c ===== Hot Reload ===== ', 'background: #222; color: #bada55');
  module.hot.accept();
}

