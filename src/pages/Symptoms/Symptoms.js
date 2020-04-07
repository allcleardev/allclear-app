import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import {bindAll} from 'lodash';
import RoundHeader from '../../components/headers/header-round';
import ProgressBottom from '../../components/progressBottom';
import states from './Symptoms.state';

import Form from '@material-ui/core/Container';
import Box from '@material-ui/core/Container';
import { Button, Chip } from '@material-ui/core';

class Symptom extends Component {
  state = states;

  constructor() {
    super();
    bindAll(this, [
      'componentDidMount',
      'getSymptoms',
      'selectAll',
      'handleChange',
    ]);
  }

  componentDidMount(){
    this.getSymptoms();
  };

  getSymptoms() {
    this.setState({ loading: true });

    Axios.get('https://api-dev.allclear.app/types/symptoms', {})
      .then((response) => {
        this.setState({ symptoms: response.data });
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  selectAll (){
    let { symptoms } = this.state;
    symptoms.filter((symptom) => {
      symptom.isActive = true;
    });
    this.setState({ symptoms });
    sessionStorage.setItem('symptoms', JSON.stringify(symptoms));
  };

  handleChange(event) {
    let { symptoms } = this.state;
    symptoms.filter((symptom) => {
      if (symptom.name === event.name) {
        symptom.isActive = !symptom.isActive;
      }
    });
    this.setState({ symptoms });
    sessionStorage.setItem('symptoms', JSON.stringify(symptoms));
  };

  render() {
    return (
      <div className="background-responsive">
        <div className="symptoms onboarding-page">
          <RoundHeader>
            <h1 className="heading">Symptoms</h1>
            <h2 className="sub-heading">Most test centers are only seeing patients with certain symptoms.</h2>
          </RoundHeader>
          <Form noValidate autoComplete="off" className="onboarding-body">
            <Box maxWidth="md">
              <label className="label">
                <strong onClick={() => this.selectAll()}>Select all that apply.</strong>
              </label>
              <div className="chips-group">
                {this.state.symptoms &&
                  this.state.symptoms.map((res) => {
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
              <Link to="/conditions" className="hide-mobile">
                <Button variant="contained" className="back">
                  Back
                </Button>
              </Link>
              <Link to="/results">
                <Button variant="contained" color="primary" className="next">
                  Next
                </Button>
              </Link>
            </div>
          </Form>
          <ProgressBottom progress="42%"></ProgressBottom>
        </div>
      </div>
    );
  }
}
export default Symptom;
