// external
import React, { Component } from 'react';
import {bindAll, get, debounce, delay} from 'lodash';
import { withRouter } from 'react-router';
import { Container, Button } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

// components
import LinkButton from '@general/buttons/link-button';
import SnackbarMessage from '@general/alerts/snackbar-message';
import ExternalItemLinks from '@components/map-components/external-item-links';
import Header from '@components/general/headers/header';
import { ReactComponent as ShareIcon } from '@assets/images/buttons/share.svg';

// other
import { AppContext } from '@contexts/app.context';
import FacilityService from '@services/facility.service';
import { triggerShareAction, getShareActionSnackbar } from '@util/social.helpers';
import {
  getFacilityDetailsMap,
  convertToReadableDate,
  getFeedbackButtonURL,
  isTaggableLocation,
  applyCovidTag
} from '@util/general.helpers';


class TestCenterPage extends Component {
  static contextType = AppContext;

  state = {
    facility: null,
    snackbarOpen: false,
    snackbarMessage: '',
    snackbarSeverity: '',
  };

  constructor(props) {
    super(props);
    bindAll(this, [
      'componentDidMount',
      'onWindowResize',
      'onBackClick',
      'componentWillUnmount',
      'prepCovidTag',
      'onShareClick',
      'onItemLinkClick'
    ]);
    this.id = props.match.params.id;
    this.facilityService = FacilityService.getInstance();
  }

  async componentDidMount() {
    this.onWindowResize();
    window.addEventListener('resize', debounce(this.onWindowResize, 400));
    const sessionId = get(this, ['context', 'appState', 'sessionId']);
    this.isLoggedIn = sessionId ? true : false;
    const isActualID = !isNaN(Number(this.id));
    const method = (isActualID) ? 'getFacility' : 'getFacilityByName';
    const facility = await this.facilityService[method](this.id)
      .then((res) => {
        const facility = res.data;
        this.loading = false;
        this.facilityDetailsMap = getFacilityDetailsMap(facility);
        this.feedbackURL = getFeedbackButtonURL(facility);
        facility.lastUpdated = convertToReadableDate(facility.updatedAt);
        return facility;
      })
      .catch((err) => {
        this.loading = false;
        return {
          name: 'Facility Not Found',
          address: 'Nowhere, USA',
          phone: 'No Phone',
          hours: 'No Hours',
          url: 'https://www.google.com/search?q=do+a+barrel+roll',
        };
      });

    this.setState({ facility });

    // stamp page with covid tag if its new
    isTaggableLocation(facility.lastUpdated) && this.prepCovidTag();
  }

  prepCovidTag() {
    const { name, city, state, address, id, lastUpdated, type } = this.state.facility;
    const currType = (type?.id === 'pd') ? 'CivicStructure' : 'LocalBusiness';
    const thisUrl = `${window.location.origin}/test-centers/${id}`;
    const text = `${name} is offering testing for COVID-19!`;
    applyCovidTag({
      name,
      city,
      state,
      address,
      lastUpdated,
      text,
      url: thisUrl,
      type: currType,
    });
  }

  onWindowResize() {
    this.setState({ mobileView: window.innerWidth < 960 });
  }

  onBackClick() {
    if(this.state.facility.name === 'Facility Not Found'){
      window.location.href = `${window.location.origin}/map`;
    }
    this.props.history.push(`/map?selection=${this.id}`);
  }

  onShareClick() {
    triggerShareAction({url: window.location.href}).then((response) => {
      const { snackbarMessage, snackbarSeverity } = getShareActionSnackbar(response);
      this.setState({
        ...this.state,
        snackbarMessage,
        snackbarSeverity,
        snackbarOpen: true,
      });

      // close snackbar after 3 seconds
      delay((e, i) => {
        this.setState({
          ...this.state,
          snackbarOpen: false,
        });
      }, 3000);

    });

  }

  onItemLinkClick(evt, item) {
    item === 'Share' && this.onShareClick();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', debounce(this.onWindowResize, 400));
  }

  render() {
    const facility = this.state.facility;
    const mobileView = this.state.mobileView;

    return (
      <div className="test-center-page">
        <Header enableBackBtn={true}>
          <h1 className="heading">Test Center Details</h1>
        </Header>
        <Container className="test-center-page__content" maxWidth="md">
          <Button className="back-btn hide-mobile" startIcon={<KeyboardArrowLeftIcon />} onClick={this.onBackClick}>
            Back
          </Button>
          {facility && (
            <>
              {/* Overview Card */}
              <article className="card test-center-page__overview-card">
                <h1 className="card__title">{facility.name}</h1>
                <div className="card__content">
                  <div className="info-line">{facility.address}</div>
                  <div className="info-line">{facility.phone || 'Phone Number Unavailable'}</div>
                  <div className="info-line">{facility.hours}</div>
                </div>
                <div className="card__actions">
                  {mobileView
                    ? <ExternalItemLinks
                      display={'d-flex'}
                      description={facility.address}
                      phone={facility.phone}
                      website={facility.url}
                      onClick={(evt, text) => this.onItemLinkClick(evt, text)}
                    />
                    : <>
                      {facility.url && <LinkButton href={facility.url} theme="rectangle-text" text="Website" />}
                      <LinkButton
                        href={'https://www.google.com/maps/dir/?api=1&destination=' + facility.address}
                        theme="rectangle-text"
                        text="Directions"
                      />
                      <LinkButton href={'tel:' + facility.phone} theme="rectangle-icon" text="Call">
                        <PhoneIcon />
                      </LinkButton>
                      <LinkButton
                        text="Share"
                        theme="rectangle-icon"
                        showDesktop={true}
                        onClick={(evt) => this.onShareClick(evt)}
                      >
                        <ShareIcon />
                      </LinkButton>
                    </>
                  }

                </div>
              </article>

              {/* Details Card */}

              {(this.facilityDetailsMap || this.lastUpdated) && <article className="card test-center-page__details-card">
                <div style={{marginBottom: '30px'}}>
                  {this.facilityDetailsMap && this.facilityDetailsMap.map((row) => (
                    <DetailRow key={row.field} field={row.field} value={row.value}/>
                  ))}
                </div>
                {facility.lastUpdated && (
                  <DetailRow field="Last Updated" value={facility.lastUpdated} textSize="small" color="primary"/>
                )}
              </article>}

              <div className="test-center-page__feedback">
                <span>Want to help us improve our data?</span>
                <a href={this.feedbackURL} target="_blank" rel="noopener noreferrer">
                  <Button
                    fullWidth
                    variant="contained"
                    className="feedback-button"
                    style={{ background: 'linear-gradient(to right, #11BCF1, #007AFF)' }}
                  >
                    Leave Feedback
                </Button>
                </a>
              </div>
            </>
          )}
        </Container>
        <SnackbarMessage
          isOpen={this.state.snackbarOpen}
          severity={this.state.snackbarSeverity}
          message={this.state.snackbarMessage}
          onClose={this.handleSnackbarClose}
        />
      </div>
    );
  }
}

export default withRouter(TestCenterPage);

function DetailRow(props) {
  return (
    <div
      style={{
        fontSize: props.textSize === 'small' ? '14px' : '16px',
        lineHeight: '22px',
        marginBottom: '8px',
        color: !props.color && '#4F4F4F',
      }}
      className={props.color === 'primary' ? 'primary-color' : null}
    >
      <span>
        <b>{props.field}: </b>
      </span>
      <span>{props.value}</span>
    </div>
  );
}
