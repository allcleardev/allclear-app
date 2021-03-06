import * as axios from 'axios';
import { get } from 'lodash';
import { history } from '../Router';

export function bootstrapAxios() {
  const AUTH_ROUTES = [
    '/facilities/search',
    'facilities/search',
    '/peoples/register',
    'peoples/register',
    '/peoples/facilities',
    'peoples/facilities',
    '/peoples',
    'peoples',
  ];

  // set baseURL from env file
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

  // REQUEST interceptor
  axios.interceptors.request.use(
    (config) => {
      // routes that require auth
      if (AUTH_ROUTES.includes(config.url)) {
        const sessionID = localStorage.getItem('sessionId');
        const authHeader = sessionID
          ? {
              'X-AllClear-SessionID': sessionID,
            }
          : {};
        return {
          ...config,
          headers: {
            ...authHeader,
            ...config.headers,
          },
        };
      } else {
        // routes that dont require auth
        return config;
      }
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
      if (get(error, 'response.status') === 403) {
        localStorage.removeItem('session');
        localStorage.removeItem('sessionId');
        localStorage.removeItem('appState');
        history.push('/map?logout=true');
      }

      console.warn('response error:', error.response);
      return Promise.reject(error);
    },
  );
}
