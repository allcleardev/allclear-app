import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import locationdata from "../pages/location_data.json";

let loc = locationdata

export default function renderRow(props) {
    const { index, style } = props;
  
    return (
      <ListItem button style={style} key={index}>
        <ListItemIcon>
          <LocationOnIcon />
        </ListItemIcon>
        <ListItemText primary={loc[index].Name} secondary={loc[index].Address}>
          </ListItemText>
      </ListItem>
    );
}