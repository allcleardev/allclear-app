import React from 'react';

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
          setTimeout(() => {
            elemToOpen.scrollIntoView({ behavior: 'smooth', block: 'end' });
          }, 300);
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
