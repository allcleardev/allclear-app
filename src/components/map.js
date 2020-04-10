import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import locations from '../hooks/airtable';
import GeoSearch from './map-components/geosearch';
import LocateControl from './map-components/userlocation';

function MapPoint(props) {
  return (
    <Marker position={[props.Latitude, props.Longitude]} key={props.idx}>
      <Popup>
        Name: {props.Name} <br />
        Address: {props.Address} <br />
        Hours: {props['Hours']} <br />
        Appointment Needed: {props['Appointment Needed']} <br />
        Drive Through: {props['Drive Through'].toString()} <br />
        <a href={props['Main Website']} rel="noopener noreferrer" target="_blank">
          Website
        </a>{' '}
        <br />
      </Popup>
    </Marker>
  );
}

export default function MapComponent(props) {
  const useStyles = makeStyles(() => ({
    frame: {
      marginTop: '20%',
    },
  }));

  const { index } = props;
  useStyles();
  const [viewport] = useState({
    latitude: 40.71427,
    longitude: -74.00597,
    zoom: 14,
    bearing: 0,
    pitch: 0,
  });

  return (
    <Map center={[viewport.latitude, viewport.longitude]} zoom={viewport.zoom} id={`tabpanel-${index}`}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoSearch />
      <LocateControl />

      {locations
        .getAll()
        .filter((f) => {
          //for (var key in locationFilter) {
          //  if (f[key] === undefined || f[key] != locationFilter[key])
          //    return false;
          //}
          //console.log(f[key])

          return true;
          //return f['Appointment Needed'] == appointmentRequired
        })
        .map((x, idx) => MapPoint({ ...x, idx }))}
    </Map>
  );
}
