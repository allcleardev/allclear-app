import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import Header from '../../components/header-round';
import ProgressBottom from '../../components/progressBottom';
import states from './HealthWorkerStatus.state';

import Form from '@material-ui/core/Container';
import Box from '@material-ui/core/Container';
import { Button, Chip } from '@material-ui/core';

class HealthWorkerStatus extends React.Component {
  state = states;

  componentDidMount = () => {
    this.getHealthWorkerStatuses();
  };

  getHealthWorkerStatuses = () => {
    this.setState({ loading: true });

    Axios.get('https://api-dev.allclear.app/types/healthWorkerStatuses', {})
      .then((response) => {
        this.setState({ healthWorkerStatus: response.data });
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  handleChange = (event) => {
    let { healthWorkerStatus } = this.state;
    healthWorkerStatus.filter((status) => {
      if (status.name === event.name) {
        status.isActive = !status.isActive;
      }
    });
    this.setState({ healthWorkerStatus });
    sessionStorage.setItem('healthWorkerStatus', JSON.stringify(healthWorkerStatus));
  };

  render() {
    return (
      <div className="background-responsive">
        <div className="health-worker onboarding-page">
          <Header>
            <h1 className="heading">Health Worker Status</h1>
            <h2 className="sub-heading">
              Some test centers will test you if you’re a medical professional or first responder, even if you have no
              symptoms.
            </h2>
          </Header>
          <Form noValidate autoComplete="off" className="onboarding-body">
            <Box maxWidth="md">
              <label className="label">
                <strong>Select all that apply.</strong>
              </label>
              <div className="chips-group">
                {this.state.healthWorkerStatus &&
                  this.state.healthWorkerStatus.map((res) => {
                    return (
                      <Chip
                        key={res.id}
                        className={'chip' + (res.isActive ? ' Active' : '')}
                        label={res.name}
                        variant="outlined"
                        onClick={() => this.handleChange(res)}
                      ></Chip>
                    );
                  })}
              </div>
            </Box>
            <div className="button-container">
              <Link to="/background" className="hide-mobile">
                <Button variant="contained" className="back">
                  Back
                </Button>
              </Link>
              <Link to="/symptoms">
                <Button variant="contained" color="primary" className="next">
                  Next
                </Button>
              </Link>
            </div>
          </Form>
          <ProgressBottom progress="28%"></ProgressBottom>
        </div>
      </div>
    );
  }
}
export default HealthWorkerStatus;
