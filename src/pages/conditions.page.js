import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { bindAll } from 'lodash';

import RoundHeader from '../components/general/headers/header-round';
import ProgressBottom from '../components/general/navs/progress-bottom';

import Form from '@material-ui/core/Container';
import Box from '@material-ui/core/Container';
import { Button, Chip } from '@material-ui/core';

class ConditionsPage extends Component {
  state = {
    conditionObj: {},
    conditions: [],
  };

  constructor() {
    super();
    bindAll(this, ['componentDidMount', 'getConditions', 'selectAll', 'handleChange']);
  }

  componentDidMount() {
    this.getConditions();
  }

  getConditions() {
    this.setState({ loading: true });

    Axios.get('/types/conditions', {})
      .then((response) => {
        this.setState({ conditions: response.data });
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  selectAll() {
    let { conditions } = this.state;
    conditions.map((condition) => {
      condition.isActive = true;
      return true;
    });
    this.setState({ conditions });
    sessionStorage.setItem('conditions', JSON.stringify(conditions));
  }

  handleChange(event) {
    let { conditions } = this.state;
    conditions.map((condition) => {
      if (condition.name === event.name) {
        condition.isActive = !condition.isActive;
      }
      return true;
    });
    this.setState({ conditions });
    sessionStorage.setItem('conditions', JSON.stringify(conditions));
  }

  render() {
    return (
      <div className="background-responsive">
        <div className="conditions onboarding-page">
          <RoundHeader>
            <h1 className="heading">Conditions</h1>
            <h2 className="sub-heading">Some test centers are only seeing patients with certain health conditions.</h2>
          </RoundHeader>
          <Form noValidate autoComplete="off" className="onboarding-body">
            <Box maxWidth="md">
              <label className="label">
                <strong>Select all that apply.</strong>
              </label>
              <div className="chips-group">
                {this.state.conditions &&
                  this.state.conditions.map((res) => {
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
export default ConditionsPage;
