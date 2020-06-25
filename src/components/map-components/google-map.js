import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './map-marker.js';
import MyLocationBtn from './my-location-btn';
import {bindAll, findIndex, get, isError} from 'lodash';
import {AppContext} from '@contexts/app.context';
import MyLocationMapMarker from './my-location-map-marker.js';
import SnackbarMessage from '@general/alerts/snackbar-message';
import GAService from '@services/ga.service';
import MapService from '@services/map.service';
import FacilityService from '@services/facility.service.js';
import {withRouter} from 'react-router';
import {G_MAP_DEFAULTS, G_MAP_OPTIONS, NON_STATES, US_STATES} from '@constants/map.constants';
import {clickMapMarker, getRouteQueryParams, isTaggableLocation} from '@util/general.helpers';
import {geocodeByAddress} from 'react-places-autocomplete';

class GoogleMap extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      isSnackbarOpen: false,
      snackbarMessage: 'Browser location declined. Using location from your profile instead.',
      snackbarSeverity: 'warning',
      circle: undefined,
      searchRadius: undefined,
      mapInitDidComplete: false,
    };

    bindAll(this, [
      'onMapReady',
      'onMapDragEnd',
      'onZoomChanged',
      'onMyLocationClicked',
      'onLocationAccepted',
      '_panTo',
      '_setLocations',
      '_createSearchPayload',
      '_search',
      'handleSnackbarClose',
      '_zoomToResults',
      '_getMapRadiusInMiles',
    ]);
    this.gMapRef = React.createRef();
    this.facilityService = FacilityService.getInstance();

    this.gaService = GAService.getInstance();
    this.gaService.setScreenName('map');

    this.mapService = MapService.getInstance();
    this.mapService.onLocationAccepted = this.onLocationAccepted;
  }

  async onMapReady() {
    const {appState} = this.context;
    let latitude = get(appState, 'person.latitude');
    let longitude = get(appState, 'person.longitude');

    const params = getRouteQueryParams(this.props.location);
    const urlLat = get(params, 'search.latitude');
    const urlLong = get(params, 'search.longitude');
    this.isLoggedIn = get(appState, 'person.id');
    let state = this.props.match.params.state;

    // eslint-disable-next-line
    let selection;
    let isNonState;
    let isState;
    let notAStateAtAll = false;

    const urlID = get(params, 'selection');

    // deep link from facility
    if (urlID) {
      const resp = await this.facilityService.getFacility(urlID);
      latitude = get(resp, 'data.latitude');
      longitude = get(resp, 'data.longitude');
      selection = resp.data;
    } else if (state) {
      // state in url

      // check if its actually a state, it will change the necessary search term
      isNonState = NON_STATES.includes(state.toLowerCase());
      isState = US_STATES.includes(state.toLowerCase());

      let searchTerm;
      if (isNonState) {
        searchTerm = state;
      } else if (isState) {
        searchTerm = `state of ${state}`;
        isState = true;
      } else {
        // other search terms
        searchTerm = state;
        notAStateAtAll = true;
      }

      const results = await geocodeByAddress(searchTerm).catch((error) => {
        console.error('GEOCODE ERROR', error);
        return new Error(error);
      });

      const map = get(this, 'gMapRef.current.map_');
      const stateViewport = get(results, '[0].geometry.viewport');

      if (!isError(results)) {
        map.fitBounds(stateViewport);
      }
    } else if (urlLat && urlLong) {
      // deep link from search term
      latitude = urlLat;
      longitude = urlLong;
    } else if (!latitude || !longitude) {
      // if IP check succeeded, use that
      let ipData = await this.mapService.ipCheck().catch(() => {
        this.setState({
          isSnackbarOpen: true,
          snackbarMessage: 'Enter your location to see results near you.',
          snackbarSeverity: 'info',
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
    } else {
      // logged in profile stuff will go here
    }

    this._getMapRadiusInMiles();

    // only send states or non states to BE, other search terms are not supported
    state = isNonState || isState ? state : undefined;

    // counties etc
    if (notAStateAtAll) {
      const map = get(this, 'gMapRef.current.map_');
      const center = map.getCenter();
      latitude = center.lat();
      longitude = center.lng();
    }

    // TODO: make this use _search instead, check ?selection parameter still works when doing so
    const result = await this.facilityService.search(this._createSearchPayload({latitude, longitude, state}))
      .catch((err) => {
        this.setState({
          isSnackbarOpen: true,
          snackbarMessage: 'Test Center Search Failed. Please Try Again.',
          snackbarSeverity: 'error',
        });
      });

    const locations = get(result, 'data.records');
    this._setLocations(locations, {latitude, longitude});
    latitude && longitude && this._panTo(latitude, longitude);

    // zoom to the appropriate level that matches the current result set
    this._zoomToResults(locations);

    // message about state zoom if applicable
    if (isState) {
      this.setState({
        isSnackbarOpen: true,
        snackbarMessage: 'Move the map to view more results in your state',
        snackbarSeverity: 'info',
      });
    }

    // finally, select a pin if its in the url
    if (urlID) {
      const index = findIndex(locations, ['id', Number(urlID)]);
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
    const {searchCriteria} = this.context.appState;
    // clear search input + query params on pan
    this.mapService.onLocationCleared(null, null, 'clear', searchCriteria);
    const latitude = evt.center.lat();
    const longitude = evt.center.lng();
    this._search(latitude, longitude);
  }

  onZoomChanged() {
    // console.log('zoom changed', zoomLevel);
    // console.log('new zoom radius', this._getMapRadiusInMiles());
    // console.log('new zoom radius - meters', milesToMeters(this._getMapRadiusInMiles()) );
    this._getMapRadiusInMiles();

    const lat = get(this, 'gMapRef.current.map_.center').lat();
    const lng = get(this, 'gMapRef.current.map_.center').lng();

    // skip search if happening on mount
    const {mapInitDidComplete} = this.state;
    if (mapInitDidComplete) {
      this._search(lat, lng);
    } else {
      this.setState({
        ...this.state,
        mapInitDidComplete: true,
      });
    }
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

  _zoomToResults(results) {
    // clear current circle
    this.state.circle && this.state.circle.setMap(null);

    // find furthest distance in results set
    const furthestIndex = get(results, 'length') - 1;
    const furthestMeters = get(results, `[${furthestIndex}].meters`);
    const map = get(this, 'gMapRef.current.map_');

    // this will fail if state is in the url
    if (furthestMeters) {
      const circle = this._createCircle(furthestMeters);
      map.fitBounds(circle.getBounds());
      this.setState({
        ...this.state,
        circle,
      });
    }
  }

  _getMapRadiusInMiles() {
    const map = get(this, 'gMapRef.current.map_');
    const bounds = map.getBounds();

    const center = bounds.getCenter();
    const ne = bounds.getNorthEast();

    // r = radius of the earth in statute miles
    const earthRadius = 3963.0;

    // Convert lat or lng from decimal degrees into radians (divide by 57.2958)
    const lat1 = center.lat() / 57.2958;
    const lon1 = center.lng() / 57.2958;
    const lat2 = ne.lat() / 57.2958;
    const lon2 = ne.lng() / 57.2958;

    // distance = circle radius from center to Northeast corner of bounds
    const radius =
      earthRadius *
      Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));

    this.setState({
      ...this.state,
      searchRadius: radius,
    });

    return radius;
    // todo: decide if double or not
    // return radius*2;
  }

  _createCircle(radius) {
    const map = get(this, 'gMapRef.current.map_');

    //eslint-disable-next-line
    return new google.maps.Circle({
      center: map.center,
      radius,
      fillOpacity: 0,
      // strokeOpacity: 0.2,
      strokeOpacity: 0,
      map,
    });
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
    const locations = get(result, 'data.records');
    this._zoomToResults(locations);
  }

  _createSearchPayload({latitude, longitude, state, shouldIgnoreFilters = false}) {
    const {appState, setAppState} = this.context;
    const searchCriteria = shouldIgnoreFilters ? {} : appState.searchCriteria;

    // lastAlertedAt comes from alert auto-login, use it in search if it exists (and is already unencoded)
    let {lastAlertedAt: createdAtFrom} = getRouteQueryParams(this.props.location);
    if(createdAtFrom){
      createdAtFrom = createdAtFrom.replace(' ', '+');
    }

    setAppState({
      ...appState,
      map: {
        ...appState.map,
        isListLoading: true,
        latitude,
        longitude,
      },
    });

    return {
      ...searchCriteria,
      state,
      // pageSize: 50, // todo: for bigger results sets
      createdAtFrom,
      from: {
        latitude,
        longitude,
        miles: this.state.searchRadius || 100,
      },
    };
  }

  async _search(latitude, longitude, state) {
    const result = await this.facilityService.search(this._createSearchPayload({latitude, longitude, state}))
      .catch((err) => {
        this.setState({
          isSnackbarOpen: true,
          snackbarMessage: 'Test Center Search Failed. Please Try Again.',
          snackbarSeverity: 'error',
        });
      });
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
      <div className="google-map" style={{height: '100%', width: '100%'}} onClick={this.props.onMapClick}>
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
          zoom={G_MAP_DEFAULTS.zoom}
          yesIWantToUseGoogleMapApiInternals
          onDragEnd={(evt) => this.onMapDragEnd(evt)}
          onZoomAnimationEnd={(evt) => this.onZoomChanged(evt)}
          onGoogleApiLoaded={() => this.onMapReady()}
        >
          {locations.map((data, index) => {
            const isNew = isTaggableLocation(data.updatedAt);
            return (
              <MapMarker
                key={index}
                index={index}
                length={locations.length}
                lat={data.latitude}
                lng={data.longitude}
                text={index + 1}
                type={data.testTypes}
                isNew={isNew}
              />
            );
          })}
          <MyLocationMapMarker key={homeIndex} lat={homeLat} lng={homeLng}/>
        </GoogleMapReact>
        {this.isLoggedIn && (
          <MyLocationBtn aria-label="Go to Profile Location" onClick={() => this.onMyLocationClicked()}/>
        )}
      </div>
    );
  }
}

export default withRouter(GoogleMap);
