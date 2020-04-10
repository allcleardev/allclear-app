import React, { Fragment } from 'react';
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
      <div>
        <h3 className="card-title">
          <span>{index + 1}.</span> {title}
        </h3>

        <dl className="summary">
          <dd className="summary__item">{city_state}</dd>
          <dd className="summary__item summary__item--grey">{service_time}</dd>
          <dd className="detsummaryails__item">{driveThru.toString() === 'true' ? 'Drive Through' : ''}</dd>
          <dd className="summary__item summary__item--semibold">{description}</dd>
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
      <section className="testing-location-list-item__details">
        <h4>Test Center Overview</h4>
        <dl className="details">
          {!isNullOrUndefined(props.hours) && (
            <Fragment>
              <dt>Hours:</dt>
              <dd>{props.hours}</dd>
            </Fragment>
          )}
          {!isNullOrUndefined(props.type) && (
            <Fragment>
              <dt>Location Type:</dt>
              <dd> {props.type.name}</dd>
            </Fragment>
          )}
          {!isNullOrUndefined(props.appointmentRequired) && (
            <Fragment>
              <dt>Appointment Required:</dt>
              <dd>{boolToEng(props.appointmentRequired)}</dd>
            </Fragment>
          )}
          {!isNullOrUndefined(props.driveThru) && (
            <Fragment>
              <dt>Drive-Through:</dt>
              <dd>{boolToEng(props.driveThru)}</dd>
            </Fragment>
          )}
          {!isNullOrUndefined(props.telescreeningAvailable) && (
            <Fragment>
              <dt>Telescreening Available:</dt>
              <dd>{boolToEng(props.telescreeningAvailable)}</dd>
            </Fragment>
          )}
          {!isNullOrUndefined(props.acceptsThirdParty) && (
            <Fragment>
              <dt>Accepts Third Party Orders: </dt>
              <dd>{boolToEng(props.acceptsThirdParty)}</dd>
            </Fragment>
          )}
          {!isNullOrUndefined(props.referralRequired) && (
            <Fragment>
              <dt>Referral from Doctor Needed:</dt>
              <dd>{boolToEng(props.referralRequired)}</dd>
            </Fragment>
          )}
          {!isNullOrUndefined(props.testCriteria) && (
            <Fragment>
              <dt>If Yes, Known Required Criteria:</dt>
              <dd>{boolToEng(props.testCriteria.name)}</dd>
            </Fragment>
          )}
          {!isNullOrUndefined(props.acceptsInsurance) && (
            <Fragment>
              <dt>Accepts Insurance:</dt>
              <dd>{boolToEng(props.acceptsInsurance)}</dd>
            </Fragment>
          )}
          {!isNullOrUndefined(props.freeOrLowCost) && (
            <Fragment>
              <dt>Free or Very Low Cost:</dt>
              <dd>{boolToEng(props.freeOrLowCost)}</dd>
            </Fragment>
          )}
        </dl>
      </section>
    </ExpansionPanelDetails>
  );

  return <CustomizedExpansionPanel index={index} summary={summary} body={body}></CustomizedExpansionPanel>;
}

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    borderLeft: 0,
    borderRight: 0,
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
    backgroundColor: '#fff',
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
    backgroundColor: '#f9f9f9',
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
