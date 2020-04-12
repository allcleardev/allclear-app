import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './map-marker.jsx';
import FacilityService from '../../services/facility.service.js';
import MapPageContext from '../../contexts/MapPage.context';
import {bindAll} from 'lodash';

export default class GoogleMap extends Component {
  static contextType = MapPageContext;

  constructor(props) {
    super(props);

    bindAll(this, ['componentDidMount',
      'onMarkerDragEnd',
      'onMarkerZoomChanged',
      '_setLocations',
      '_onLocationDeclined',
      '_onLocationAccepted',
    ]);
    this.gMap = React.createRef();
    this.facilityService = FacilityService.getInstance();

  }

  static defaultProps = {
    center: {
      // todo: set latlng to appprovider here - get
      lat: undefined,
      lng: undefined,
    },
    zoom: 12,
  };

  async componentDidMount() {
    const {lat, lng} = this.props.center;
    const result = await this.facilityService.search({
        from: {
            latitude: lat,
            longitude: lng,
            miles: 100
          }
      }
    );
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._onLocationAccepted, this._onLocationDeclined);
    }
    this._setLocations(result.data.records, {lat, lng});

  }

  async onMarkerDragEnd(evt) {
    const lat = evt.center.lat();
    const lng = evt.center.lng();
    const result = await this.facilityService.search({
        from: {
            latitude: lat,
            longitude: lng,
            miles: 100
          }
      }
    );

    this._setLocations(result.data.records, {lat, lng});
  }

  async onMarkerZoomChanged(evt) {
    const lat = evt.center.lat();
    const lng = evt.center.lng();
    const result = await this.facilityService.search({
        from: {
            latitude: lat,
            longitude: lng,
            miles: 100
          }
      }
    );

    this._setLocations(result.data.records, {lat, lng});
  }

  _setLocations(locations) {

    // update context state (for other components in map page)
    const {setMapPageState, mapPageState} = this.context;
    setMapPageState({
      ...mapPageState,
      locations
    });
  }

  async _onLocationAccepted(pos) {
    // console.warn('location ACCEPTED');
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    //eslint-disable-next-line
    const currBrowserLocation = new google.maps.LatLng(lat, lng);
    this.gMap && this.gMap.current.map_.panTo(currBrowserLocation);
    const result = await this.facilityService.search({
        from: {
            latitude: lat,
            longitude: lng,
            miles: 100
          }
      }
    );

    this._setLocations(result.data.records, {
      lat,
      lng
    });
  }

  _onLocationDeclined() {
    // console.warn('location DECLINED');
    // todo: snackbar here
    console.warn('User declined to use browser location');
  }

  render() {
    const {locations} = this.context.mapPageState;
    return (
      <div style={{height: '100%', width: '100%'}}>
        <GoogleMapReact
          ref={this.gMap}
          options={G_MAP_OPTIONS}
          bootstrapURLKeys={{key: 'AIzaSyAPB7ER1lGxDSZICjq9lmqgxvnlSJCIuYw'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onDragEnd={(evt) => this.onMarkerDragEnd(evt)}
          onZoomChanged={(evt) => this.onMarkerDragEnd(evt)}
        >
          {locations.map((data, index) => (
            <MapMarker
              key={index}
              index={index}
              lat={data.latitude}
              lng={data.longitude}
              text={index + 1}
            />
          ))}
        </GoogleMapReact>
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
};
