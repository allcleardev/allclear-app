import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import Header from '../../components/header-round';
import ProgressBottom from '../../components/progressBottom';
// import states from './Result.state';

import Form from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, Switch, Select, MenuItem, FormControl, FormControlLabel } from '@material-ui/core';

class Result extends React.Component {
  constructor() {
    super();
    this.getTestTypes = this.getTestTypes.bind(this);
    this.getTestLocations = this.getTestLocations.bind(this);
    this.handleTestTypeInputChange = this.handleTestTypeInputChange.bind(this);
    this.handleTestLocationInputChange = this.handleTestLocationInputChange.bind(this);
    this.buildPayload = this.buildPayload.bind(this);
    this.submitResults = this.submitResults.bind(this);
  }

  componentDidMount() {
    this.getTestTypes();
    this.getTestLocations();
  }

  getTestTypes() {
    this.setState({ loading: true });

    Axios.get('https://api-dev.allclear.app/types/testCriteria', {})
      .then((response) => {
        this.setState({ testTypes: response.data });
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  getTestLocations() {
    this.setState({ loading: true });

    Axios.get('https://api-dev.allclear.app/types/facilityTypes', {})
      .then((response) => {
        this.setState({ testLocations: response.data });
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  handleTestTypeInputChange(event) {
    this.setState({
      selectedTestType: event.target.value,
    });
    sessionStorage.setItem('testTypes', JSON.stringify(event.target.value));
  }

  handleTestLocationInputChange(event) {
    this.setState({
      selectedTestLocation: event.target.value,
    });
    sessionStorage.setItem('testLocations', JSON.stringify(event.target.value));
  }

  buildPayload() {
    const dob = sessionStorage.getItem('dob');
    const phone = sessionStorage.getItem('phone');

    // Format Conditions
    let conditions = sessionStorage.getItem('conditions');

    if (typeof conditions === 'string') {
      conditions = JSON.parse(conditions);
    }

    let conditionsArray = [];

    conditions.forEach((condition) => {
      if (condition.isActive) {
        conditionsArray.push({
          id: condition.id,
          name: condition.name,
        });
      }
    });

    // Format Exposures
    let exposures = sessionStorage.getItem('exposures');

    if (typeof exposures === 'string') {
      exposures = JSON.parse(exposures);
    }

    let exposuresArray = [];

    exposures.forEach((exposure) => {
      if (exposure.isActive) {
        exposuresArray.push({
          id: exposure.id,
          name: exposure.name,
        });
      }
    });

    // Format Symptoms
    let symptoms = sessionStorage.getItem('symptoms');

    if (typeof symptoms === 'string') {
      symptoms = JSON.parse(symptoms);
    }

    let symptomsArray = [];

    symptoms.forEach((symptom) => {
      if (symptom.isActive) {
        symptomsArray.push({
          id: symptom.id,
          name: symptom.name,
        });
      }
    });

    let payload = {
      dob,
      name: phone,
      latitude: 0,
      longitude: 0,
      conditions: conditionsArray,
      exposures: exposuresArray,
      symptoms: symptomsArray,
    };

    return payload;
  }

  async submitResults() {
    const sessionId = sessionStorage.getItem('sessid');

    this.setState({ loading: true });

    const payload = this.buildPayload();

    await Axios.post('https://api-dev.allclear.app/peoples/register', payload, {
      headers: {
        'X-AllClear-SessionID': sessionId,
      },
    })
      .then((response) => {
        this.setCookie('sessid', response.data.id);
        sessionStorage.setItem('sessid', response.data.id);
        sessionStorage.setItem('session', response.data);
        this.history.push('/home');
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }

  render() {
    const grid = (
      <Grid container justify="center">
        <Grid item xs={12} sm={6}>
          <LinearProgress color="primary" value="50" variant="indeterminate" />
        </Grid>
      </Grid>
    );

    const IOSSwitch = withStyles((theme) => ({
      root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
      },
      switchBase: {
        padding: 1,
        '&$checked': {
          transform: 'translateX(16px)',
          color: theme.palette.common.white,
          '& + $track': {
            backgroundColor: '#52d869',
            opacity: 1,
            border: 'none',
          },
        },
        '&$focusVisible $thumb': {
          color: '#52d869',
          border: '6px solid #fff',
        },
      },
      thumb: {
        width: 24,
        height: 24,
      },
      track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
      },
      checked: {},
      focusVisible: {},
    }))(({ classes, ...props }) => {
      return (
        <Switch
          focusVisibleClassName={classes.focusVisible}
          disableRipple
          classes={{
            root: classes.root,
            switchBase: classes.switchBase,
            thumb: classes.thumb,
            track: classes.track,
            checked: classes.checked,
          }}
          {...props}
        />
      );
    });

    return (
      <div className="background-responsive">
        <div className="results onboarding-page">
          <Header>
            <h1 className="heading">Test Results</h1>
            <h2 className="sub-heading">
              If you've taken a COVID-19 test already, please submit test details and results. Refer to our
              <a href="/"> Privacy Policy </a>for more details.
            </h2>
          </Header>
          {this.state && this.state.loading === false ? (
            <Form noValidate autoComplete="off" className="onboarding-body">
              <Box maxWidth="md">
                <section className="section">
                  <FormControl variant="outlined">
                    <label className="label" htmlFor="testTypes">
                      <strong>Test Type</strong> (Required) <br />
                      <span className="description">
                        {' '}
                        We can give localized test center recommendations with your location.
                      </span>
                    </label>
                    <Select
                      id="testTypes"
                      className="input"
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      value={this.state.selectedTestType ? this.state.selectedTestType : ''}
                      onChange={this.handleTestTypeInputChange}
                    >
                      <MenuItem disabled value="">
                        Select Test
                      </MenuItem>
                      {this.state.testTypes &&
                      this.state.testTypes.map((res) => {
                        return <MenuItem value={res}>{res.name}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>

                  <FormControl variant="outlined">
                    <label className="label" htmlFor="testTypes">
                      <strong>Test Location</strong> (Required) <br />
                      <span className="description">
                        We can give localized test center recommendations with your location.
                      </span>
                    </label>
                    <Select
                      id="testLocation"
                      className="input"
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      value={this.state.selectedTestLocation ? this.state.selectedTestLocation : ''}
                      onChange={this.handleTestLocationInputChange}
                    >
                      <MenuItem disabled value="">
                        Choose Location
                      </MenuItem>
                      {this.state.testLocations &&
                      this.state.testLocations.map((res) => {
                        return <MenuItem value={res}>{res.name}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>

                  <article className="article">
                    <label className="label">
                      <strong>Did you test positive?</strong>
                    </label>
                    <FormControlLabel
                      className="toggle"
                      control={<IOSSwitch name="checkedB" />} // TODO: https://material-ui.com/components/switches/#customized-switches
                    />
                  </article>

                  <article className="article">
                    <label className="label">
                      <strong>Upload Image</strong> <br />
                      <span className="description">Verify your results by uploading an image</span>
                    </label>
                    ((Choose File))
                  </article>
                </section>
              </Box>
              <div className="button-container">
                <Link to="/symptoms" className="hide-mobile">
                  <Button variant="contained" className="back">
                    Back
                  </Button>
                </Link>
                <Link to="/">Skip</Link> {/* click to submit? */}
                <Button variant="contained" color="primary" className="next" onClick={this.submitResults}>
                  Next
                </Button>
              </div>
            </Form>
          ) : (
             grid
           )}
          {this.state && this.state.loading === false ? <ProgressBottom progress="56%"></ProgressBottom> : null}
        </div>
      </div>
    );
  }
}

export default Result;
