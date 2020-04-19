import Axios from 'axios';

export default class TypesService {
  static serviceInstance = null;

  constructor() {
    this.baseURL = '/types';
    this.sessionId = localStorage.getItem('sessid');
    this.headers = {
      headers: {
        'X-AllClear-SessionID': this.sessionId,
      },
    };
  }

  static getInstance() {
    if (TypesService.serviceInstance == null) {
      TypesService.serviceInstance = new TypesService();
    }

    return this.serviceInstance;
  }

  async getHealthWorkerStatuses() {
    return Axios.get(`${this.baseURL}/healthWorkerStatuses`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

  async getExposures() {
    return Axios.get(`${this.baseURL}/exposures`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

  async getSymptoms(shouldSkipHeaders) {
    const headers = shouldSkipHeaders ? {} : this.headers;
    return Axios.get(`${this.baseURL}/symptoms`, headers)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }
}
