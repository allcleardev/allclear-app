import React, { Component } from 'react';
import Header from '../components/general/headers/header';
import BottomNav from '../components/general/navs/bottom-nav';
import Container from '@material-ui/core/Container';
import GAService from '@services/ga.service';
import {AppContext} from '@contexts/app.context';
import {bindAll} from 'lodash';
import FacilityService from '@services/facility.service';
import {Link} from 'react-router-dom';

class StatePage extends Component {
  static contextType = AppContext;

  state = {
    stateName: '',
    cityList: []
  };

  constructor() {
    super();

    this.gaService = GAService.getInstance();
    this.gaService.setScreenName('cities');

    bindAll(this, ['getCities']);

    this.facilityService = FacilityService.getInstance();
  }

  async componentDidMount() {
    this.getCities();
  }

  async getCities() {
    const stateParam = this.props.match.params.state;
    const response = await this.facilityService.getCities(stateParam);

    if (!response.err) {
      this.setState({
        stateName: stateParam,
        cityList: response.data
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
          <h1>
            {this.state.stateName} COVID-19 Testing Centers | AllClear
          </h1>
          <h2>
            Find a COVID-19 testing center in {this.state.stateName} by selecting your city. AllClear is your guide
            to find where to get tested, quickly. Please contact your nearest center with any questions.
          </h2>

          <div className="seo-list">
            {this.state.cityList &&
            this.state.cityList.map((res) => {
              return (
                <Link to={`/locations/${this.state.stateName}/${res.name}`}>{res.name} ({res.total})</Link>
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
