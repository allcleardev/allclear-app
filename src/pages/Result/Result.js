import React, {Fragment} from 'react';
// import states from './Result.state';
import upload from '../../assets/images/uploadicon.png';
import logo from '../../assets/images/Union.png';
import Axios from 'axios';
import {Grid} from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

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
  };

  getTestTypes() {
    this.setState({loading: true});

    Axios.get('https://api-dev.allclear.app/types/testCriteria', {})
      .then((response) => {
        console.log(response);

        this.setState({testTypes: response.data});
        this.setState({loading: false});
      })
      .catch((error) => {
        console.log(error);
        this.setState({loading: false});
      });
  };

  getTestLocations() {
    this.setState({loading: true});

    Axios.get('https://api-dev.allclear.app/types/facilityTypes', {})
      .then((response) => {
        console.log(response);

        this.setState({testLocations: response.data});
        this.setState({loading: false});
      })
      .catch((error) => {
        console.log(error);
        this.setState({loading: false});
      });
  };

  handleTestTypeInputChange(event) {
    console.log('event', event.target.value);
    sessionStorage.setItem('testTypes', JSON.stringify(event.target.value));
  };

  handleTestLocationInputChange(event) {
    console.log('event', event.target.value);
    sessionStorage.setItem('testLocations', JSON.stringify(event.target.value));
  };

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
  };

  async submitResults() {
    const sessionId = sessionStorage.getItem('sessid');

    this.setState({loading: true});

    const payload = this.buildPayload();

    await Axios.post('https://api-dev.allclear.app/peoples/register', payload, {
      headers: {
        'X-AllClear-SessionID': sessionId,
      },
    })
      .then((response) => {
        console.log(response);
        this.setCookie('sessid', response.data.id);
        sessionStorage.setItem('sessid', response.data.id);
        sessionStorage.setItem('session', response.data);
        this.history.push('/home');
      })
      .catch((error) => {
        this.setState({loading: false});
      });
  };

  render() {
    const grid = (<Grid
      container
      justify="center">
      <Grid item xs={12} sm={6}>
        <LinearProgress color="primary" value="50"/>
      </Grid>
    </Grid>);

    return (
      <Fragment>
        {this.state.loading === false ? (
          <div className="WrapCondition">
            <div className="wrapInnerPart">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 text-left">
                    <div className="conditionLeft">
                      <img alt="logo" src={logo}/>
                    </div>
                  </div>
                  <div className="col-lg-6 text-right">
                    <div className="conditionRight">
                      <li>About Us</li>
                      <li>Help</li>
                    </div>
                  </div>
                </div>
                <div className="bodyWdth">
                  <div className="conditionHeading text-center">
                    <h2>Test Results</h2>
                    <p>
                      if you've taken a COVID-19 test already, please submit test details and results. Refer to our{' '}
                      <a className="policyClr" href="/">
                        Privacy Policy
                      </a>{' '}
                      for more details.
                    </p>
                  </div>

                  <div className="fieldArea003">
                    <div className="row">
                      <div className="col-lg-6 text-left">
                        <div className="BGleft">
                          <div className="BGheadings">
                            <div className="bg1 bgsyle1">
                              <strong>Test Type</strong> (Required)
                            </div>
                            <div className="bg2 bgsyle2">
                              We can give localized test center recommendations with your location.
                            </div>
                            <p>
                              <select className="selectBtn" onChange={this.handleTestTypeInputChange}>
                                {this.state.testTypes &&
                                this.state.testTypes.map((res) => {
                                  return <option value={res}>{res.name}</option>;
                                })}
                              </select>
                            </p>
                          </div>
                        </div>
                        <div className="xyz001">
                          <div className="xyz002 clrWhite">Did you test positive?</div>
                          <div className="xyz003">
                            <label className="switch">
                              <input type="checkbox" checked/>
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 text-left">
                        <div className="BGright">
                          <div className="BGheadings">
                            <div className="bg1 bgsyle1">
                              <strong>Test Location</strong> (Required)
                            </div>
                            <div className="bg2 bgsyle2">
                              We can give localized test center recommendations with your location.
                            </div>
                            <p>
                              <select className="selectBtn" onChange={this.handleTestLocationInputChange}>
                                {this.state.testLocations &&
                                this.state.testLocations.map((res) => {
                                  return <option value={res}>{res.name}</option>;
                                })}
                              </select>
                            </p>
                          </div>
                        </div>
                        <div className="xyz001">
                          <div className="xyz002 clrWhite">
                            Upload Image
                            <div className="vrfy">Verify your results by uploading an image</div>
                          </div>
                          <div className="xyz003">
                            <div className="vrChoseBtn">
                              <a href="/">Choose File</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="footerBtn mtAnable">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 text-left">
                      <button className="backBtn pure-material-button-contained">Back</button>
                      <a className="skipBtn" href="/">
                        Skip
                      </a>
                    </div>
                    <div className="col-lg-6 col-md-6 text-right">
                      <button className="nextBtn pure-material-button-contained" onClick={this.submitResults}>
                        Submit Test Results
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (grid)
        }

        <div className="conditonRSP">
          <div className="mainWrapper">
            <div className="wrapScreen">
              <div className="screenHead">
                <div style={{paddingTop: 25}}></div>
                <div className="arrow">
                  <i className="fa fa-angle-left" aria-hidden="true"></i>
                </div>
                <div className="headingTxt">Test Results</div>
                <div className="subHeading">
                  If you've taken a COVID-19 test, please submit your results here. These results are private unless you
                  Choose to share.
                </div>
              </div>
              <div className="workSpaceArea">
                <div className="inputFeild">
                  <p className="inputHeading">Test Type</p>
                  <p>
                    <select className="selectBTNM">
                      <option>Select Test</option>
                      <option>demo</option>
                      <option>demo</option>
                    </select>
                  </p>
                </div>

                <div className="inputFeild">
                  <p className="inputHeading">Test Location</p>
                  <p>
                    <select className="selectBTNM">
                      <option>Select Location</option>
                      <option>demo</option>
                      <option>demo</option>
                    </select>
                  </p>
                </div>

                <div className="xyz001">
                  <div className="xyz002">Did you test positive?</div>
                  <div className="xyz003">
                    <label className="switch">
                      <input type="checkbox"/>
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>

                <div className="xyz001">
                  <div className="xyz002">
                    <div>Upload Image</div>
                    <div className="txt-1">Verify your results by uploading an image</div>
                  </div>
                  <div className="xyz003">
                    <img alt={'upload'} src={upload}/>
                  </div>
                </div>

                <div className="policyBtn">
                  <a href="/">Privacy Policy</a>
                </div>
                <div className="wrapBtn">
                  <button>Submit Test Result</button>
                </div>
                <div className="policyBtn">
                  <a className="skipBtn" href="/">
                    Skip
                  </a>
                </div>
              </div>

              <div style={{marginBottom: 20 + 'px', float: 'left', width: 100 + '%'}}></div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Result;
