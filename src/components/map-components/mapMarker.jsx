import React, { useContext } from 'react';

import { mapMarkerStyle } from './map_marker_styles.js';
import MapPageContext from '../../contexts/MapPage.context';

export default function MapMarker(props) {
  const { index } = props;
  const { setMapPageState } = useContext(MapPageContext);
  return (
    <div
      onClick={(e, i) => {
        // todo: dont touch dom lol, do this with refs (much harder)
        const elemToOpen = document.querySelectorAll('.MuiExpansionPanel-root')[index];
        elemToOpen.scrollIntoView({
          behavior: 'smooth',
        });
        elemToOpen.children[0].click();
        setMapPageState({ selectedPin: index });
      }}
      style={mapMarkerStyle}
    >
      {props.text}
    </div>
  );
}
