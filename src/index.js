import React from 'react';
import ReactDOM from 'react-dom';
import { colorLog } from './util/helpers';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import App from './App';
import theme from './theme';

import * as serviceWorker from './serviceWorker';
import * as axios from 'axios';

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

function bootstrapAxios() {
  // set baseURL from env file
  axios.defaults.baseURL = 'https://api-dev.allclear.app';

  // REQUEST interceptor
  axios.interceptors.request.use(
    (config) => {
      // const sessionID = localStorage.getItem('sessid');
      // const authHeader = sessionID
      //   ? {
      //       'X-AllClear-SessionID': sessionID,
      //     }
      //   : {};

      return {
        ...config,
        headers: {
          ...config.headers,
        },
      };
    },
    (error) => {
      // Do something with request error
      console.warn('request error:', error);
      return Promise.reject(error);
    },
  );

  // RESPONSE interceptor
  axios.interceptors.response.use(
    (response) => {
      // Do something with response data
      return response;
    },
    (error) => {
      console.warn('response error:', error.response);
      return Promise.reject(error);
    },
  );
}
