import React, { Fragment } from 'react';
import states from './Result.state';
import upload from '../../assets/images/uploadicon.png';
import {Link} from "react-router-dom";
import logo from '../../assets/images/Union.png';
import Axios from "axios";
import {Grid} from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";

class Result extends React.Component {
    state = states;

    componentDidMount = () => {
    };

    handleTestTypeInputChange = (event) => {
        console.log('event',event.target.value)
        sessionStorage.setItem('test_type', event.target.value);
    };

    handleTestLocationInputChange = (event) => {
        console.log('event',event.target.value)
        sessionStorage.setItem('test_location', event.target.value);
    };

    buildPayload = () => {
        let payload = {
            "dob": "2020-04-04T00:40:07.909Z",
            "statusId": "string",
            "status": {
                "id": "string",
                "name": "string"
            },
            "statureId": "string",
            "stature": {
                "id": "string",
                "name": "string"
            },
            "sexId": "string",
            "sex": {
                "id": "string",
                "name": "string"
            },
            "latitude": 0,
            "longitude": 0,
            "alertable": true,
            "active": true,
            "authAt": "2020-04-04T00:40:07.909Z",
            "phoneVerifiedAt": "2020-04-04T00:40:07.909Z",
            "emailVerifiedAt": "2020-04-04T00:40:07.909Z",
            "createdAt": "2020-04-04T00:40:07.909Z",
            "updatedAt": "2020-04-04T00:40:07.909Z",
            "conditions": [
                {
                    "id": "string",
                    "name": "string",
                    "createdAt": "2020-04-04T00:40:07.909Z"
                }
            ],
            "exposures": [
                {
                    "id": "string",
                    "name": "string",
                    "createdAt": "2020-04-04T00:40:07.909Z"
                }
            ],
            "symptoms": [
                {
                    "id": "string",
                    "name": "string",
                    "createdAt": "2020-04-04T00:40:07.909Z"
                }
            ]
        }
    }


    submitResults = async () => {
        this.setState({ loading: true });
        const phone = sessionStorage.getItem('phone');

        console.log('phone', phone);

        await Axios.post(
          "https://api-dev.allclear.app/peoples/register",
          {
              phone: phone,
              beenTested: false,
              haveSymptoms: false
          }
        ).then((response) => {
            console.log(response);
            sessionStorage.setItem('sessid', response.id);
            this.history.push("/home");
        }).catch((error) => {
            this.setState({ loading: false });
        });

    };

    render() {
        return (
            <Fragment>
                {this.state.loading === false ? <div className="WrapCondition">
                    <div className="wrapInnerPart">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 text-left">
                                    <div className="conditionLeft">
                                        <img src={logo} />
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
                                        if you've taken a COVID-19 test already, please submit test details and results. Refer to
							our <a className="policyClr" href="#">Privacy Policy</a> for more details.</p>
                                </div>

                                <div className="fieldArea003">

                                    <div className="row">
                                        <div className="col-lg-6 text-left">
                                            <div className="BGleft">
                                                <div className="BGheadings">
                                                    <div className="bg1 bgsyle1"><strong>Test Type</strong> (Required)</div>
                                                    <div className="bg2 bgsyle2">We can give localized test center recommendations with
											your location.</div>
                                                    <p>
                                                        <select className="selectBtn" onChange={this.handleTestTypeInputChange}>
                                                            <option>Test Type</option>
                                                            <option>demo</option>
                                                            <option>demo</option>
                                                        </select>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="xyz001">
                                                <div className="xyz002 clrWhite">Did you test positive?</div>
                                                <div className="xyz003">
                                                    <label className="switch">
                                                        <input type="checkbox" checked />
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 text-left">
                                            <div className="BGright">
                                                <div className="BGheadings">
                                                    <div className="bg1 bgsyle1"><strong>Test Location</strong> (Required)</div>
                                                    <div className="bg2 bgsyle2">We can give localized test center recommendations with
											your location.</div>
                                                    <p>
                                                        <select className="selectBtn"  onChange={this.handleTestLocationInputChange}>
                                                            <option>Test Location</option>
                                                            <option>demo</option>
                                                            <option>demo</option>
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
                                                        <a href="#">Choose File</a>
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
                                        <a className="skipBtn" href="#">Skip</a>
                                    </div>
                                    <div className="col-lg-6 col-md-6 text-right">
                                        <button className="nextBtn pure-material-button-contained">Submit Test Results</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                :
                  <Grid container justify="center">
                      <Grid item xs={12} sm={6}>
                          <LinearProgress color="primary" value="50" />
                      </Grid>
                  </Grid>
                }


                <div className="conditonRSP">
                    <div className="mainWrapper">
                        <div className="wrapScreen">
                            <div className="screenHead">
                                <div style={{ paddingTop: 25 }}></div>
                                <div className="arrow"><i className="fa fa-angle-left" aria-hidden="true"></i></div>
                                <div className="headingTxt">Test Results</div>
                                <div className="subHeading">
                                    If you've taken a COVID-19 test, please submit your results here. These results are private
                                    unless you Choose to share.
					</div>
                            </div>
                            <div className="workSpaceArea">
                                <div className="inputFeild">
                                    <p className="inputHeading">Test Type</p>
                                    <p>
                                        <select className="selectBTNM" >
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
                                            <input type="checkbox"  />
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
                                        <img src={upload} />
                                    </div>
                                </div>


                                <div className="policyBtn"><a href="#">Privacy Policy</a></div>
                                <div className="wrapBtn"><button>Submit Test Result</button></div>
                                <div className="policyBtn"><a className="skipBtn" href="#">Skip</a></div>


                            </div>

                            <div style={{ marginBottom: 20 + 'px', float: 'left', width: 100 + '%' }}></div>
                        </div>

                    </div>
                </div>

            </Fragment>
        )
    }
}
export default Result
