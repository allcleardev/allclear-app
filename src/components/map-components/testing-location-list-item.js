import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { get } from 'lodash';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { boolToEng, isNullOrUndefined, getFeedbackButtonURL, isTaggableLocation } from '@util/general.helpers';
import ExternalItemLinks from './external-item-links';
import CustomizedExpansionPanel, { ExpansionPanelSummary, ExpansionPanelDetails } from './expansion-panel';
import { Link } from 'react-router-dom';
import { triggerShareAction, getShareActionSnackbar } from '@util/social.helpers';
import SnackbarMessage from '@general/alerts/snackbar-message';
import PinLocation from '@general/pin-location';
import ProgressBar from '@general/progress-bars/progress-bar';

export default function TestingLocationListItem(props) {
  const { id, index, title, description, service_time, driveThru, phone, website, testTypes, expandedItemId } = props;
  const { onActionClick, onTestingLocationExpand } = props; // events
  const updatedAt = new Date(props.updatedAt);
  const initialSnackbarState = {
    snackbarMessage: '',
    snackbarSeverity: '',
    snackbarOpen: false,
  };
  const [snackbarState, setSnackbarState] = useState(initialSnackbarState);

  const onShareClicked = (e, id) => {
    e.stopPropagation();
    const currLocation = window.location.origin;
    const props = { url: `${currLocation}/map?selection=${id}` };
    triggerShareAction(props).then((response) => {
      const { snackbarMessage, snackbarSeverity } = getShareActionSnackbar(response);

      setSnackbarState({
        ...snackbarState,
        snackbarMessage,
        snackbarSeverity,
        snackbarOpen: true,
      });
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarState({
      ...snackbarState,
      snackbarOpen: false,
    });
  };

  const { snackbarOpen, snackbarMessage, snackbarSeverity } = snackbarState;

  const onClick = (evt, buttonName) => {
    evt.stopPropagation();
    if (buttonName === 'Share') {
      onShareClicked(evt, id);
    }
    onActionClick(buttonName, id, index, title);
  };

  // corresponds to the expanded state change of a single testing location in the expansion panel list
  const onExpandedChange = (itemIndex, isExpanded) => {
    // itemIndex is same as props.index, but keeping for readability with child component
    onTestingLocationExpand(id, itemIndex, title, isExpanded);
  };

  const summary = (
    <ExpansionPanelSummary
      aria-controls={`panel${index}-content`}
      id={`panel${index}-header`}
      className="testing-location-list-item"
      expandIcon={<ExpandMoreIcon />}
    >
      <div className="my-auto">
        <h2 className="card-title">
          <span className="title-text">
            {index + 1}. {title}
          </span>
          {isTaggableLocation(updatedAt) && (
            <div className="new-test-center-display">
              <span>
                <FiberManualRecordIcon />
              </span>
              <span style={{ marginTop: '1px' }}>New</span>
            </div>
          )}
        </h2>

        <div onClick={(e) => e.stopPropagation()}>
          <PinLocation location={props} />
        </div>

        <dl className="summary d-none d-md-block">
          <dd className="summary__item summary__item--semibold">{description}</dd>

          {!isNullOrUndefined(get(props,'type.name')) && (
            <Fragment>
              <dd className="detsummaryails__item">{props.type.name}</dd>
            </Fragment>
          )}


          <dd className="summary__item">
            {testTypes &&
              testTypes.map((type, i) => (
                <TestTypeLabel type={type.id} key={i}>
                  {type.name}
                </TestTypeLabel>
              ))}
          </dd>
        </dl>
        <dl className="summary d-md-none mb-0">
          <dd className="summary__item summary__item--semibold">{description}</dd>
          <dd className="summary__item">
            {testTypes &&
              testTypes.map((type, i) => (
                <TestTypeLabel type={type.id} key={i}>
                  {type.name}
                </TestTypeLabel>
              ))}
          </dd>
        </dl>
      </div>
    </ExpansionPanelSummary>
  );

  const changeURL = getFeedbackButtonURL(props);

  const details = (
    <ExpansionPanelDetails>
      <section className="testing-location-list-item__details">
        <div className="icons-container d-none d-md-flex">
          <ExternalItemLinks
            display={'d-md-flex'}
            description={description}
            phone={phone}
            website={website}
            onClick={onClick}
          />
        </div>
        <dl className="summary d-md-none">
          <dd className="detsummaryails__item">{driveThru.toString() === 'true' ? 'Drive Through' : ''}</dd>
          <dd className="summary__item summary__item--semibold">{phone}</dd>
        </dl>
        <div className="icons-container d-flex d-md-none">
          <ExternalItemLinks display={'d-flex'} description={description} phone={phone} website={website} />
        </div>
        <h4>Test Center Details:</h4>
        {/*cdc criteria*/}
        {/*location type*/}
        {/*hours*/}
        {/*appointment*/}
        {/*drivethru*/}
        {/*dr referal*/}
        {/*telescreening*/}
        {/*full details link*/}


        <dl className="details">
          {!isNullOrUndefined(phone) && (
            <Fragment>
              <dt>Phone Number:</dt>
              <dd>{phone}</dd>
            </Fragment>
          )}
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
          {!isNullOrUndefined(service_time) && (
            <Fragment>
              <dt>Hours of Operation:</dt>
              <dd>{service_time}</dd>
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
              <dt>Accepts Third Party Orders:</dt>
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
          <Link to={`/test-centers/${props.id}`}>View Full Test Center Detail</Link>
          <div className="mt-3">
            <a href={changeURL} target="_blank" rel="noopener noreferrer">
              Suggest Change To Test Center Information
            </a>
            <p className="fontsize-12">
              <i>Last update: {updatedAt.toLocaleString()}</i>
            </p>
          </div>

          <div className="mt-3">

            <>
              Positive Experiences: 5
              <ProgressBar
                value={60}
              />

            </>
          </div>
        </dl>
      </section>
    </ExpansionPanelDetails>
  );

  return (
    <Fragment>
      <CustomizedExpansionPanel
        index={index}
        summary={summary}
        details={details}
        expanded={expandedItemId && expandedItemId === id}
        onExpandedChange={onExpandedChange}
      ></CustomizedExpansionPanel>
      <SnackbarMessage
        snackbarClass={'snackbar--map'}
        isOpen={snackbarOpen}
        severity={snackbarSeverity}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </Fragment>
  );
}

// TODO: pull colors from app theme
const TestTypeLabel = styled.span`
  display: inline-block;
  margin: 2px 9px 2px 0;
  padding: 3px 20px;
  border-radius: 30px;
  font-weight: bold;
  font-size: 10px;
  color: white;
  background-color: #002c83;

  ${({ type }) =>
    type === 'ii' &&
    `
    background-color: #11BCF1;
  `}
`;
