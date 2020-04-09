import React, {Component, useContext} from 'react';

import {mapMarkerStyle} from './map_marker_styles.js';
import {MapPageContext} from '../../contexts/MapPage.context';

export default function MapMarker(props) {
  const {index} = props;
  const {setMapPageState} = useContext(MapPageContext);
    return (
      <div
        onClick={(e, i) => {
          setMapPageState({selectedPin:index})
        }}
        style={mapMarkerStyle}>
        {props.text}
      </div>);

}
