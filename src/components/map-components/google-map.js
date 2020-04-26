import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './map-marker.js';
import MyLocationBtn from './my-location-btn';
import FacilityService from '../../services/facility.service.js';
import {bindAll, get} from 'lodash';
import {AppContext} from '@contexts/app.context';
import MyLocationMapMarker from './my-location-map-marker.js';
import SnackbarMessage from '@general/alerts/snackbar-message';
import GAService from '@services/ga.service';

export default class GoogleMap extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      isSnackbarOpen: false,
      snackbarMessage: 'Browser location declined. Using location from your profile instead.',
      snackbarSeverity: 'warning',
      zoom: G_MAP_DEFAULTS.zoom
    };

    bindAll(this, [
      'componentDidMount',
      'onMarkerDragEnd',
      'onMarkerZoomChanged',
      'onZoomChanged',
      'onMyLocationClicked',
      '_panTo',
      '_setLocations',
      '_onLocationAccepted',
      '_onLocationDeclined',
      '_createSearchPayload',
      '_search',
      'handleSnackbarClose',
    ]);
    this.gMapRef = React.createRef();
    this.facilityService = FacilityService.getInstance();
    this.gaService = GAService.getInstance();
    this.gaService.setScreenName('map');
  }

  async componentDidMount() {
    const {appState} = this.context;
    let latitude = get(appState, 'person.latitude');
    let longitude = get(appState, 'person.longitude');

    if (!latitude || !longitude) {
      this.setState({
        isSnackbarOpen: true,
        snackbarMessage: 'Enter your location to see results near you.',
        snackbarSeverity: 'info'
      });
      latitude = G_MAP_DEFAULTS.center.lat;
      longitude = G_MAP_DEFAULTS.center.lng;
    }

    const result = await this.facilityService.search(this._createSearchPayload({latitude, longitude}));
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._onLocationAccepted, this._onLocationDeclined);
    }
    this._setLocations(result.data.records, {latitude, longitude});
    latitude && longitude && this._panTo(latitude, longitude);
  }

  handleSnackbarClose() {
    this.setState({
      isSnackbarOpen: false
    });
  }

  /******************************************************************
   * MAP INTERACTION EVENT HANDLERS
   ******************************************************************/

  async onMarkerDragEnd(evt) {
    const latitude = evt.center.lat();
    const longitude = evt.center.lng();
    this._search(latitude, longitude);
  }

  async onMarkerZoomChanged(evt) {
    const latitude = evt.center.lat();
    const longitude = evt.center.lng();
    this._search(latitude, longitude);
  }

  onZoomChanged(miles) {
    // todo: major work here bro
    // https://stackoverflow.com/questions/52411378/google-maps-api-calculate-zoom-based-of-miles
  }

  onMyLocationClicked() {
    const {appState} = this.context;
    const latitude = get(appState, 'person.latitude');
    const longitude = get(appState, 'person.longitude');
    this._panTo(latitude, longitude);
    this._search(latitude, longitude);
  }

  /******************************************************************
   * MAP INTERACTION EVENT ACTIONS
   ******************************************************************/

  _panTo(latitude, longitude) {
    //eslint-disable-next-line
    const currBrowserLocation = new google.maps.LatLng(latitude, longitude);
    if (get(this, 'gMapRef.current.map_.panTo')) {
      this.gMapRef.current.map_.panTo(currBrowserLocation);
    }
  }

  _setLocations(locations) {
    // update context state (for other components in map page)
    const {setAppState, appState} = this.context;
    setAppState({
      ...appState,
      map: {
        ...appState.map,
        locations,
      },
      isListLoading: false,

      // todo: move this to service
      effects: {
        ...appState.effects,
        map: {
          ...appState.effects.map,
          onLocationAccepted: this._onLocationAccepted,
        }
      }
    });
  }

  async _onLocationAccepted(pos) {
    this.gaService.sendEvent('current_location_enabled', {});
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;
    this._panTo(latitude, longitude);
    const result = await this.facilityService.search(this._createSearchPayload({latitude, longitude}));

    this.setState({
      ...this.state,
      zoom: 12,
    })

    this._setLocations(result.data.records, {
      latitude,
      longitude,
    });
  }

  _onLocationDeclined() {
    const {appState} = this.context;
    const {longitude, latitude} = appState.map;
    this._panTo(latitude, longitude);
    this._search(latitude, longitude);
    this.setState({
      isSnackbarOpen: true,
    });
    console.warn('User declined to use browser location');
  }

  /******************************************************************
   * SEARCH
   ******************************************************************/

  _createSearchPayload({latitude, longitude, shouldIgnoreFilters = false}) {
    const {appState, setAppState} = this.context;
    const searchCriteria = shouldIgnoreFilters ? {} : appState.searchCriteria;

    setAppState({
      ...appState,
      map: {
        ...appState.map,
        latitude,
        longitude
      }
    });

    return {
      ...searchCriteria,
      from: {
        latitude,
        longitude,
        miles: 100,
      },
    };
  }

  async _search(latitude, longitude) {
    const result = await this.facilityService.search(this._createSearchPayload({latitude, longitude}));
    this._setLocations(result.data.records, {
      latitude,
      longitude,
    });
  }

  render() {
    const locations = get(this, 'context.appState.map.locations') || [];
    const homeLat = get(this, 'context.appState.person.latitude');
    const homeLng = get(this, 'context.appState.person.longitude');
    const homeIndex = locations.length;

    return (
      <div style={{height: '100%', width: '100%'}}>

        <SnackbarMessage
          snackbarClass={'snackbar--map'}
          isOpen={this.state.isSnackbarOpen}
          onClose={this.handleSnackbarClose}
          severity={this.state.snackbarSeverity}
          duration={15000}
          message={this.state.snackbarMessage}
        />
        <GoogleMapReact
          ref={this.gMapRef}
          options={G_MAP_OPTIONS}
          bootstrapURLKeys={{key: 'AIzaSyAPB7ER1lGxDSZICjq9lmqgxvnlSJCIuYw'}}
          defaultCenter={G_MAP_DEFAULTS.center}
          defaultZoom={G_MAP_DEFAULTS.zoom}
          zoom={this.state.zoom}
          yesIWantToUseGoogleMapApiInternals
          onDragEnd={(evt) => this.onMarkerDragEnd(evt)}
          onZoomChanged={(evt) => this.onMarkerDragEnd(evt)}
          onZoomAnimationEnd={(evt) => this.onZoomChanged(evt)}
        >
          {locations.map((data, index) => (
            <MapMarker
              key={index}
              index={index}
              length={locations.length}
              lat={data.latitude}
              lng={data.longitude}
              text={index + 1}
            />
          ))}
          <MyLocationMapMarker key={homeIndex} lat={homeLat} lng={homeLng}/>
        </GoogleMapReact>
        <MyLocationBtn aria-label="Go to Profile Location" onClick={() => this.onMyLocationClicked()}/>

      </div>
    );
  }
}

const G_MAP_OPTIONS = {
  styles: [
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative.neighborhood',
      elementType: 'labels.text',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
  ],
  fullscreenControl: false,
};

const G_MAP_DEFAULTS = {
  center: {
    lat: 40.7575139,
    lng: -73.9861322,
  },
  zoom: 12,
};
