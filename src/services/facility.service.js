
export default class FacilityService {

  static serviceInstance = null;

  // constructor() {}

  static getInstance() {
    if (FacilityService.serviceInstance == null) {
      FacilityService.serviceInstance = new FacilityService();
    }

    return this.serviceInstance;
  }

  search(filter){

  }

}
