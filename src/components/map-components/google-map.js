import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './../map-components/mapMarker.jsx';
import {GetNewPosition} from '../../services/google-location-svc.js';

import {addLocation} from '../../redux/actions';
import {connect} from 'react-redux';


class GoogleMap extends Component {
  constructor(props) {
    super(props);
    // const {mapPageState, setMapPageState} = useContext(MapPageContext);
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
    disableDefaultUI: true,
    styles: [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
      }
    ]


  };

  async componentDidMount() {
    const result = await GetNewPosition(this.props.center.lat, this.props.center.lng, 100);
    this.setState({result: result.data.records});
    this.props.addLocation(result.data.records);
  }

  async onMarkerDragEnd(evt) {
    const result = await GetNewPosition(evt.center.lat(), evt.center.lng(), 100);
    this.setState({result: result.data.records});
    this.props.addLocation(result.data.records);
  }

  async onMarkerZoomChanged(evt) {
    const result = await GetNewPosition(evt.center.lat(), evt.center.lng(), 400);
    this.setState({result: result.data.records});
    this.props.addLocation(result.data.records);
  }

  

  // onMarkerClicked(index) {
  //   debugger;
  // }

  render() {
    const {result} = this.state;
    return (

        <div style={{height: '100%', width: '100%'}}>
          <GoogleMapReact
            options={{styles: 
              [
                {
                  "featureType": "administrative",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "administrative.land_parcel",
                  "elementType": "labels",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "administrative.neighborhood",
                  "elementType": "labels.text",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "poi",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "poi",
                  "elementType": "labels.text",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "road",
                  "elementType": "labels.icon",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "road.local",
                  "elementType": "labels",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "transit",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                }
              ]
            }}
            bootstrapURLKeys={{key: 'AIzaSyAPB7ER1lGxDSZICjq9lmqgxvnlSJCIuYw'}}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            onDragEnd={(evt) => this.onMarkerDragEnd(evt)}
            onZoomChanged={(evt) => this.onMarkerDragEnd(evt)}
            defaultOptions={{ styles: this.props.styles }}
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

// onClick={(evt) => {
//   this.onMarkerClicked(index);
// }}

export default connect(null, {addLocation})(GoogleMap);
