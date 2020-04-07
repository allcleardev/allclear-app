import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import location_data from '../data/locations.json';
let location = location_data;

export default function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem button style={style} key={index}>
      <ListItemIcon>
        <LocationOnIcon />
      </ListItemIcon>
      <ListItemText primary={location[index].Name} secondary={location[index].Address}></ListItemText>
    </ListItem>
  );
}
