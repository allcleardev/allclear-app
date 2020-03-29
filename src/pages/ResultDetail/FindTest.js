import React, { Fragment } from 'react';
import states from './ResultDetail.state';


class FindTest extends React.Component {
    state = states
    componentDidMount = () => {

    }

    handleInputChange = (event, name) => {

    }


    render() {
        return (
            <Fragment>
                <div class="mainWrapper">
                    <div class="wrapScreen">
                        <div class="screenHead">
                            <div style={{ paddingTop: 10 }}></div>

                            <div class="tabSystem">
                                <div class="tbsxyz-bar tbsxyz-black">
                                    <div class="xyzButton">
                                        <div class="xyzBtns">
                                            <button class="tbsxyz-bar-item tbsxyz-button btnActive" onclick="openCity('Tests')">Find Tests</button>
                                            <button class="tbsxyz-bar-item tbsxyz-button dvBtnz" onclick="openCity('Results')">Test Results</button>
                                        </div>
                                    </div>
                                    <div class="arrow difArrow"><i class="fa fa-angle-left" aria-hidden="true"></i></div>
                                    <div id="Tests" class="tbsxyz-container city">
                                        <h3 class="mt_zero">Williamsburg Drive-Thru Testing </h3>
                                        <p class="mt_zero1">8383 Marcy Ave, Brooklyn, NY 11211</p>
                                        <p class="mt_zero1">(737) 002-0379</p>
                                        <p class="mt_zero11">Open <span>9am - 5pm</span> <span>Walk-Up</span></p>
                                        <p class="mt_zero12">
                                            <span>Website</span>  <span>Directions</span> <span><i class="fa fa-phone" aria-hidden="true"></i></span> <span><i class="fa fa-cloud-upload" aria-hidden="true"></i></span>
                                        </p>
                                    </div>

                                    <div id="Results" class="tbsxyz-container city" style={{ display: 'none' }}>
                                        <div class="wrkWrap">
                                            <div class="resultDiv">
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
                        <div class="workSpaceArea difWorkSpaceArea">
                            <div class="btnXyx">
                                <div class="xrzt-bar xrzt-black">
                                    <div class="rusltxyx">
                                        <a class="xrzt-bar-item xrzt-button rtvActive" onclick="openCity('Overviews')">Overviews</a>
                                        <a class="xrzt-bar-item xrzt-button " onclick="openCity('Tests')">Tests</a>
                                    </div>

                                    <div  style={{ marginTop: 20 }}  id="Overviews" class="xrzt-container city">
                                        <div>
                                            <div><strong>Location Type:</strong> Hospital</div>
                                            <div><strong>Appointments:</strong> No</div>
                                            <div><strong>Drive-Thru:</strong> Yes</div>
                                        </div>

                                        <div class="listStyle">
                                            <h4>Screening Requirements</h4>
                                            <ul>
                                                <li>Must be 65+ in age</li>
                                                <li>Must have Fevver, Cough, and/or Shortness of Breath</li>
                                                <li>Must be immunocompromised</li>
                                            </ul>
                                        </div>

                                        <div  style={{ marginTop: 20 }}  class="discripitonXyx">
                                            <div style= {{color: '#b3b3b3' }}>Description</div>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur volutpat orci fusce ipsum. Nibh augue amet, rhoncus nulla ultricies vulputate ornare. Amet dolor volutpat rhoncus, quis sit. Aliquet scelerisque vulputate amet natoque. Pretium neque turpis arcu enim. Posuere auctor velit arcu vestibulum. Tincidunt diam nisi convallis id a aliquam. Mattis euismod tellus penatibus pellentesque parturient sodales nec mattis porta. Lacus amet, egestas turpis sit id quisque pharetra, sit. Tristique sollicitudin sed ipsum sollicitudin. Urna ac enim quis bibendum id orci.
					</div>

                                        <h5>Want to help us improve our data?</h5>
                                    </div>
                                    <div id="Tests" class="xrzt-container city"  style= {{display: 'none' }}>
                                        demo
					</div>
                                </div>
                            </div>
                            <div class="wrapBtn"><button>Leave Feedback</button></div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default FindTest