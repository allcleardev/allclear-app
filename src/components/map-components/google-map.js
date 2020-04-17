import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './map-marker.jsx';
import MyLocationBtn from './my-location-btn';
import FacilityService from '../../services/facility.service.js';
import { bindAll, get } from 'lodash';
import { AppContext } from '../../contexts/App.context';

export default class GoogleMap extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

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
    ]);
    this.gMap = React.createRef();
    this.facilityService = FacilityService.getInstance();
    // this.onEventTest = props.onEventTest.bind(this);

    console.log('props', this);
  }

  async componentDidMount() {
    const { appState } = this.context;
    const latitude = get(appState, 'person.latitude');
    const longitude = get(appState, 'person.longitude');
    const result = await this.facilityService.search(this._createSearchPayload({ latitude, longitude }));
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._onLocationAccepted, this._onLocationDeclined);
    }
    this._setLocations(result.data.records, { latitude, longitude });
    latitude && longitude && this._panTo(latitude, longitude);
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
    const { appState } = this.context;
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
    if (get(this, 'gMap.current.map_.panTo')) {
      this.gMap.current.map_.panTo(currBrowserLocation);
    }
  }

  _setLocations(locations) {
    // update context state (for other components in map page)
    const { setAppState, appState } = this.context;
    setAppState({
      ...appState,
      map: {
        ...appState.map,
        locations,
      },
      isListLoading: false,
    });
  }

  async _onLocationAccepted(pos) {
    // console.warn('location ACCEPTED');
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;
    this._panTo(latitude, longitude);
    const result = await this.facilityService.search(this._createSearchPayload({ latitude, longitude }));

    this._setLocations(result.data.records, {
      latitude,
      longitude,
    });
  }

  _onLocationDeclined() {
    // console.warn('location DECLINED');
    // todo: snackbar here
    console.warn('User declined to use browser location');
  }

  /******************************************************************
   * SEARCH
   ******************************************************************/

  _createSearchPayload({ latitude, longitude, shouldIgnoreFilters = false }) {
    const { appState } = this.context;
    const searchCriteria = shouldIgnoreFilters ? {} : appState.searchCriteria;
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
    const result = await this.facilityService.search(this._createSearchPayload({ latitude, longitude }));
    this._setLocations(result.data.records, {
      latitude,
      longitude,
    });
  }

  render() {
    const locations = get(this, 'context.appState.map.locations') || [];

    return (
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          ref={this.gMap}
          options={G_MAP_OPTIONS}
          bootstrapURLKeys={{ key: 'AIzaSyAPB7ER1lGxDSZICjq9lmqgxvnlSJCIuYw' }}
          defaultCenter={G_MAP_DEFAULTS.center}
          defaultZoom={G_MAP_DEFAULTS.zoom}
          onDragEnd={(evt) => this.onMarkerDragEnd(evt)}
          onZoomChanged={(evt) => this.onMarkerDragEnd(evt)}
          onZoomAnimationEnd={(evt) => this.onZoomChanged(evt)}
        >
          {locations.map((data, index) => (
            <MapMarker key={index} index={index} lat={data.latitude} lng={data.longitude} text={index + 1} />
          ))}
        </GoogleMapReact>
        <MyLocationBtn aria-label="Go to Profile Location" onClick={() => this.onMyLocationClicked()} />
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
    lat: 2,
    lng: 2,
  },
  zoom: 12,
};
