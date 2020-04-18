import Axios from 'axios';

export default class PeopleService {
  static serviceInstance = null;

  constructor() {
    this.baseURL = '/peoples';
    this.logoutURL = '/sessions';
    this.sessionId = localStorage.getItem('sessid');
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

  getById(id) {
    return Axios({
      method: 'GET',
      url: `${this.baseURL}/${id}`,
      headers: {
        ...this.headers.headers
      },
    });
    // return Axios.get(`${this.baseURL}/${id}`, this.headers);
  }

  logout() {
    return Axios.delete(this.logoutURL, this.headers);
  }

  async editProfile(postData) {
    return Axios.put(`${this.baseURL}`, postData, this.headers)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  async register(payload) {
    const sessionId = localStorage.getItem('confirm_sessid');
    return Axios.post('/peoples/register', payload, {
      headers: {
        'X-AllClear-SessionID': sessionId,
      },
    })
      .then((response) => {
        localStorage.removeItem('confirm_sessid');
        localStorage.setItem('sessid', response.data.id);
        localStorage.setItem('session', JSON.stringify(response.data));
        return response;
      })
      .catch((error) => {
        console.warn(error);
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
        console.warn(error);
      });
  }
}
