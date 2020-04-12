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
    return Axios.get(`${this.baseURL}/${id}`, this.headers);
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
}
