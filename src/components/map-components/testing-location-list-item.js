import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { boolToEng, isNullOrUndefined } from '../../util/general.helpers';

import Button from '@material-ui/core/Button';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';

export default function TestingLocationListItem(props) {
  const { index, title, description, city_state, service_time, driveThru, phone, website } = props;

  const summary = (
    <ExpansionPanelSummary
      aria-controls={`panel${index}-content`}
      id={`panel${index}-header`}
      className="testing-location-list-item"
      expandIcon={<ExpandMoreIcon />}
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
          <dd className="summary__item summary__item--semibold">{phone}</dd>
        </dl>

        <div className="buttons" style={{ marginTop: '15px' }}>
          <a
            href={'https://www.google.com/maps/dir/?api=1&destination=' + description}
            onClick={(evt) => evt.stopPropagation()}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button className="btn primary-color primary-outline">Directions</Button>
          </a>

          {phone && (
            <a href={'tel:' + phone} onClick={(evt) => evt.stopPropagation()} rel="noopener noreferrer" target="_blank">
              <Button className="btn primary-color primary-outline d-lg-none" style={{ marginLeft: '10px' }}>
                Call
              </Button>
            </a>
          )}

          {website && (
            <a href={website} onClick={(evt) => evt.stopPropagation()} rel="noopener noreferrer" target="_blank">
              <Button className="btn primary-color primary-outline" style={{ position: 'absolute', marginLeft: '10px' }}>
                Website
              </Button>
            </a>
          )}
        </div>
      </div>
    </ExpansionPanelSummary>
  );

  const body = (
    <ExpansionPanelDetails>
      <section className="testing-location-list-item__details">
        <h4>Test Center Details:</h4>
        <dl className="details">
          {!isNullOrUndefined(props.testCriteria) && (
            <Fragment>
              <dt>Known Test Criteria:</dt>
              <dd>{props.testCriteria.name}</dd>
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
              <dt>Doctor Referral Required:</dt>
              <dd>{boolToEng(props.referralRequired)}</dd>
            </Fragment>
          )}
          {!isNullOrUndefined(props.referralRequired) && (
            <Fragment>
              <dt>Doctor Referral Criteria:</dt>
              <dd>{props.doctorReferralCriteria ? props.doctorReferralCriteria : 'None'}</dd>
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
          <div className="mt-3">
            <a href="https://airtable.com/shrVJrPQs4qQkcW4o" target="_blank" rel="noopener noreferrer">
              Suggest Change To Test Center Information
            </a>
            <p className="fontsize-12">
              <i>Last update: username 4/10/2020 12:38:00 PM</i>
            </p>
          </div>
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
    transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
      boxShadow: '0px 18px 8px 20px rgba(0,0,0,.15)',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
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
    margin: '20px 0',
    '&$expanded': {},
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    paddingTop: 0,
    paddingBottom: 3,
    boxShadow: 'inset 0px -11px 8px -10px rgba(0,0,0,.15)',
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
