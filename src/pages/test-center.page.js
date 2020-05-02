import React, { Component } from 'react';
import { AppContext } from '@contexts/app.context';
import { bindAll, get } from 'lodash';
import SolidHeader from '@general/headers/header-solid';
import FacilityService from '@services/facility.service';

export default class TestCenterPage extends Component {
  static contextType = AppContext;
  state = {
    facility: null
  };

  constructor(props) {
    super(props);
    bindAll(this, ['componentDidMount']);
    this.id = props.match.params.id;
    this.isLoading = true;
    this.facilityService = FacilityService.getInstance();

    console.log('props', props.match.params.id);
  }

  async componentDidMount() {
    const sessionId = get(this, ['context', 'appState', 'sessionId']);
    this.isLoggedIn = sessionId ? true : false;
    const facility = await this.facilityService.get(this.id, sessionId).then((facility) => {
      this.loading = false;
      return facility;
    });
    this.setState({ facility });
    console.log('mounting', this.state.facility);
  }

  render() {
    const facility = this.state.facility;

    return (
      <div className="test-center-page">
        <SolidHeader isLoggedIn={this.isLoggedIn}></SolidHeader>
        <div className="test-center-page__top-background"></div>
        {
          facility ? (
            <article className="card test-center-page__overview-card">
              <h1 className="card__title">{facility.name}</h1>
              <div className="card__content">
                <span>{facility.address}</span>
                <span>{facility.phone || 'Phone Number Unavailable'}</span>
              </div>
            </article>
          )
            : <div>watup</div>
        }
      </div>
    );
  }
}