import React, {Fragment} from 'react';
import states from './ResultDetail.state';

class FindTest extends React.Component {
  state = states;
  componentDidMount = () => {

  };

  handleInputChange = (event, name) => {

  };

  render() {
    return (
      <Fragment>
        <div class="mainWrapperft">
          <div class="wrapScreenft">
            <div class="screenHeadft">
              <div style={{paddingTop: 10}}></div>

              <div class="tabSystem">
                <div class="tbsxyz-bar tbsxyz-black">
                  <div class="xyzButtonft">
                    <div class="xyzBtnsft">
                      <button class="tbsxyz-bar-item tbsxyz-button btnActiveft"
                              onclick="openCity('Tests')">Find Tests
                      </button>
                      <button class="tbsxyz-bar-item tbsxyz-button dvBtnzft"
                              onclick="openCity('Results')">Test Results
                      </button>
                    </div>
                  </div>
                  <div class="arrowft difArrowft"><i class="fa fa-angle-left" aria-hidden="true"></i></div>
                  <div id="Tests" class="tbsxyz-container city diffHeaderClass">
                    <h3 class="mt_zeroft">Test Type: Alpha Test </h3>
                    <p class="mt_zero1ft">Williamsburg Drive-Thru Testing</p>
                    <p class="mt_zero1ft">Results: Positive</p>
                    <p class="mt_zero1ft">2/26/2020</p>

                  </div>

                  <div id="Results" class="tbsxyz-container city" style={{display: 'none'}}>
                    <div class="wrkWrap">
                      <div class="resultDivft">
                        <div>Lorem Ipsum Test</div>
                        <div>Date Taken: 3/25/20</div>
                        <div>Results: <span class="redClr"></span>Positive</div>
                      </div>
                      <div class="resultDivR">
                        <i class="fa fa-phone" aria-hidden="true"></i>
                        <i class="fa fa-cloud-upload" aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
            <div class="workSpaceAreaft difWorkSpaceAreaft">
              <div class="btnXyx">
                <div class="xrzt-bar xrzt-black">
                  <div class="rusltxyxft">
                    <a
                      href="javascript:void(0);"
                      class="xrzt-bar-item xrzt-button rtvActiveft"
                      onclick="openCity('Overviews')">Symptoms</a>
                    <a
                      href="javascript:void(0);"
                      class="xrzt-bar-item xrzt-button " onclick="openCity('Tests')">Attachments</a>
                  </div>

                  <div style={{marginTop: 20}} id="Overviews" class="xrzt-container city">

                    <div class="listStyle">
                      <h4>Description:</h4>
                      <p>Hoodie gluten-free health goth, hashtag mum-blecore you probably haven't heard of them fam
                        pour-over cred. Tacos raclette synth vice unicorn franzen, Health goth copper mug hoodie
                        drinking vinegar. Listicle snackwave art pary man braid williamsburg.</p>
                    </div>


                  </div>
                  <div id="Tests" class="xrzt-container city" style={{display: 'none'}}>
                    demo
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div style={{marginBottom: 20, float: 'left', width: '100%'}}></div>
        </div>
      </Fragment>
    )
  }
}

export default FindTest
