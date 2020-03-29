import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/styles";
import { Map, Marker, Popup, TileLayer, MapControl, withLeaflet } from "react-leaflet";
import './map.css'
import locations from '../hooks/airtable'
import GeoSearch from './map-components/geosearch';
import LocateControl from './map-components/userlocation';

function MapPoint(props) {
  return (
    <Marker position={[props.Latitude, props.Longitude]} key={props.idx}>
      <Popup>
        Name: {props.Name} <br />
        Address: {props.Address} <br />
        Appointment Needed: {props['Appointment Needed']} <br />
        Drive Through: {props['Drive Through']} <br />
        Website: {props['Main Website']} <br />
      </Popup>
    </Marker>
  )
}

export default function MapComponent(props) {
    const useStyles = makeStyles(theme => ({
      frame: {
        marginTop: "2%",
      },
    }));
    
    const { children, value, index, ...other } = props;
    const styles = useStyles();
    const [viewport, setViewport] = useState({
      latitude: 40.71427,
      longitude: -74.00597,
      zoom: 9,
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

        {locations.getAll().map((x, idx) => MapPoint({...x, idx}))}
      </Map>
    );
  }