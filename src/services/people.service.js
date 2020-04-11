import Axios from 'axios';

export default class PeopleService {
  static serviceInstance = null;

  constructor() {
    this.baseURL = '/peoples';
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
    });
  }
}
