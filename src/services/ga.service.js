import ReactGA from 'react-ga';

export default class GAService {
  static serviceInstance = null;

  constructor() {
    this.isLocalDevBuild = process.env.NODE_ENV === 'development';

    if (!this.isLocalDevBuild) {
      ga('set', 'appName', 'allclear');
    }
  }

  static getInstance() {
    if (GAService.serviceInstance == null) {
      GAService.serviceInstance = new GAService();
    }

    return this.serviceInstance;
  }

  setScreenName(name) {
    if (!this.isLocalDevBuild) {
      ga('screen_class', {screenName: name});
    }
  }

  sendEvent(name, params) {
    if (!this.isLocalDevBuild) {
      ga('event', name, params);
    }
  }
}

export const GA_EVENT_MAP = {
  directions: 'directions_button_click',
  call: 'call_button_clicked',
  expand: 'list_item_expand',
  contract: 'list_item_contract'
};

export function MAP_PAGE_GA_EVENTS(testingSiteId, testingSiteName, buttonIndex, enabledFilters) {
  return {
    testingSiteName: `${testingSiteName}`,
    testingSiteId,
    listIndex: `${buttonIndex}`,
    enabledFilters
  };
}
