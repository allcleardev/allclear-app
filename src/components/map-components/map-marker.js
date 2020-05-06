import React, {useContext} from 'react';
import {AppContext} from '@contexts/app.context';
import {useHistory} from 'react-router';
import {clickMapMarker} from '@util/general.helpers';

export default function MapMarker(props) {
  const { index } = props;
  const {appState} = useContext(AppContext);
  const history = useHistory();
  return (
    <div
      onClick={() => {
        clickMapMarker(appState, index, history);
        // todo: instead of touching dom, utilize previously set state and ref markers to accomplish this?
      }}
      style={mapMarkerStyle}
    >
      {props.text}
    </div>
  );
}

const K_WIDTH = 30;
const K_HEIGHT = 30;

const mapMarkerStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,
  backgroundColor: '#002C83',
  borderRadius: K_HEIGHT,
  textAlign: 'center',
  color: 'white',
  fontSize: 14,
  fontWeight: 'bold',
  padding: 4,
  boxShadow:
    'rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px',
};

export { mapMarkerStyle };
