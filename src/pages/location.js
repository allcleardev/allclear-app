import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';
import React, {useState} from 'react';
import { render } from 'react-dom';
import MapGL from 'react-map-gl';

const MAPBOX_TOKEN = ''; // Set your mapbox token here

function MapBox() {
  const [viewport, setViewport] = useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 14,
    bearing: 0,
    pitch: 0
  });

  return (
    <MapGL
      {...viewport}
      width='90vw'
      height='80vh'
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={setViewport}
      mapboxApiAccessToken={MAPBOX_TOKEN}
    />
  );
}


const useStyles = makeStyles(theme => ({
    frame: {
        margin: '5% auto',
        marginTop: '5%'
    }
  }));


export default function Location() {
  const styles = useStyles();

    return (
      <Container className={styles.frame}>
        <MapBox />
      </Container>
    )

}