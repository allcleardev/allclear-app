import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
        <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
            setValue(newValue);
        }}
        showLabels
        className={classes.root}
        >
            <BottomNavigationAction
                label="Am I sick?" icon={<AssignmentTurnedInIcon />}
                component={Link}
                to="/"
            />
            {/* <BottomNavigationAction label="Health Status" icon={<AssignmentIndIcon />} component={Link} to="/health"/> */}
            <BottomNavigationAction label="Nearby Testing" icon={<LocationOnIcon />} component={Link} to="/location"/>
        </BottomNavigation>
  );
}