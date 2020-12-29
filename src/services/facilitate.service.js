import Axios from 'axios';

export default class FacilitateService {
  static serviceInstance = null;

  constructor() {
    this.baseURL = '/facilitates';
    this._setAuthHeaders();
  }

  static getInstance() {
    if (FacilitateService.serviceInstance == null) {
      FacilitateService.serviceInstance = new FacilitateService();
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

  async addFacilityByCitizen(body) {
    try {
      const response = await Axios({
        method: 'POST',
        url: `${this.baseURL}/citizen`,
        data: body,
      });
      return response;
    } catch (e) {
      const error = {
        error: true,
        ...e.response,
      };
      return error;
    }
  }

  async changeFacilityByCitizen(body) {
    try {
      const response = await Axios({
        method: 'PUT',
        url: `${this.baseURL}/citizen`,
        data: body,
      });
      return response;
    } catch (e) {
      const error = {
        error: true,
        ...e.response,
      };
      return error;
    }
  }
}
