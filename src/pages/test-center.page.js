import React, { Component } from 'react';
import { AppContext } from '@contexts/app.context';
import { bindAll, get, debounce } from 'lodash';
import Header from '@components/general/headers/header';
import FacilityService from '@services/facility.service';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import PhoneIcon from '@material-ui/icons/Phone';
import { getFacilityDetailsMap, convertToReadableDate, getFeedbackButtonURL } from '@util/general.helpers';
import LinkButton from '@general/buttons/link-button';
import { withRouter } from 'react-router';
import { Container } from '@material-ui/core';

class TestCenterPage extends Component {
  static contextType = AppContext;

  state = {
    facility: null,
  };

  constructor(props) {
    super(props);
    bindAll(this, ['componentDidMount', 'onWindowResize', 'onBackClick', 'componentWillUnmount']);
    this.id = props.match.params.id;
    this.isLoading = true;
    this.facilityService = FacilityService.getInstance();
  }

  async componentDidMount() {
    this.onWindowResize();
    window.addEventListener('resize', debounce(this.onWindowResize, 400));
    const sessionId = get(this, ['context', 'appState', 'sessionId']);
    this.isLoggedIn = sessionId ? true : false;
    const facility = await this.facilityService.getFacility(this.id).then((res) => {
      const facility = res.data;
      this.loading = false;
      this.facilityDetailsMap = getFacilityDetailsMap(facility);
      this.feedbackURL = getFeedbackButtonURL(facility);
      facility.lastUpdated = convertToReadableDate(facility.updatedAt);
      return facility;
    });
    this.setState({ facility });
  }

  onWindowResize() {
    this.setState({ mobileView: window.innerWidth < 960 });
  }

  onBackClick() {
    this.props.history.push(`/map?selection=${this.id}`);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', debounce(this.onWindowResize, 400));
  }

  render() {
    const facility = this.state.facility;

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
                  {facility.url && <LinkButton href={facility.url} theme="rectangle-text" text="Website" />}
                  <LinkButton
                    href={'https://www.google.com/maps/dir/?api=1&destination=' + facility.address}
                    theme="rectangle-text"
                    text="Directions"
                  />
                  <LinkButton href={'tel:' + facility.phone} theme="rectangle-icon" text="Call">
                    <PhoneIcon />
                  </LinkButton>
                </div>
              </article>

              {/* Details Card */}
              <article className="card test-center-page__details-card">
                <div style={{ marginBottom: '30px' }}>
                  {this.facilityDetailsMap.map((row) => (
                    <DetailRow key={row.field} field={row.field} value={row.value} />
                  ))}
                </div>
                {facility.lastUpdated && (
                  <DetailRow field="Last Updated" value={facility.lastUpdated} textSize="small" color="primary" />
                )}
              </article>

              <div className="test-center-page__feedback">
                <span>Want to help us improve our data?</span>
                <a href={this.feedbackURL} target="_blank" rel="noopener noreferrer">
                  Suggest Change To Test Center Information
                </a>
              </div>
            </>
          )}
        </Container>
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
