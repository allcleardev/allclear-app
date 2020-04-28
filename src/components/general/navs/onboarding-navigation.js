import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Tooltip, withStyles, makeStyles } from '@material-ui/core';

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

const DefaultButton = withStyles((theme) => ({
  root: {
    padding: '12px 16px',
    fontWeight: '600',
    fontSize: '17px',
    borderRadius: '10px',
    color: '#fff',
    minWidth: '100%',
    [theme.breakpoints.up('md')]: {
      minWidth: '226px',
    },
  },
  outlined: {
    borderColor: '#fff',
  },
  contained: {
    backgroundColor: '#fff',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: '#e1efff',
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
    width: '100%',
    margin: '20px 0 40px',
    textAlign: 'center',
    '@media (min-width: 600px) and (min-height: 800px)': {
      margin: '40px 0 70px',
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
}));

export default function OnboardingNavigation(props) {
  const classes = useStyles();
  const history = useHistory();

  function onNextButtonClicked() {
    if (props.forwardRoute) {
      history.push(props.forwardRoute);
    }
    if (props.forwardOnClick) {
      props.forwardOnClick();
    }
  }

  return (
    <div className={`onboarding-navigation ${classes.root}`}>
      <DefaultButton variant="outlined" className="back hide-mobile" onClick={() => history.goBack()}>
        {props.backText || 'Back'}
      </DefaultButton>
      {props.children}
      <LightTooltip title={props.triggerTooltip ? props.tooltipMessage : ''}>
        <span className="tooltip-button">
          <DefaultButton variant="contained" onClick={() => onNextButtonClicked()} disabled={props.forwardDisabled}>
            {props.forwardText || 'Next'}
          </DefaultButton>
        </span>
      </LightTooltip>
    </div>
  );
}
