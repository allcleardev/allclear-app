import React from 'react';
import { Tooltip, withStyles } from '@material-ui/core';

export default function OnboardingNavigation(props) {
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
    <div className="button-container">
      {props.back}
      <LightTooltip title={props.tooltipTrigger ? props.tooltipMessage : ''}>
        <span className="tooltip-button">{props.forward}</span>
      </LightTooltip>
    </div>
  );
}
