import React, {Fragment, useState} from 'react';
import styled from 'styled-components';
import {get} from 'lodash';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddBox from '@material-ui/icons/AddBox';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import VideocamIcon from '@material-ui/icons/Videocam';
import DescriptionIcon from '@material-ui/icons/Description';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import PhoneIcon from '@material-ui/icons/Phone';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PhoneForwardedIcon from '@material-ui/icons/PhoneForwarded';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {boolToEng, isNullOrUndefined, getFeedbackButtonURL, isTaggableLocation} from '@util/general.helpers';
import ExternalItemLinks from './external-item-links';
import CustomizedExpansionPanel, {ExpansionPanelSummary, ExpansionPanelDetails} from './expansion-panel';
import {Link} from 'react-router-dom';
import {triggerShareAction, getShareActionSnackbar} from '@util/social.helpers';
import SnackbarMessage from '@general/alerts/snackbar-message';
import PinLocation from '@general/pin-location';
import ProgressBar from '@general/progress-bars/progress-bar';

export default function TestingLocationListItem(props) {
  const {id, index, title, description, service_time, driveThru, phone, website, testTypes, expandedItemId} = props;
  const {onActionClick, onTestingLocationExpand} = props; // events
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
    const props = {url: `${currLocation}/map?selection=${id}`};
    triggerShareAction(props).then((response) => {
      const {snackbarMessage, snackbarSeverity} = getShareActionSnackbar(response);

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

  const {snackbarOpen, snackbarMessage, snackbarSeverity} = snackbarState;

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
      expandIcon={<ExpandMoreIcon/>}
    >
      <div className="my-auto">
        <h2 className="card-title">
          <span className="title-text">
            {index + 1}. {title}
          </span>
          {isTaggableLocation(updatedAt) && (
            <div className="new-test-center-display">
              <span>
                <FiberManualRecordIcon/>
              </span>
              <span style={{marginTop: '1px'}}>New</span>
            </div>
          )}
        </h2>

        <div onClick={(e) => e.stopPropagation()}>
          <PinLocation location={props}/>
        </div>

        <dl className="summary d-none d-md-block">
          <dd className="summary__item summary__item--semibold">{description}</dd>

          {!isNullOrUndefined(get(props, 'type.name')) && (
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
          <ExternalItemLinks display={'d-flex'} description={description} phone={phone} website={website}/>
        </div>

        <div className="detail-wrapper">
          <h4>Test Center Overview</h4>
          {/*cdc criteria*/}
          {/*location type*/}
          {/*hours*/}
          {/*appointment*/}
          {/*drivethru*/}
          {/*dr referal*/}
          {/*telescreening*/}
          {/*full details link*/}


          <dl className="detail-list">
            {!isNullOrUndefined(props.type) && (
              <div
                className={`details details--location details--mid details--${props.type}`}
              >
                <AddBox/>
                <dt>Location Type:</dt>
                <dd> {props.type.name}</dd>
              </div>
            )}
            {!isNullOrUndefined(phone) && (
              <div
                className={`details details--phone`}
              >
                <PhoneIcon/>
                <dt>Phone Number:</dt>
                <dd>{phone}</dd>
              </div>
            )}
            {!isNullOrUndefined(props.testCriteria) && (
              <div
                className={`details details--test-criteria`}
              >
                <CheckBoxIcon/>
                <dt>Known Test Criteria:</dt>
                <dd>{props.testCriteria.name}</dd>
              </div>
            )}
            {!isNullOrUndefined(service_time) && (
              <div
                className={`details details--hours`}
              >
                <ScheduleIcon/>
                <dt>Hours of Operation:</dt>
                <dd>{service_time}</dd>
              </div>
            )}
            {!isNullOrUndefined(props.appointmentRequired) && (
              <div
                className={`details details--appointment details--${props.appointmentRequired}`}
              >
                <PhoneForwardedIcon/>
                <dt>Appointment Required:</dt>
                <dd>{boolToEng(props.appointmentRequired)}</dd>
              </div>
            )}
            {!isNullOrUndefined(props.driveThru) && (
              <div
                className={`details details--drive-thru details--${props.driveThru}`}
              >
                <DriveEtaIcon/>
                <dt>Drive-Through:</dt>
                <dd>{boolToEng(props.driveThru)}</dd>
              </div>
            )}
            {props.telescreeningAvailable && (
              <div
                className={`details details--telescreening details--${props.telescreeningAvailable}`}
              >
                <VideocamIcon/>
                <dt>Telescreening Available:</dt>
                <dd>{boolToEng(props.telescreeningAvailable)}</dd>
              </div>
            )}
            {!isNullOrUndefined(props.acceptsThirdParty) && (
              <div
                className={`details details--third-party details--${props.acceptsThirdParty}`}
              >
                <LocalMallIcon/>
                <dt>Accepts Third Party Orders:</dt>
                <dd>{boolToEng(props.acceptsThirdParty)}</dd>
              </div>
            )}
            {!isNullOrUndefined(props.referralRequired) && props.referralRequired && (
              <div
                className={`details details--referral-required details--${props.referralRequired}`}
              >
                <DescriptionIcon/>
                <dt>Doctor Referral Required:</dt>
                <dd>{boolToEng(props.referralRequired)}</dd>
              </div>
            )}
            {!isNullOrUndefined(props.referralRequired) && (
              <div
                className={`details details--referral-criteria details--${props.referralRequired}`}
              >
                <FormatListNumberedIcon/>
                <dt>Doctor Referral Criteria:</dt>
                <dd>{props.doctorReferralCriteria ? props.doctorReferralCriteria : 'None'}</dd>
              </div>
            )}
            {!isNullOrUndefined(props.acceptsInsurance) && props.acceptsInsurance && (
              <div
                className={`details details--insurance details--${props.acceptsInsurance}`}
              >
                <AssignmentTurnedInIcon/>
                <dt>Accepts Insurance:</dt>
                <dd>{boolToEng(props.acceptsInsurance)}</dd>
              </div>
            )}
            {!isNullOrUndefined(props.freeOrLowCost) && props.freeOrLowCost && (
              <div
                className={`details details--cost details--${props.freeOrLowCost}`}
              >
                <MoneyOffIcon/>
                <dt>Free or Very Low Cost:</dt>
                <dd>{boolToEng(props.freeOrLowCost)}</dd>
              </div>
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
          </dl>
        </div>
        <div className="experiences">
          <div className='experiences__left'>
            <span className='experiences__left-label'>
              Positive Experiences: 5
            </span>
            <ProgressBar
              barColor='#35ccb8'
              value={60}
            />
            <span className='experiences__left-label'>
            Neutral Experiences: 1
              </span>
            <ProgressBar
              barColor='#808080'
              value={10}
            />
            <span className='experiences__left-label'>
            Negative Experiences: 3
              </span>
            <ProgressBar
              barColor='#fd6263'
              value={30}
            />
          </div>

          <div className='experiences__right'>
            <h3 className='experiences__percent'> 60% </h3>
            <div className='experiences__label'> Positive Experiences</div>
            <div className='experiences__total'>9 Total Reviews</div>
          </div>
        </div>

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

  ${({type}) =>
  type === 'ii' &&
  `
    background-color: #11BCF1;
  `}
`;
