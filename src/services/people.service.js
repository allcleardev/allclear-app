import Axios from 'axios';

export default class PeopleService {
  static serviceInstance = null;

  constructor() {
    this.baseURL = '/peoples';
    this.sessionId = localStorage.getItem('sessid');
  }

  static getInstance() {
    if (PeopleService.serviceInstance == null) {
      PeopleService.serviceInstance = new PeopleService();
    }

    return this.serviceInstance;
  }

  getById(id) {
    return Axios.get(`${this.baseURL}/${id}`, {
      headers: {
        'X-AllClear-SessionID': this.sessionId,
      },
    });
  }
}
