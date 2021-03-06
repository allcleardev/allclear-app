import React, { Component } from 'react';
import { bindAll } from 'lodash';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import Header from '@components/general/headers/header';
import BottomNav from '@components/general/navs/bottom-nav';
import GAService from '@services/ga.service';
import { AppContext } from '@contexts/app.context';
import FacilityService from '@services/facility.service';
import MetadataService from '@services/metadata.service';

class StateListPage extends Component {
  static contextType = AppContext;

  state = {
    stateList: [],
  };

  constructor() {
    super();

    this.gaService = GAService.getInstance();
    this.metadataService = MetadataService.getInstance();
    this.gaService.setScreenName('state list');

    bindAll(this, ['getStates']);

    this.facilityService = FacilityService.getInstance();
  }

  async componentDidMount() {
    this.metadataService.setPageHead({
      title: `COVID-19 Testing Centers by State | AllClear`,
      description: `Find a COVID-19 testing center near you by selecting your state. AllClear is your guide to find where to get
      tested, quickly. Please contact your nearest center with any questions.`,
    });
    await this.getStates();
  }

  componentWillUnmount() {
    this.metadataService.setPageHead({
      title: 'RESET',
      description: 'RESET',
    });
  }

  async getStates() {
    const response = await this.facilityService.getStates();

    if (!response.err) {
      this.setState({
        stateList: response.data,
      });
    } else {
      this.setState({
        error: true,
        message: 'An error occurred. Please try again later.',
        loading: false,
      });
    }
  }

  render() {
    return (
      <div className="tracing">
        <Header enableBackBtn={true}></Header>
        <Container className="content">
          <h1>COVID-19 Testing Centers by State | AllClear</h1>
          <h2>
            Find a COVID-19 testing center near you by selecting your state. AllClear is your guide to find where to get
            tested, quickly. Please contact your nearest center with any questions.
          </h2>

          <div className="seo-list">
            {this.state.stateList &&
              this.state.stateList.map((res, i) => {
                return (
                  <Link
                    key={i}
                    to={`/locations/${res.name}`}>
                    {res.name} ({res.total})
                  </Link>
                );
              })}
          </div>
        </Container>
        <BottomNav active={2}></BottomNav>
      </div>
    );
  }
}
export default StateListPage;
