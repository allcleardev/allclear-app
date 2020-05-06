import Axios from 'axios';
import { forEach } from 'lodash';

export default class FacilityService {
  static serviceInstance = null;

  constructor() {
    this.baseURL = '/facilities';
    this._setAuthHeaders();
  }

  static getInstance() {
    if (FacilityService.serviceInstance == null) {
      FacilityService.serviceInstance = new FacilityService();
    }

    return this.serviceInstance;
  }

  _setAuthHeaders() {
    this.sessionId = localStorage.getItem('sessionId');
    this.headers = {
      headers: {
        'X-AllClear-SessionID': this.sessionId,
      },
    };
  }

  _getCurrSession(currSession) {
    return currSession
      ? { 'X-AllClear-SessionID': currSession }
      : { ...this.headers.headers };
  }

  search(body) {
    // cleanup filters before sending
    forEach(body, (value, key) => {
      // remove filter from both places
      if (value === 'Any') {
        delete body[key];
      }
    });

    return Axios({
      method: 'POST',
      url: `${this.baseURL}/search`,
      data: body,
    });
  }

  getFacility(id) {
    return Axios({
      method: 'GET',
      url: `${this.baseURL}/${id}`,
    });
  }

  getStates() {
    return Axios({
      method: 'GET',
      url: `${this.baseURL}/states`,
    });
  }

  getCities(state) {
    return Axios({
      method: 'GET',
      url: `${this.baseURL}/cities`,
      params: {state}
    });
  }

}
