import Container from "@material-ui/core/Container";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { render } from "react-dom";
import MapGL from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

import Airtable from "airtable";
import locationdata from "./location_data.json";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibmF2ZWVkbiIsImEiOiJjazg4aWRkczMwNXQxM21rOWFrbGVvNWtpIn0.-k1i0cSw_C5_0aKPlFFtLA";
// const airbase = new Airtable({apiKey: 'keynhmIL7OONcUxBJ'}).base('appVvpsOtgUT7F3bi');

// let locationdata = []
// function getData() {
//   return airbase('Table 1').select({
//     view: 'Grid view',
//     fields: ['Name', 'Address', 'Latitude', 'Longitude', 'State', 'Phone', 'Phone Extension', 'Main Website', 'Hours', 'Drive Through', 'Appointment Needed']
//   }).eachPage(function page(records, fetchNextPage) {
//     // This function (`page`) will get called for each page of records.

//     locationdata = [...locationdata, ...records.map(x => x.fields)]
//     // records.forEach(function(record) {
//     //     console.log('Retrieved', record.get('Name'));
//     // });

//     // To fetch the next page of records, call `fetchNextPage`.
//     // If there are more records, `page` will get called again.
//     // If there are no more records, `done` will get called.
//     fetchNextPage();

// }, function done(err) {
//     if (err) { console.error(err); return; }
//     console.log('imported')
// });
// }

const useStyles = makeStyles(theme => ({
  frame: {
    marginTop: "2%"
  }
}));

export function MapComponent(props) {
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={1}>{children}</Box>}
    </Typography>
  );
}

export default function Location() {
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
    <Paper elevation={0} square>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        centered
        aria-label="disabled tabs example"
      >
        <Tab label="List View" />
        <Tab label="Map" />
      </Tabs>
    </Paper>

      <TabPanel value={value} index={0}>
        <h2>List View</h2>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Container >
          <MapComponent />
        </Container>  
      </TabPanel>
    </Container>
  );
}
