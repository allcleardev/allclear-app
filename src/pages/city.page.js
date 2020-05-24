import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import {bindAll, startCase, get} from 'lodash';

import Header from '@general/headers/header';
import BottomNav from '@general/navs/bottom-nav';
import GAService from '@services/ga.service';
import { AppContext } from '@contexts/app.context';
import FacilityService from '@services/facility.service';
import MetadataService from '@services/metadata.service';
import {applyCovidTag, isTaggableLocation} from '@util/general.helpers';

class CityPage extends Component {
  static contextType = AppContext;

  state = {
    stateName: '',
    cityName: '',
    centerList: [],
  };

  constructor() {
    super();

    this.gaService = GAService.getInstance();
    this.gaService.setScreenName('test-centers');

    bindAll(this, ['getCenters', 'prepCovidTag']);

    this.facilityService = FacilityService.getInstance();
    this.metadataService = MetadataService.getInstance();
  }

  async componentDidMount() {
    await this.getCenters();
    let {stateName, cityName} = this.state;
    this.metadataService.setPageHead({
      title: `${cityName}, ${stateName} COVID-19 Testing Centers | AllClear`,
      description: `View all COVID-19 testing centers in ${cityName}, ${stateName}. AllClear is your guide to find where to get tested,
      quickly. Please contact your nearest center with any questions.`,
    });
  }

  componentWillUnmount() {
    this.metadataService.setPageHead({
      title: 'RESET',
      description: 'RESET',
    });
  }

  async getCenters() {
    const stateParam = this.props.match.params.state;
    const cityParam = this.props.match.params.city;
    const response = await this.facilityService.search({
      state: stateParam,
      city: cityParam,
      pageSize: 500,
      sortOn: 'updatedAt',
      sortDir: 'DESC'
    });

    if (!response.err) {
      this.setState({
        stateName: startCase(stateParam),
        cityName: startCase(cityParam),
        centerList: response.data.records,
      });
    } else {
      this.setState({
        error: true,
        message: 'An error occurred. Please try again later.',
        loading: false,
      });
    }
    const [latestCenter] = this.state.centerList;
    isTaggableLocation(latestCenter.updatedAt) && this.prepCovidTag();
  }

  prepCovidTag() {
    const {stateName, cityName} = this.state;
    const thisUrl = `${window.location.origin}/location/${stateName}/${cityName}`;
    const name = `COVID-19 Test Centers in ${cityName}, ${stateName}`;
    const [latestCenter] = this.state.centerList;
    const {updatedAt} = latestCenter;
    applyCovidTag({
      text: `Get tested in ${cityName}, ${stateName} for SARS-CoV-2, the coronavirus that causes COVID-19.`,
      name,
      city: cityName,
      state: stateName,
      lastUpdated: updatedAt,
      url: thisUrl,
      type: 'LocalBusiness'
    });
  }

  render() {
    return (
      <div className="tracing">
        <Header enableBackBtn={true}></Header>
        <Container className="content">
          <h1>
            {this.state.cityName}, {this.state.stateName} COVID-19 Testing Centers | AllClear
          </h1>
          <h2>
            View {get(this,'state.centerList.length') || 'all'} COVID-19 testing centers in
            {this.state.cityName}, {this.state.stateName}. AllClear is your guide to find where to get tested, quickly.
            Please contact your nearest center with any questions.
          </h2>

          <div className="seo-list">
            {this.state.centerList &&
              this.state.centerList.map((res) => {
                return (
                  <Link key={res.id} to={`/test-centers/${res.id}`}>
                    {res.name}
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
export default CityPage;
