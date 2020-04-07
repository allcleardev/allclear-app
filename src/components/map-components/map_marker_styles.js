const K_WIDTH = 30;
const K_HEIGHT = 30;

const mapMarkerStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,
  backgroundColor: '#3f51b5',
  borderRadius: K_HEIGHT,
  textAlign: 'center',
  color: 'white',
  fontSize: 14,
  fontWeight: 'bold',
  padding: 4,
};

export { mapMarkerStyle };
