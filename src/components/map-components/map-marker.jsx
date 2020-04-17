import React from 'react';

import { mapMarkerStyle } from './map_marker_styles.js';
// import {AppContext} from '../../contexts/App.context';

export default function MapMarker(props) {
  const { index, length } = props;
  // const {appState, setAppState} = useContext(AppContext);
  return (
    <div
      onClick={(e, i) => {
        // todo: dont touch dom lol, do this with refs (much harder)
        const elemToOpen = document.querySelectorAll('.MuiExpansionPanel-root')[index];
        const isCurrentlyExpanded = [].slice.call(elemToOpen.classList).includes('Mui-expanded');
        if (!isCurrentlyExpanded) elemToOpen.children[0].click();
        const isLastElement = index === length - 1;
        if (isLastElement) {
          // wait for expansion panel animation to end before scrolling
          setTimeout(() => elemToOpen.scrollIntoView({ behavior: 'smooth' }), 300);
        } else elemToOpen.scrollIntoView({ behavior: 'smooth' });

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
