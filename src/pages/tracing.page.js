import React, { Component } from 'react';
import Header from '../components/general/headers/header';
import Container from '@material-ui/core/Container';
import GAService from '@services/ga.service';

class TracingPage extends Component {
  constructor() {
    super();

    this.gaService = GAService.getInstance();
    this.gaService.setScreenName('tracing');

    this.state = {};
  }

  render() {
    return (
      <div className="tracing">
        <Header enableBackBtn={true}></Header>
        <Container className="content">
          <h1>
            Trace with us. <br /> Beat the virus.
          </h1>
          <h2>Coming Soon</h2>
          <p>Participate in community-driven contact tracing to beat COVID-19.</p>
        </Container>
      </div>
    );
  }
}
export default TracingPage;
