import React, { Fragment } from "react";
import states from "./Background.state";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Union.png";
import Axios from "axios";

class Background extends React.Component {
  constructor(props) {
    super(props);
    this.state = {exposure: 'live_with_someone', dob: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleDoBChange = this.handleDoBChange.bind(this);
  }

  componentDidMount = () => {
    this.getExposures();
  };

  getExposures = () => {
    this.setState({ loading: true });

    Axios.get(
      "https://api-dev.allclear.app/types/exposures", {}
    ).then((response) => {
      console.log(response);

      this.setState({ exposures: response.data });
      this.setState({ loading: false });
    }).catch((error) => {
      console.log(error);
      this.setState({ loading: false });
    });
  };

  handleLocationChange = (event) => {
    if (event && event.target && event.target.value) {
      this.setState({location: event.target.value});
      sessionStorage.setItem('location', event.target.value);
    }
  };

  handleDoBChange = (event) => {
    if (event && event.target && event.target.value) {
      this.setState({dob: event.target.value});

      let dob = event.target.value + 'T00:00:00Z';
      sessionStorage.setItem('dob', dob);
    }
  };

  handleChange = (event) => {
    let { exposures } = this.state;
    exposures.filter((exposure) => {
      if (exposure.name == event.name) {
        exposure.isActive = !exposure.isActive;
      }
    });
    this.setState({ exposures });
    sessionStorage.setItem('exposures', JSON.stringify(exposures));
  };

  render() {
    return (
      <div className="background-responsive">
        <Fragment>
          <div className="WrapCondition">
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
                    <h2>Background</h2>
                    <p>
                      Provide information to help us recommend the test sites
                      for you.
                    </p>
                  </div>

                  <div className="fieldArea003">
                    <div className="row">
                      <div className="col-lg-7 text-left">
                        <div className="BGleft">
                          <div className="BGheadings">
                            <div className="bg1 bgsyle1">
                              <strong>Location</strong> (Required)
                            </div>
                            <div className="bg2 bgsyle2">
                              We can give localized test center recommendations
                              with your location.
                            </div>
                            <p>
                              <input
                                className="inputSet"
                                type="text"
                                placeholder="Location"
                                onChange={this.handleLocationChange}
                              />
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-5 text-left">
                        <div className="BGright">
                          <div className="BGheadings">
                            <div className="bg1 bgsyle1">
                              <strong>Date of Birth</strong> (Required)
                            </div>
                            <div className="bg2 bgsyle2">
                              Some test centers have minimum age requirements.
                            </div>
                            <p>
                              <input
                                className="inputSets"
                                type="date"
                                placeholder="MM/DD/YYYY"
                                onChange={this.handleDoBChange}
                              />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="wrp_btns008 widNone mtZero text-center">
                    <div className="BGheadings">
                      <div className="bg1">Exposure to COVID-19</div>
                      <div className="bg2">
                        Some test centers require knowledge of your exposure to
                        people who have tested positive for COVID-19.
                      </div>
                    </div>

                    {this.state.exposures && this.state.exposures.map((res) => {
                      return (
                        <li onClick={() => this.handleChange(res)} className={"pure-material-button-contained" + (res.isActive ? ' Active' : '')}>{res.name}</li>
                      )

                    })}
                  </div>
                </div>

                <div className="footerBtn mtAnable">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 text-left">
                      <button className="backBtn pure-material-button-contained">
                        Back
                      </button>
                    </div>
                    <div className="col-lg-6 col-md-6 text-right">
                      <Link to="/condition">
                      <button className="nextBtn pure-material-button-contained">
                        Next
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="conditonRSP">
            <div className="mainWrapper">
              <div className="wrapScreen">
                <div className="screenHead">
                  <div style={{ paddingTop: 60 }}></div>
                  <div className="arrow">
                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                  </div>
                  <div className="headingTxt">Background</div>
                  <div className="subHeading">
                    Provide information to help us recommend the best test
                    sites.
                  </div>
                </div>
                <div className="workSpaceArea">
                  <div className="responsiveWorkSpace">
                    <div className="text-left">
                      <div className="BGleft">
                        <div className="BGheadings">
                          <div className="bg1 bgsyle1">
                            <h5>Location</h5>
                          </div>
                          <div className="bg2 bgsyle2">
                            We can give localized test center recommendations
                            with your location.
                          </div>
                          <p>
                            <input
                              className="inputSet"
                              type="text"
                              placeholder="Location"
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="BGright">
                        <div className="BGheadings">
                          <div className="bg1 bgsyle1">
                            <h5>Date of Birth</h5>
                          </div>
                          <div className="bg2 bgsyle2">
                            Some test centers have minimum age requirements.
                          </div>
                          <p>
                            <input
                              className="inputSets"
                              type="text"
                              placeholder="MM/DD/YYYY"
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="wrapBtn">
                    <button className="pure-material-button-contained">
                      Send
                    </button>
                  </div>
                </div>

                <div
                  style={{ marginBottom: 20, float: "right", width: "100%" }}
                ></div>
              </div>
            </div>
          </div>
        </Fragment>
      </div>
    );
  }
}
export default Background;
