import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import { mapMarkerStyle } from './map_marker_styles.js';

export default class MapMarker extends Component {
  //  static propTypes = {
  //    text: PropTypes.string
  //  };

  static defaultProps = {};

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    return <div style={mapMarkerStyle}>{this.props.text}</div>;
  }
}
