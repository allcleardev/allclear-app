import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './map-marker.js';
import MyLocationBtn from './my-location-btn';
import FacilityService from '../../services/facility.service.js';
import {bindAll, findIndex, get} from 'lodash';
import {AppContext} from '@contexts/app.context';
import MyLocationMapMarker from './my-location-map-marker.js';
import SnackbarMessage from '@general/alerts/snackbar-message';
import GAService from '@services/ga.service';
import MapService from '@services/map.service';
import {withRouter} from 'react-router';
import {G_MAP_DEFAULTS, G_MAP_OPTIONS} from '@util/map.constants';
import {clickMapMarker, getRouteQueryParams} from '@util/general.helpers';

class GoogleMap extends Component {
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
      'onMapDragEnd',
      'onZoomChanged',
      'onMyLocationClicked',
      'onLocationAccepted',
      '_panTo',
      '_setLocations',
      '_createSearchPayload',
      '_search',
      'handleSnackbarClose',
    ]);
    this.gMapRef = React.createRef();
    this.facilityService = FacilityService.getInstance();

    this.gaService = GAService.getInstance();
    this.gaService.setScreenName('map');

    this.mapService = MapService.getInstance();
    this.mapService.onLocationAccepted = this.onLocationAccepted;
  }

  async componentDidMount() {
    const {appState} = this.context;
    let latitude = get(appState, 'person.latitude');
    let longitude = get(appState, 'person.longitude');

    const params = getRouteQueryParams(this.props.location);
    const urlLat = get(params, 'search.latitude');
    const urlLong = get(params, 'search.longitude');
    this.isLoggedIn = get(appState, 'person.id');

    // not logged in

    if (urlLat && urlLong) {
      latitude = urlLat;
      longitude = urlLong;
    } else if (!latitude || !longitude) {

      // if IP check succeeded, use that
      let ipData = await this.mapService.ipCheck()
        .catch(() => {
          this.setState({
            isSnackbarOpen: true,
            snackbarMessage: 'Enter your location to see results near you.',
            snackbarSeverity: 'info'
          });
          latitude = G_MAP_DEFAULTS.center.lat;
          longitude = G_MAP_DEFAULTS.center.lng;
        });

      latitude = get(ipData, 'data.lat');
      longitude = get(ipData, 'data.lon');

      // if IP check failed too, just use defaults (NYC)
      if (!latitude || !longitude) {
        this.setState({
          isSnackbarOpen: true,
          snackbarMessage: 'Enter your location to see results near you.',
          snackbarSeverity: 'info',
        });
        latitude = G_MAP_DEFAULTS.center.lat;
        longitude = G_MAP_DEFAULTS.center.lng;
      }
    }

    const result = await this.facilityService.search(this._createSearchPayload({latitude, longitude}));

    // finally, select a pin if its in the url
    const selection = get(params, 'selection');
    const locations = get(result, 'data.records');
    this._setLocations(locations, {latitude, longitude});
    latitude && longitude && this._panTo(latitude, longitude);

    if (selection) {
      const index = findIndex(locations, ['name', selection]);
      if (index !== -1) {
        clickMapMarker(appState, index, this.props.history, locations);
      }
    }

  }

  handleSnackbarClose() {
    this.setState({
      isSnackbarOpen: false,
    });
  }

  /******************************************************************
   * MAP INTERACTION EVENT HANDLERS
   ******************************************************************/

  onMapDragEnd(evt) {
    this.mapService.onLocationCleared(null,null,'clear');
    const latitude = evt.center.lat();
    const longitude = evt.center.lng();
    this._search(latitude, longitude);
  }

  onZoomChanged(miles,z,t) {
    // console.log('zoom changed', ...arguments)
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

    this.mapService.mapRef = this.gMapRef;

    setAppState({
      ...appState,
      map: {
        ...appState.map,
        isListLoading: false,
        locations,
      },
    });
  }

  /******************************************************************
   * SEARCH
   ******************************************************************/

  async onLocationAccepted(pos) {

    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;
    const result = await this.facilityService.search(this._createSearchPayload({latitude, longitude}));
    this._setLocations(result.data.records, {
      latitude,
      longitude,
    });
    this._panTo(latitude, longitude);

  };

  _createSearchPayload({latitude, longitude, shouldIgnoreFilters = false}) {
    const {appState, setAppState} = this.context;
    const searchCriteria = shouldIgnoreFilters ? {} : appState.searchCriteria;

    setAppState({
      ...appState,
      map: {
        ...appState.map,
        isListLoading: true,
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
      <div className="google-map" style={{ height: '100%', width: '100%' }} onClick={this.props.onMapClick}>
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
          bootstrapURLKeys={{ key: 'AIzaSyAPB7ER1lGxDSZICjq9lmqgxvnlSJCIuYw' }}
          defaultCenter={G_MAP_DEFAULTS.center}
          defaultZoom={G_MAP_DEFAULTS.zoom}
          zoom={this.state.zoom}
          yesIWantToUseGoogleMapApiInternals
          onDragEnd={(evt) => this.onMapDragEnd(evt)}
          onZoomChanged={(evt) => this.onMapDragEnd(evt)}
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
          <MyLocationMapMarker key={homeIndex} lat={homeLat} lng={homeLng} />
        </GoogleMapReact>
        {this.isLoggedIn && (
          <MyLocationBtn aria-label="Go to Profile Location" onClick={() => this.onMyLocationClicked()} />
        )}
      </div>
    );
  }
}

export default withRouter(GoogleMap);
