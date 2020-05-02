import React, { Fragment } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { boolToEng, isNullOrUndefined } from '../../util/general.helpers';
import ExternalItemLinks from './external-item-links';
import CustomizedExpansionPanel, { ExpansionPanelSummary, ExpansionPanelDetails } from './expansion-panel';

export default function TestingLocationListItem(props) {
  const { id, index, title, description, service_time, driveThru, phone, website, createdAt } = props; // values
  const { onActionClick, onTestingLocationExpand } = props; // events
  const updatedAt = new Date(props.updatedAt);

  const onClick = (evt, buttonName) => {
    evt.stopPropagation();
    onActionClick(buttonName, id, index, title);
  };

  // corresponds to the expanded state change of a single testing location in the expansion panel list
  const onExpandedChange = (itemIndex, isExpanded) => {
    // itemIndex is same as props.index, but keeping for readability with child component
    onTestingLocationExpand(id, itemIndex, title, isExpanded);
  };

  const isNewLocation = (date) => {
    const oneHour = 60 * 60 * 1000; /* milliseconds */
    const createdAt = new Date(date);
    const currentDate = new Date();

    return (currentDate - createdAt) < (oneHour * 72);
  };

  const summary = (
    <ExpansionPanelSummary
      aria-controls={`panel${index}-content`}
      id={`panel${index}-header`}
      className="testing-location-list-item"
      expandIcon={<ExpandMoreIcon />}
    >
      <div className="my-auto">
        <div className="card-title">
          <span className="title-text">
            {index + 1}. {title}
          </span>
          {isNewLocation(createdAt) && (
            <div className="new-test-center-display">
              <span><FiberManualRecordIcon /></span>
              <span style={{marginTop: '2px'}}>New</span>
            </div>
          )}
        </div>

        <dl className="summary d-none d-md-block">
          <dd className="summary__item summary__item--semibold">{description}</dd>
          <dd className="summary__item summary__item--grey">{service_time}</dd>
          <dd className="detsummaryails__item">{driveThru.toString() === 'true' ? 'Drive Through' : ''}</dd>
          <dd className="summary__item summary__item--semibold">{phone}</dd>
        </dl>
        <dl className="summary d-md-none mb-0">
          <dd className="summary__item summary__item--semibold">{description}</dd>
          <dd className="summary__item summary__item--grey">{service_time}</dd>
        </dl>

        <ExternalItemLinks
          display={'d-none d-md-block'}
          margin={{ marginTop: '15px', marginBottom: '20px' }}
          description={description}
          phone={phone}
          website={website}
          onClick={onClick}
        />
      </div>
    </ExpansionPanelSummary>
  );

  const details = (
    <ExpansionPanelDetails>
      <section className="testing-location-list-item__details">
        <dl className="summary d-md-none">
          <dd className="detsummaryails__item">{driveThru.toString() === 'true' ? 'Drive Through' : ''}</dd>
          <dd className="summary__item summary__item--semibold">{phone}</dd>
        </dl>
        <ExternalItemLinks
          display={'d-md-none'}
          margin={{ marginBottom: '15px' }}
          description={description}
          phone={phone}
          website={website}
        />
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
          {props.telescreeningAvailable && (
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
          {!isNullOrUndefined(props.referralRequired) && props.referralRequired && (
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
          {!isNullOrUndefined(props.acceptsInsurance) && props.acceptsInsurance && (
            <Fragment>
              <dt>Accepts Insurance:</dt>
              <dd>{boolToEng(props.acceptsInsurance)}</dd>
            </Fragment>
          )}
          {!isNullOrUndefined(props.freeOrLowCost) && props.freeOrLowCost && (
            <Fragment>
              <dt>Free or Very Low Cost:</dt>
              <dd>{boolToEng(props.freeOrLowCost)}</dd>
            </Fragment>
          )}
          <div className="mt-3">
            <a href={'https://airtable.com/shrVJrPQs4qQkcW4o?prefill_Name=' + props.title
            + '&prefill_Phone number=' + props.phone
            + '&prefill_Hours=' + (props.service_time === undefined ? '' : props.service_time)
            + '&prefill_This location was drive through=' + (props.driveThru.toString() === 'true' ? 'Drive Through' : '')
            + '&prefill_This location required an appointment=' + boolToEng(props.appointmentRequired)
            + '&prefill_Address=' + props.description}

            
              target='_blank'
              rel='noopener noreferrer'>Suggest Change To Test Center Information</a>
            <p className="fontsize-12">
              <i>Last update: {updatedAt.toLocaleString()}</i>
            </p>
          </div>
        </dl>
      </section>
    </ExpansionPanelDetails>
  );

  return (
    <CustomizedExpansionPanel
      index={index}
      summary={summary}
      details={details}
      onExpandedChange={onExpandedChange}
    ></CustomizedExpansionPanel>
  );
}
