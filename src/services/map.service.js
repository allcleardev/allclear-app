// "Dependency Injection" but make it bootleg
import Axios from 'axios';

export default class MapService {

  static serviceInstance = null;

  // these get populated from different components once they init
  mapRef;
  onLocationAccepted;

  // constructor() {}

  static getInstance() {
    if (MapService.serviceInstance == null) {
      MapService.serviceInstance = new MapService();
    }

    return this.serviceInstance;
  }

  ipCheck() {
    return Axios({
      method: 'GET',
      url: `http://ip-api.com/json`,
    });
  }


  // registerMapRef(modalName, toggleFunc){
  //   this.modalRefs[modalName] = toggleFunc;
  // }

}
