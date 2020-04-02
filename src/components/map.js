import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/styles";
import { withRouter } from 'react-router';
import queryString from 'query-string';
import { Map, Marker, Popup, TileLayer, MapControl, withLeaflet } from "react-leaflet";
import './map.css'
import locations from '../hooks/airtable'
import GeoSearch from './map-components/geosearch';
import LocateControl from './map-components/userlocation';
import { Router } from "react-router";


// Some hacky stuff to demo filtering.  FIXME
// Should be able to get / set query params using react router
let appointmentRequired = "Yes"
let driveThrough = false
try {
 appointmentRequired = window.location['href'].split('appointmentRequired=')[1].split("&")[0];
}
catch {
appointmentRequired = "No"

}
try {
driveThrough = window.location['href'].split('driveThrough=')[1];
}
catch {
  driveThrough = false
}

let locationFilter = {
 "Drive Through" : driveThrough == "true",
 "Appointment Needed" : appointmentRequired
}


function MapPoint(props) {
  return (
    <Marker position={[props.Latitude, props.Longitude]} key={props.idx}>
      <Popup>
        Name: {props.Name} <br />
        Address: {props.Address} <br />
        Hours: {props['Hours']} <br />
        Appointment Needed: {props['Appointment Needed']} <br />
        Drive Through: {props['Drive Through'].toString()} <br />
        <a href={props['Main Website']} target="_blank">Website</a> <br />
      </Popup>
    </Marker>
  )
}



export default function MapComponent(props) {
    const useStyles = makeStyles(theme => ({
      frame: {
        marginTop: "20%"
      }
    }));
    
    const { children, value, index, ...other } = props;
    const styles = useStyles();
    const [viewport, setViewport] = useState({
      latitude: 40.71427,
      longitude: -74.00597,
      zoom: 14,
      bearing: 0,
      pitch: 0
    });
    
  
    return (
      <Map center={[viewport.latitude, viewport.longitude]} zoom={viewport.zoom} id={`tabpanel-${index}`}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoSearch />
        <LocateControl/>

        {locations.getAll().filter(
          function(f) {
            //for (var key in locationFilter) {
            //  if (f[key] === undefined || f[key] != locationFilter[key])
            //    return false;
            //}
            //console.log(f[key])

            return true;
            //return f['Appointment Needed'] == appointmentRequired
          }
        ).map((x, idx) => MapPoint({...x, idx}))}
      </Map>
    );
  }