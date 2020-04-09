import 'leaflet.locatecontrol';
import Box from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import {boolToEng, isNullOrUndefined} from '../../util/helpers';


export default function TestingLocationListItem(props) {
  const {index, title, description, city_state, service_time, driveThru, phone} = props;


  const summary = (
    <ExpansionPanelSummary
      aria-controls={`panel${index}-content`}
      id={`panel${index}-header`}
      className="card-map-location"
    >
        <Box className="container-location">
          <div className="card-content">
            <h3 className="card-title" style={{color: '#000'}}>
            <span className="grey" style={{}}>
              {index + 1}.
            </span>{' '}
              {title}
            </h3>
            <div style={{display: 'flex', flexDirection: 'row', fontSize: '13px'}} className="grey">
              <p style={{color: '#151522'}}>{city_state}</p>
              <p style={{padding: '0 30px'}}>{service_time}</p>
              <p style={{padding: '0 30px'}}>{driveThru.toString() === 'true' ? 'Drive Through' : ''}</p>
            </div>
            <p className="card-description" style={{color: '#151522'}}>
              {description}
            </p>
            <div className="buttons" style={{marginTop: '15px'}}>

              <a
                href={'https://www.google.com/maps/dir/?api=1&destination=' + description}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Button className="btn primary-color primary-outline">Directions</Button>
              </a>

              <a
                href={'tel:' + phone}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Button
                  className="btn primary-color primary-outline" style={{marginLeft: '15px'}}>
                  Call
                </Button>
              </a>
            </div>
          </div>
        </Box>
    </ExpansionPanelSummary>
  );


  const body = (
    <ExpansionPanelDetails>
      <section
        className={'card-map-location__summary'}
      >
        <h4>Summary</h4>
        {<div>title: {props.title}</div>}
        {!isNullOrUndefined(props.hours) && <div>Hours: {props.hours}</div>}
        {!isNullOrUndefined(props.type) && <div>Location Type: {props.type.name}</div>}
        {!isNullOrUndefined(props.appointmentRequired) && <div>Appointment Required: {boolToEng(props.appointmentRequired)}</div>}
        {!isNullOrUndefined(props.driveThru) && <div>Drive-Through: {boolToEng(props.driveThru)}</div>}

        {!isNullOrUndefined(props.telescreeningAvailable) && <div>Telescreening Available: {boolToEng(props.telescreeningAvailable)}</div>}
        {!isNullOrUndefined(props.acceptsThirdParty) && <div>Accepts Third Party Orders: {boolToEng(props.acceptsThirdParty)}</div>}
        {!isNullOrUndefined(props.referralRequired) && <div>Referral from Doctor Needed: {boolToEng(props.referralRequired)}</div>}
        {!isNullOrUndefined(props.testCriteria) && <div>If Yes, Known Required Criteria: {boolToEng(props.testCriteria.name)}</div>}


        {!isNullOrUndefined(props.acceptsInsurance) && <div>Accepts Insurance: {boolToEng(props.acceptsInsurance)}</div>}
        {!isNullOrUndefined(props.freeOrLowCost) && <div>Free or Very Low Cost: {boolToEng(props.freeOrLowCost)}</div>}



      </section>
    </ExpansionPanelDetails>
  );


  return (<CustomizedExpansionPanel

    index={index}
    summary={summary}
    body={body}
  >

  </CustomizedExpansionPanel>);

};

const ExpansionPanel = withStyles({
  root: {},
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

function CustomizedExpansionPanel(props) {
  const [expanded, setExpanded] = React.useState('');

  const handleChange = (index) => (event, newExpanded) => {
    setExpanded(newExpanded ? index : false);
  };

  return (
      <ExpansionPanel
        square
        expanded={expanded === props.index}
        onChange={handleChange(props.index)}>
        {props.summary}
        {props.body}
      </ExpansionPanel>
  );
}

