import React, { Component, Fragment } from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './map-components/mapMarker.jsx';
import { GetNewPosition } from '../services/google-location-svc.js';

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 40.71427,
      lng: -74.00597,
    },
    zoom: 14,
  };

  onMarkerDragEnd = (evt) => {
    console.log(evt.center.lat());
    console.log(evt.center.lng());
    GetNewPosition(evt.center.lat(), evt.center.lng(), 100).then((result) => console.log(result));
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAPB7ER1lGxDSZICjq9lmqgxvnlSJCIuYw' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onDragEnd={this.onMarkerDragEnd}
        >
          {this.props.data.map((result, index) => (
            <Fragment key={index}>
              <MapMarker lat={result.Latitude} lng={result.Longitude} text={index + 1} />
            </Fragment>
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
