import React from 'react';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { withStyles } from '@material-ui/core/styles';

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    borderLeft: 0,
    borderRight: 0,
    boxShadow: 'none',
    marginBottom: '5px',
    transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 0,
      boxShadow: '0px 18px 8px 20px rgba(0,0,0,.15)',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

export const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: '#fff',
    borderTop: '.2px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    marginBottom: -1,
    overflow: 'hidden', // need this to preserve card layout on small screens
    '&$expanded': {
      marginBottom: -1
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

export const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    paddingTop: 0,
    paddingBottom: 3,
    boxShadow: 'inset 0px -11px 8px -10px rgba(0,0,0,.15)',
  },
}))(MuiExpansionPanelDetails);

export default function CustomizedExpansionPanel(props) {
  const handleChange = (index) => (event, newExpanded) => {
    props.onExpandedChange(index, newExpanded);
  };

  return (
    <ExpansionPanel
      square
      expanded={props.expanded}
      onChange={handleChange(props.index)}
    >
      {props.summary}
      {props.details}
    </ExpansionPanel>
  );
}
