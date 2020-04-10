import React from 'react';
import 'leaflet.locatecontrol';

import { boolToEng, isNullOrUndefined } from '../../util/helpers';

import Button from '@material-ui/core/Button';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { withStyles } from '@material-ui/core/styles';

export default function TestingLocationListItem(props) {
  const { index, title, description, city_state, service_time, driveThru, phone } = props;

  const summary = (
    <ExpansionPanelSummary
      aria-controls={`panel${index}-content`}
      id={`panel${index}-header`}
      className="testing-location-list-item"
    >
      <div className="location-card">
        <h3 className="card-title">
          <span>{index + 1}.</span> {title}
        </h3>

        <dl class="results-details">
          <dd class="results-details__item">{city_state}</dd>
          <dd class="results-details__item results-details__item--grey">{service_time}</dd>
          <dd class="results-details__item">{driveThru.toString() === 'true' ? 'Drive Through' : ''}</dd>
          <dd class="results-details__item results-details__item--semibold">{description}</dd>
        </dl>

        <div className="buttons" style={{ marginTop: '25px' }}>
          <a
            href={'https://www.google.com/maps/dir/?api=1&destination=' + description}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button className="btn primary-color primary-outline">Directions</Button>
          </a>

          <a href={'tel:' + phone} rel="noopener noreferrer" target="_blank">
            <Button className="btn primary-color primary-outline" style={{ marginLeft: '15px' }}>
              Call
            </Button>
          </a>
        </div>
      </div>
    </ExpansionPanelSummary>
  );

  const body = (
    <ExpansionPanelDetails>
      <section className="testing-location-list-item__overview">
        <h4>Test Center Overview</h4>
        <h5>{props.title}</h5>

        {!isNullOrUndefined(props.hours) && <div>Hours: {props.hours}</div>}
        {!isNullOrUndefined(props.type) && <div>Location Type: {props.type.name}</div>}
        {!isNullOrUndefined(props.appointmentRequired) && (
          <div>Appointment Required: {boolToEng(props.appointmentRequired)}</div>
        )}
        {!isNullOrUndefined(props.driveThru) && <div>Drive-Through: {boolToEng(props.driveThru)}</div>}

        {!isNullOrUndefined(props.telescreeningAvailable) && (
          <div>Telescreening Available: {boolToEng(props.telescreeningAvailable)}</div>
        )}
        {!isNullOrUndefined(props.acceptsThirdParty) && (
          <div>Accepts Third Party Orders: {boolToEng(props.acceptsThirdParty)}</div>
        )}
        {!isNullOrUndefined(props.referralRequired) && (
          <div>Referral from Doctor Needed: {boolToEng(props.referralRequired)}</div>
        )}
        {!isNullOrUndefined(props.testCriteria) && (
          <div>If Yes, Known Required Criteria: {boolToEng(props.testCriteria.name)}</div>
        )}

        {!isNullOrUndefined(props.acceptsInsurance) && (
          <div>Accepts Insurance: {boolToEng(props.acceptsInsurance)}</div>
        )}
        {!isNullOrUndefined(props.freeOrLowCost) && <div>Free or Very Low Cost: {boolToEng(props.freeOrLowCost)}</div>}
      </section>
    </ExpansionPanelDetails>
  );

  return <CustomizedExpansionPanel index={index} summary={summary} body={body}></CustomizedExpansionPanel>;
}

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .02)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    margin: '20px 0',
    '&$expanded': {},
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    boxShadow: 'inset 0px 11px 8px -10px rgba(0,0,0,.1), inset 0px -11px 8px -10px rgba(0,0,0,.1)',
    backgroundColor: '#f7f7f7',
  },
}))(MuiExpansionPanelDetails);

function CustomizedExpansionPanel(props) {
  const [expanded, setExpanded] = React.useState('');

  const handleChange = (index) => (event, newExpanded) => {
    setExpanded(newExpanded ? index : false);
  };

  return (
    <ExpansionPanel square expanded={expanded === props.index} onChange={handleChange(props.index)}>
      {props.summary}
      {props.body}
    </ExpansionPanel>
  );
}
