import React, { Fragment } from 'react';
// import states from './Symptom.state';
// import './Symptom.module.css';
import logo from '../../assets/images/Union.png';

class AddTest extends React.Component {
  // state = states

  componentDidMount = () => {};

  handleInputChange = (event, name) => {};

  render() {
    return (
      <Fragment>
        <div className="diffBGwrapper">
          <div className="divClassBG">
            <div className="WrapCondition">
              <div className="wrapInnerPart">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6 text-left">
                      <div className="conditionLeft">
                        <img alt="logo" src={logo} />
                      </div>
                    </div>
                    <div className="col-lg-6 text-right">
                      <div className="conditionRight">
                        <li>Home</li>
                        <li>Test</li>
                        <li>Tracing</li>
                        <li>Friends</li>
                        <li>Profile</li>
                      </div>
                    </div>
                  </div>

                  <div className="conditionHeading  w-50per">
                    <i className="fa fa-angle-left wBolder" aria-hidden="true"></i>
                    <span>Back</span>
                    <div className="absoluteTY">
                      <span>Edit Test Result</span>
                    </div>
                  </div>

                  <div className="boxWrap23">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="wrapBoxInp wid50Prcent">
                          <div className="tstType">Test Type</div>
                          <div className="selectOptionType">
                            <select>
                              <option>Nose Invasion Test</option>
                              <option>demo</option>
                              <option>demo</option>
                              <option>demo</option>
                            </select>
                          </div>
                        </div>
                        <div className="wrapBoxInp">
                          <div className="tstType">Test Location</div>
                          <input type="text" placeholder="Williambsurg Drive-Thru Testing" />
                        </div>
                        <div className="wrapBoxInp wid50Prcent">
                          <div className="tstType">Test Date</div>
                          <input type="date" className="dateBorder" placeholder="Williambsurg Drive-Thru Testing" />
                        </div>
                        <div className="xyz001 wid50Prcent">
                          <div className="xyz001">
                            <div className="xyz002 tstType">Did you test positive?</div>
                            <div className="xyz003">
                              <label className="switch">
                                <input type="checkbox" checked />
                                <span className="slider round"></span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="priPolicy">
                    <a href="/">Privacy Policy</a>
                  </div>
                  <div className="wrapBtn">
                    <button>Edit Test Result</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="conditonRSP">
            <div className="mainWrapper">
              <div className="wrapScreen">
                <div className="screenHead">
                  <div style={{ paddingTop: 10 }}></div>

                  <div className="tabSystem">
                    <div className="tbsxyz-bar tbsxyz-black">
                      <div className="conditionHeading  w-50per">
                        <i className="fa fa-angle-left wBolder" aria-hidden="true"></i>
                        <div className="absoluteTY">
                          <span>Edit Test Result</span>
                        </div>
                      </div>

                      <div id="Results" className="tbsxyz-container city" style={{ display: 'none' }}>
                        <div className="wrkWrap">
                          <div className="resultDiv">
                            <div>Edit Test Result</div>
                            <div>Date Taken: 3/25/20</div>
                            <div>
                              Results: <span className="redClr"></span>Positive
                            </div>
                          </div>
                          <div className="resultDivR">
                            <i className="fa fa-phone" aria-hidden="true"></i>
                            <i className="fa fa-cloud-upload" aria-hidden="true"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="workSpaceArea difWorkSpaceArea divBottomArea mtResPcent">
                  <div className="btnXyx">
                    <div className="xrzt-bar xrzt-black">
                      <div style={{ marginTop: 20 }} id="Overviews" className="xrzt-container city">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="wrapBoxInp">
                              <div className="tstType">Test Type</div>
                              <div className="selectOptionType">
                                <select>
                                  <option>Nose Invasion Test</option>
                                  <option>demo</option>
                                  <option>demo</option>
                                  <option>demo</option>
                                </select>
                              </div>
                            </div>
                            <div className="wrapBoxInp">
                              <div className="tstType">Test Location</div>
                              <div className="selectOptionType">
                                <select>
                                  <option>Williambsurg Drive-Thru Testing</option>
                                  <option>demo</option>
                                  <option>demo</option>
                                  <option>demo</option>
                                </select>
                              </div>
                            </div>
                            <div className="wrapBoxInp">
                              <div className="tstType">Test Date</div>
                              <input
                                className="dateBorder res45Widht"
                                type="date"
                                placeholder="Williambsurg Drive-Thru Testing"
                              />
                            </div>
                            <div className="xyz001">
                              <div className="xyz001">
                                <div className="xyz002 tstType">Did you test positive?</div>
                                <div className="xyz003">
                                  <label className="switch">
                                    <input type="checkbox" checked />
                                    <span className="slider round"></span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="Tests" className="xrzt-container city" style={{ display: 'none' }}>
                        demo
                      </div>
                    </div>
                  </div>
                  <div className="priPolicy">
                    <a href="/">Privacy Policy</a>
                  </div>
                  <div className="wrapBtn">
                    <button>Edit Test Result</button>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 20, cssFloat: 'right', width: '100%' }}></div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default AddTest;
