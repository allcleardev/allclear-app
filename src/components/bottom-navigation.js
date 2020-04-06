import React from 'react';
import {
  Link
} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import MapIcon from '@material-ui/icons/Map';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    zIndex: 100
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
      <BottomNavigationAction label="Nearby Testing" icon={<MapIcon />} component={Link} to="/location"/>
    </BottomNavigation>
  );
}
