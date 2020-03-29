import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import locations from '../hooks/airtable';

export default function renderRow(props) {
    const { index, style } = props;
    const loc = locations.getById(index)
    return (
      <ListItem button style={style} key={index}>
        <ListItemIcon>
          <LocationOnIcon />
        </ListItemIcon>
        <ListItemText primary={loc.Name} secondary={loc.Address}>
          </ListItemText>
      </ListItem>
    );
}