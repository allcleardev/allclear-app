import React from 'react';

import { mapMarkerStyle } from './map_marker_styles.js';
// import {AppContext} from '../../contexts/app.context';

export default function MapMarker(props) {
  const { index } = props;
  // const {appState, setAppState} = useContext(AppContext);
  return (
    <div
      onClick={(e, i) => {
        // todo: dont touch dom lol, do this with refs (much harder)
        const elemToOpen = document.querySelectorAll('.MuiExpansionPanel-root')[index];
        elemToOpen.scrollIntoView({ behavior: 'smooth' });
        const isCurrentlyExpanded = [].slice.call(elemToOpen.classList).includes('Mui-expanded');
        if (!isCurrentlyExpanded) elemToOpen.children[0].click();

        // todo: instead of touching dom, utilize previously set state and ref markers to accomplish this?
        // setAppState({
        //   ...appState,
        //   // selectedPin: index
        // });
      }}
      style={mapMarkerStyle}
    >
      {props.text}
    </div>
  );
}
