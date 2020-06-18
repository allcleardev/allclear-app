import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import { bindAll, startCase, get } from 'lodash';
import { Link } from 'react-router-dom';

import { AppContext } from '@contexts/app.context';
import GAService from '@services/ga.service';
import FacilityService from '@services/facility.service';
import MetadataService from '@services/metadata.service';
import Header from '@components/general/headers/header';
import BottomNav from '@components/general/navs/bottom-nav';

class StatePage extends Component {
  static contextType = AppContext;

  state = {
    stateName: '',
    cityList: [],
  };

  constructor() {
    super();

    this.gaService = GAService.getInstance();
    this.metadataService = MetadataService.getInstance();
    this.facilityService = FacilityService.getInstance();
    this.gaService.setScreenName('cities');

    bindAll(this, ['getCities']);

  }

  async componentDidMount() {
    await this.getCities();
    let { stateName } = this.state;
    stateName = startCase(stateName);
    this.metadataService.setPageHead({
      title: `${stateName} COVID-19 Testing Centers | AllClear`,
      description: `Find a COVID-19 testing centers in ${stateName} by selecting your city. AllClear is your guide to find where to get
      tested, quickly. Please contact your nearest center with any questions.`,
    });
  }

  componentWillUnmount() {
    this.metadataService.setPageHead({
      title: 'RESET',
      description: 'RESET',
    });
  }

  async getCities() {
    const stateParam = this.props.match.params.state;
    const response = await this.facilityService.getCities(stateParam);
    if (!response.err) {
      this.setState({
        stateName: stateParam,
        cityList: response.data,
        numFacilities: response.data.length
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
          <h1>{startCase(this.state.stateName)} COVID-19 Testing Centers ({get(this, 'state.numFacilities', 0)})</h1>
          <h2>
            Find a COVID-19 testing center in {this.state.stateName} by selecting your city. AllClear is your guide to
            find where to get tested, quickly. Please contact your nearest center with any questions.
          </h2>

          <div className="seo-list">
            {this.state.cityList &&
              this.state.cityList.map((res, i) => {
                return (
                  <Link
                    key={i}
                    to={`/locations/${this.state.stateName}/${res.name}`}>
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

export default StatePage;
