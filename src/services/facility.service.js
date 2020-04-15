import Axios from 'axios';

export default class FacilityService {

  static serviceInstance = null;

  constructor() {
    this.baseURL = '/facilities';
  }

  static getInstance() {
    if (FacilityService.serviceInstance == null) {
      FacilityService.serviceInstance = new FacilityService();
    }

    return this.serviceInstance;
  }

  search(body){
    return Axios({
      method: 'POST',
      url: `${this.baseURL}/search`,
      // params: req.query,
      data: body,
    });
  }

}
