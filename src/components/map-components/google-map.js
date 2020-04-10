import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './../map-components/mapMarker.jsx';
import {GetNewPosition} from '../../services/google-location-svc.js';
import MapPageContext from '../../contexts/MapPage.context';
import {bindAll} from 'lodash';

export default class GoogleMap extends Component {
  static contextType = MapPageContext;

  constructor(props) {
    super(props);
    // const {mapPageState, setMapPageState} = useContext(MapPageContext);

    bindAll(this, ['componentDidMount',
      'onMarkerDragEnd',
      'onMarkerZoomChanged',
      '_onLocationAccepted',
    ]);
    this.state = {
      result: [],
    };
    this.gMap = React.createRef();

  }

  static defaultProps = {
    center: {
      lat: Number(sessionStorage.getItem('lat')) || 40.743992,
      lng: Number(sessionStorage.getItem('lng')) || -74.032364,
    },
    zoom: 12,
  };

  async componentDidMount() {
    const result = await GetNewPosition(this.props.center.lat, this.props.center.lng, 100);
    const {setLocations} = this.context;
    setLocations(result.data.records);

    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._onLocationAccepted, this._onLocationDeclined);
    }
    this.setState({result: result.data.records});
  }

  async onMarkerDragEnd(evt) {
    const result = await GetNewPosition(evt.center.lat(), evt.center.lng(), 100);
    const {setLocations} = this.context;
    setLocations(result.data.records);
    this.setState({result: result.data.records});
  }

  async onMarkerZoomChanged(evt) {
    const result = await GetNewPosition(evt.center.lat(), evt.center.lng(), 400);
    const {setLocations} = this.context;
    setLocations(result.data.records);
    this.setState({result: result.data.records});
  }

  _onLocationAccepted(pos) {
    // console.warn('location ACCEPTED');
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    //eslint-disable-next-line
    const currBrowserLocation = new google.maps.LatLng(lat, lng);
    this.gMap && this.gMap.current.map_.panTo(currBrowserLocation);
    this.setState({
      currentLocation: {
        lat,
        lng
      }
    });
  }

  _onLocationDeclined() {
    // console.warn('location DECLINED');
    // todo: snackbar here
    console.warn('User declined to use browser location');
  }

  static getDerivedStateFromProps(props, state) {
    if(state.currentLocation){
      return {
        ...state,
        currentLocation: state.currentLocation
      };
    }else{
      return state;
    }
  }

  render() {
    const {result} = this.state;

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
          {result.map((data, index) => (
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
