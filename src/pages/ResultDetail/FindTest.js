// ********************************************************************* //
//                                                                       //
//           THIS SCREEN IS ABANDONED          //
//                                                                      //
// ******************************************************************** //

import React, { Fragment } from 'react';
// import states from './ResultDetail.state';

class FindTest extends React.Component {
  // state = states;
  componentDidMount = () => {};

  handleInputChange = (event, name) => {};

  render() {
    return (
      <Fragment>
        <div className="mainWrapperft">
          <div className="wrapScreenft">
            <div className="screenHeadft">
              <div style={{ paddingTop: 10 }}></div>

              <div className="tabSystem">
                <div className="tbsxyz-bar tbsxyz-black">
                  <div className="xyzButtonft">
                    <div className="xyzBtnsft">
                      <button className="tbsxyz-bar-item tbsxyz-button btnActiveft" onclick="openCity('Tests')">
                        Find Tests
                      </button>
                      <button className="tbsxyz-bar-item tbsxyz-button dvBtnzft" onclick="openCity('Results')">
                        Test Results
                      </button>
                    </div>
                  </div>
                  <div className="arrowft difArrowft">
                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                  </div>
                  <div id="Tests" className="tbsxyz-container city diffHeaderClass">
                    <h3 className="mt_zeroft">Test Type: Alpha Test </h3>
                    <p className="mt_zero1ft">Williamsburg Drive-Thru Testing</p>
                    <p className="mt_zero1ft">Results: Positive</p>
                    <p className="mt_zero1ft">2/26/2020</p>
                  </div>

                  <div id="Results" className="tbsxyz-container city" style={{ display: 'none' }}>
                    <div className="wrkWrap">
                      <div className="resultDivft">
                        <div>Lorem Ipsum Test</div>
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
            <div className="workSpaceAreaft difWorkSpaceAreaft">
              <div className="btnXyx">
                <div className="xrzt-bar xrzt-black">
                  <div className="rusltxyxft">
                    <button className="xrzt-bar-item xrzt-button rtvActiveft" onclick="openCity('Overviews')">
                      Symptoms
                    </button>
                    <button className="xrzt-bar-item xrzt-button " onclick="openCity('Tests')">
                      Attachments
                    </button>
                  </div>

                  <div style={{ marginTop: 20 }} id="Overviews" className="xrzt-container city">
                    <div className="listStyle">
                      <h4>Description:</h4>
                      <p>
                        Hoodie gluten-free health goth, hashtag mum-blecore you probably haven't heard of them fam
                        pour-over cred. Tacos raclette synth vice unicorn franzen, Health goth copper mug hoodie
                        drinking vinegar. Listicle snackwave art pary man braid williamsburg.
                      </p>
                    </div>
                  </div>
                  <div id="Tests" className="xrzt-container city" style={{ display: 'none' }}>
                    demo
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: 20, cssFloat: 'left', width: '100%' }}></div>
        </div>
      </Fragment>
    );
  }
}

export default FindTest;
