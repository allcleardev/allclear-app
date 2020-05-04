import React, { Component } from 'react';
import Header from '../components/general/headers/header';
import BottomNav from '../components/general/navs/bottom-nav';
import Container from '@material-ui/core/Container';
import GAService from '@services/ga.service';
import { DEFAULT_NAV_ITEMS } from '@components/general/headers/header.constants';
import {AppContext} from '@contexts/app.context';
import {bindAll} from 'lodash';
import FacilityService from '@services/facility.service';
import {Link} from 'react-router-dom';

class CityPage extends Component {
  static contextType = AppContext;

  state = {
    stateName: '',
    cityName: '',
    centerList: []
  };

  constructor() {
    super();

    this.gaService = GAService.getInstance();
    this.gaService.setScreenName('test-centers');

    bindAll(this, ['getCenters']);

    this.facilityService = FacilityService.getInstance();
  }

  async componentDidMount() {
    this.getCenters();
  }

  async getCenters() {
    const stateParam = this.props.match.params.state;
    const cityParam = this.props.match.params.city;

    const response = await this.facilityService.search({state: stateParam, city: cityParam});

    if (!response.err) {
      this.setState({
        stateName: stateParam,
        cityName: cityParam,
        centerList: response.data.records
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
        <Header navItems={DEFAULT_NAV_ITEMS} enableBackBtn={true}></Header>
        <Container className="content">
          <h1>
            {this.state.cityName}, {this.state.stateName} COVID-19 Testing Centers | AllClear
          </h1>
          <h2>
            View all COVID-19 testing centers in {this.state.cityName}, {this.state.stateName}. AllClear is your guide
            to find where to get tested, quickly. Please contact your nearest center with any questions.
          </h2>

          <div className="seo-list">
            {this.state.centerList &&
            this.state.centerList.map((res) => {
              return (
                <Link
                  key={res.id}
                  to={`/test-centers/${res.id}`}>{res.name}</Link>
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
