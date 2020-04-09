import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './../map-components/mapMarker.jsx';
import { GetNewPosition } from '../../services/google-location-svc.js';
import MapPageContext from '../../contexts/MapPage.context';

export default class GoogleMap extends Component {
  static contextType = MapPageContext;
  constructor(props) {
    super(props);
    this.state = {
      result: [],
    };
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
    const { setLocations } = this.context;
    setLocations(result.data.records);
    this.setState({ result: result.data.records });
  }

  async onMarkerDragEnd(evt) {
    const result = await GetNewPosition(evt.center.lat(), evt.center.lng(), 100);
    const { setLocations } = this.context;
    setLocations(result.data.records);
    this.setState({ result: result.data.records });
  }

  async onMarkerZoomChanged(evt) {
    const result = await GetNewPosition(evt.center.lat(), evt.center.lng(), 400);
    const { setLocations } = this.context;
    setLocations(result.data.records);
    this.setState({ result: result.data.records });
  }

  render() {
    const { result } = this.state;
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAPB7ER1lGxDSZICjq9lmqgxvnlSJCIuYw' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onDragEnd={(evt) => this.onMarkerDragEnd(evt)}
          onZoomChanged={(evt) => this.onMarkerDragEnd(evt)}
        >
          {result.map((data, index) => (
            <MapMarker key={index} lat={data.latitude} lng={data.longitude} text={index + 1} />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

// export default connect(null, { addLocation })(GoogleMap);
