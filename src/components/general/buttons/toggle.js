import React from 'react';

import { Tooltip, withStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#35C759',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
        disabled: classes.disabled,
      }}
      {...props}
    />
  );
});

export default function Toggle(props) {
  const [toggleState, setToggleState] = React.useState({
    checked: props.defaultValue,
  });

  const handleUseMyLocationChange = (event) => {
    setToggleState({
      ...toggleState,
      [event.target.name]: event.target.checked,
    });

    props.onToggled(toggleState);
  };

  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#fff',
      color: '#999',
      boxShadow: theme.shadows[4],
      fontSize: 13,
      padding: 20,
      borderRadius: 8,
    },
  }))(Tooltip);

  return (
    <LightTooltip title={props.disableToggle && props.disabledToggleMessage ? props.disabledToggleMessage : ''}>
      <FormControl>
        <FormControlLabel
          className={props.className}
          control={
            <IOSSwitch
              checked={toggleState.checked && !props.disableToggle}
              disabled={props.disableToggle}
              onChange={handleUseMyLocationChange}
              name="checked"
            />
          }
        />
      </FormControl>
    </LightTooltip>
  );
}
