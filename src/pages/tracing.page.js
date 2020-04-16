import React, { Component } from 'react';
import Header from '../components/headers/header';
import NavBottom from '../components/navBottom';
import Container from '@material-ui/core/Container';
class TracingPage extends Component {
  constructor() {
    super();
    this.state = {};
    this.navItems = [
      { route: '/map', name: 'Find Tests' },
      { route: '/contact-tracing', name: 'Tracing' },
      { route: '/profile', name: 'Profile' },
    ];
  }

  render() {
    return (
      <div className="tracing">
        <Header navItems={this.navItems} enableBackBtn={true}></Header>
        <Container className="content">
          <h1>
            Trace with us. <br /> Beat the virus.
          </h1>
          <h2>Coming Soon</h2>
          <p>Participate in community-driven contact tracing to beat COVID-19.</p>
        </Container>
        <NavBottom active={2}></NavBottom>
      </div>
    );
  }
}
export default TracingPage;
