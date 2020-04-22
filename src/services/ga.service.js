import ReactGA from 'react-ga';

export default class GAService {
  static serviceInstance = null;

  constructor() {
    this.isLocalDevBuild = process.env.NODE_ENV === 'development';
  }

  static getInstance() {
    if (GAService.serviceInstance == null) {
      GAService.serviceInstance = new GAService();
    }

    return this.serviceInstance;
  }

  setScreenName(name) {
    if (!this.isLocalDevBuild) {
      ReactGA.ga('set', 'screen_class', name);
    }
  }

  sendEvent(name, params) {
    if (!this.isLocalDevBuild) {
      ReactGA.ga('event', name, params);
    }
  }
}

export function MAP_PAGE_GA_EVENTS(testingSiteName, buttonIndex, ...filters) {

}