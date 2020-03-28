import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/styles";

import MapGL from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibmF2ZWVkbiIsImEiOiJjazg4aWRkczMwNXQxM21rOWFrbGVvNWtpIn0.-k1i0cSw_C5_0aKPlFFtLA";

export default function MapComponent(props) {
    const useStyles = makeStyles(theme => ({
      frame: {
        marginTop: "2%"
      }
    }));
    
    const { children, value, index, ...other } = props;
    const styles = useStyles();
    const [viewport, setViewport] = useState({
      latitude: 37.8,
      longitude: -122.4,
      zoom: 14,
      bearing: 0,
      pitch: 0
    });
  
    return (
      <Container className={styles.frame} hidden={value !== index} id={`tabpanel-${index}`}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item>
            <MapGL
              {...viewport}
              width="80vw"
              height="70vh"
  
              className={styles.frame}
              mapStyle="mapbox://styles/mapbox/dark-v9"
              onViewportChange={setViewport}
              mapboxApiAccessToken={MAPBOX_TOKEN}
            />
          </Grid>
        </Grid>
      </Container>
    );
  }