import Axios from 'axios';

export default class PeopleService {
  static serviceInstance = null;

  constructor() {
    this.baseURL = '/peoples';
    this.logoutURL = '/sessions';
    this._setAuthHeaders();
  }

  // todo: all sessions in storage seem to be borked. i monkey patched the appstate value in
  // to the calls that were failing but it needs to actually be fixed for these others to work
  _setAuthHeaders() {
    this.sessionId = localStorage.getItem('sessionId');
    this.headers = {
      headers: {
        'X-AllClear-SessionID': this.sessionId,
      },
    };
  }

  static getInstance() {
    if (PeopleService.serviceInstance == null) {
      PeopleService.serviceInstance = new PeopleService();
    }

    return this.serviceInstance;
  }

  getById(id, currSession) {
    currSession = currSession
      ? {
          'X-AllClear-SessionID': currSession,
        }
      : {
          ...this.headers.headers,
        };
    return Axios({
      method: 'GET',
      url: `${this.baseURL}/${id}`,
      headers: currSession,
    });
  }

  logout(currSession) {
    const headers = (currSession) ? {
      'X-AllClear-SessionID': currSession,
    } : {
      ...this.headers.headers
    };

    return Axios({
      method: 'DELETE',
      url: this.logoutURL,
      headers,
    });
  }

  async editProfile(postData, currSession) {
    currSession = currSession
      ? {
          'X-AllClear-SessionID': currSession,
        }
      : {
          ...this.headers.headers,
        };
    return Axios.put(`${this.baseURL}`, postData, currSession)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  async addFacility(postData) {
    return Axios.post(`${this.baseURL}/facilities`, postData)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  async removeFacility(postData) {
    return Axios.delete(`${this.baseURL}/facilities`, { data: postData })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  async authStart(payload) {
    return Axios.put('/peoples/start', payload, {})
      .then((response) => {
        return response;
      })
      .catch((error) => {
        error.err = true;
        console.warn(error);
        return error;
      });
  }

  async verifyAuthRequest(payload) {
    return Axios.put('/peoples/auth', payload, {})
      .then((response) => {
        return response;
      })
      .catch((error) => {
        error.err = true;
        console.warn(error);
        return error;
      });
  }

  async confirmAuthRequest(payload) {
    return Axios.put('/peoples/confirm', payload, {})
      .then((response) => {
        return response;
      })
      .catch((error) => {
        error.err = true;
        console.warn(error);
        return error;
      });
  }

  async login(payload) {
    return Axios.post('/peoples/auth', payload, {})
      .then((response) => {
        return response;
      })
      .catch((error) => {
        error.err = true;
        console.warn(error);
        return error;
      });
  }

  async deleteProfile(id) {
    return Axios.delete('/peoples')
      .then((response) => {
        localStorage.clear();
        sessionStorage.clear();
        return response;
      })
      .catch((error) => {
        error.err = true;
        console.warn(error);
        return error;
      });
  }
}
