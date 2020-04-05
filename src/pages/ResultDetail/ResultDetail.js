import React, {Fragment} from 'react';
// import states from './ResultDetail.state';
import logo from '../../assets/images/Union.png';
import setting from '../../assets/images/settingIcon.png';
import sikIcon from '../../assets/images/sikIcon.png';
import cercleIon from '../../assets/images/cercleIon.png';
import shearIcon from '../../assets/images/shearIcon.png';


class ResultDetail extends React.Component {
  // state = states;
  componentDidMount = () => {

  };

  handleInputChange = (event, name) => {

  };


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
                        <img
                          alt='logo'
                          src={logo}/>
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
                    <i className="fa fa-angle-left wBolder" aria-hidden="true"></i><span>Back</span>
                    <div className="absoluteTY"><span>Lorem Ipsum Test</span></div>
                  </div>
                  <div className="boxWrap23">
                    <div className="work1">
                      <img
                        alt='setting'
                        src={setting} className="absoluteVN"/>
                      <li>
                        <img
                          alt='test'
                          className="imgRound03"
                             src="https://images.pexels.com/photos/1586663/pexels-photo-1586663.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
                      </li>
                      <li>
                        <h3>UserName</h3>
                        <div className="subHeads003">Location</div>
                        <div className="subHeads9832">Location</div>
                      </li>
                      <li>
                        <div className="subHeads003">Health</div>
                        <div className="subHeads9832"><img
                          alt='minion'
                          className="miniIon" src={sikIcon}/>Symptomatic</div>
                      </li>
                      <li>
                        <div className="subHeads003">Test Status</div>
                        <div className="subHeads9832"><img
                          alt='test'
                          className="miniIon" src={cercleIon}/>Untested</div>
                      </li>
                    </div>
                  </div>
                  <div className="headingCenter">
                    <h4>Test Details</h4><img
                    alt='test details'
                    className="miniIon" src={shearIcon}/>
                  </div>
                  <div className="boxWrap23">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="wrapBoxInp">
                          <div className="tstType">Test Type</div>
                          <input type="text" placeholder="Nose Invasion Test"/>
                        </div>
                        <div className="wrapBoxInp">
                          <div className="tstType">Symptoms</div>
                          <input type="text" placeholder="Cough, Fever, Runny Nose"/>
                        </div>
                        <div className="xyz001">
                          <div className="xyz002 tstType">Image Uploaded?</div>
                          <div className="xyz003">
                            <div className="imgUlo003"><span>Upload Image</span></div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="wrapBoxInp">
                          <div className="tstType">Test Location</div>
                          <input type="text" placeholder="Choose Location"/>
                        </div>
                        <div className="xyz001">
                          <div className="xyz002 tstType">Did you test positive?</div>
                          <div className="xyz003">
                            <div class="switch">
                              <input type="checkbox" checked/>
                              <span class="slider round"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="priPolicy">
                    <a href="/">Privacy Policy</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="conditonRSP">
            <div className="mainWrapper">
              <div className="wrapScreen">
                <div className="screenHead">
                  <div style={{paddingTop: 10 + 'px'}}></div>

                  <div className="tabSystem">
                    <div className="tbsxyz-bar tbsxyz-black">
                      <div className="xyzButton">
                        <div className="xyzBtns">
                          <button className="tbsxyz-bar-item tbsxyz-button btnActive"
                                  onclick="openCity('Tests')">Find Tests
                          </button>
                          <button className="tbsxyz-bar-item tbsxyz-button dvBtnz"
                                  onclick="openCity('Results')">Test Results
                          </button>
                        </div>
                      </div>
                      <div className="arrow diffAreo"><i className="fa fa-angle-left" aria-hidden="true"></i></div>
                      <div id="Tests" className="tbsxyz-container city">
                        <h3 className="mt_zero">Williamsburg Drive-Thru Testing </h3>
                        <p className="mt_zero1">8383 Marcy Ave, Brooklyn, NY 11211</p>
                        <p className="mt_zero1">(737) 002-0379</p>
                        <p className="mt_zero11">Open <span>9am - 5pm</span> <span>Walk-Up</span></p>
                        <p className="mt_zero12">
                          <span>Website</span> <span>Directions</span> <span><i className="fa fa-phone"
                                                                                aria-hidden="true"></i></span> <span><i
                          className="fa fa-cloud-upload"
                          aria-hidden="true"></i></span>
                        </p>
                      </div>

                      <div id="Results" className="tbsxyz-container city" style={{display: 'none'}}>
                        <div className="wrkWrap">
                          <div className="resultDiv">
                            <div>Lorem Ipsum Test</div>
                            <div>Date Taken: 3/25/20</div>
                            <div>Results: <span class="redClr"></span>Positive</div>
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
                <div className="workSpaceArea difWorkSpaceArea divBottomArea">
                  <div className="btnXyx">
                    <div className="xrzt-bar xrzt-black">
                      <div className="rusltxyx">
                        <button className="xrzt-bar-item xrzt-button rtvActive"
                           onclick="openCity('Overviews')">Overviews</button>
                        <button className="xrzt-bar-item xrzt-button " onclick="openCity('Tests')">Tests</button>
                      </div>

                      <div style={{marginTop: 20 + 'px'}} id="Overviews" className="xrzt-container city">
                        <div>
                          <div><strong>Location Type:</strong> Hospital</div>
                          <div><strong>Appointments:</strong> No</div>
                          <div><strong>Drive-Thru:</strong> Yes</div>
                        </div>

                        <div className="listStyle">
                          <h4>Screening Requirements</h4>
                          <ul>
                            <li>Must be 65+ in age</li>
                            <li>Must have Fevver, Cough, and/or Shortness of Breath</li>
                            <li>Must be immunocompromised</li>
                          </ul>
                        </div>

                        <div style={{marginTop: 20 + 'px'}} className="discripitonXyx">
                          <div style={{color: '#b3b3b3'}}>Description</div>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur volutpat orci
                          fusce ipsum. Nibh augue amet, rhoncus nulla ultricies vulputate ornare. Amet
                          dolor volutpat rhoncus, quis sit. Aliquet scelerisque vulputate amet natoque.
                          Pretium neque turpis arcu enim. Posuere auctor velit arcu vestibulum. Tincidunt
                          diam nisi convallis id a aliquam. Mattis euismod tellus penatibus pellentesque
                          parturient sodales nec mattis porta. Lacus amet, egestas turpis sit id quisque
                          pharetra, sit. Tristique sollicitudin sed ipsum sollicitudin. Urna ac enim quis
                          bibendum id orci.
                        </div>

                        <h5>Want to help us improve our data?</h5>
                      </div>
                      <div id="Tests" className="xrzt-container city" style={{display: 'none'}}>
                        demo
                      </div>
                    </div>
                  </div>
                  <div className="wrapBtn">
                    <button>Leave Feedback</button>
                  </div>
                </div>
              </div>

              <div style={{marginBottom: 20 + 'px', float: 'left', width: 100 + '%'}}></div>
            </div>
          </div>

        </div>
      </Fragment>
    )
  }
}

export default ResultDetail
