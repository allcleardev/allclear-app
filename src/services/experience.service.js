import Axios from 'axios';
import { forEach } from 'lodash';

export default class ExperienceService {
  static serviceInstance = null;

  constructor() {
    this.baseURL = '/experiences';
  }

  static getInstance() {
    if (ExperienceService.serviceInstance == null) {
      ExperienceService.serviceInstance = new ExperienceService();
    }
    return this.serviceInstance;
  }

  search(sessionId, body){ 
    forEach(body, (value, key) => {
      // remove filter from both places
      if (value === 'Any') {
        delete body[key];
      }
    });  

    return Axios({
      method: 'POST',
      url: `${this.baseURL}/search`,
      headers: { 'X-AllClear-SessionID': sessionId }, 
      data: body
    });
  }

  add(sessionId, body){  
    return Axios({ 
      method: 'POST',  
      url:`${this.baseURL}`,  
      headers: { 'X-AllClear-SessionID': sessionId }, 
      data: body
    });
  }

  calcByFacility(facilityId) {
    return Axios({
      method: 'GET',
      url: `${this.baseURL}/calc`,
      params: {facilityId}
    });
  }
}
