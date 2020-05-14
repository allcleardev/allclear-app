import {loadScript} from '@util/general.helpers';

export default class GAService {
  static serviceInstance = null;

  constructor() {
    this.gaEnabled = false;

    if (process.env.NODE_ENV !== 'development') {
      this.gaEnabled = true;
    }
  }

  static getInstance() {
    if (GAService.serviceInstance == null) {
      GAService.serviceInstance = new GAService();
    }

    return this.serviceInstance;
  }

  gtag() {
    //eslint-disable-next-line
    window.dataLayer.push(arguments);
  }

  initialize() {
    //Initialize GA
    if (this.gaEnabled) {
      loadScript('https://www.googletagmanager.com/gtag/js?id=G-W6BW925QD6');

      //eslint-disable-next-line
      window.dataLayer = window.dataLayer || [];

      this.gtag('js', new Date());
      this.gtag('config', 'G-W6BW925QD6');
    }
  }

  setScreenName(name) {
    if (this.gaEnabled) {
      this.gtag('event', 'screen_view', {
        app_name: 'allclear',
        screen_name : name
      });
    }
  }

  sendEvent(name, params) {
    if (this.gaEnabled) {
      this.gtag('event', name, params);
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
