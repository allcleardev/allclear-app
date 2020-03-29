import React, { Fragment } from 'react';
import states from './ResultDetail.state';


class ResultDetail extends React.Component {
    state = states
    componentDidMount = () => {

    }

    handleInputChange = (event, name) => {

    }


    render() {
        return (
            <Fragment>
                <div class="mainWrapperRD">
                    <div class="wrapScreenRD">
                        <div class="screenHeadRD">
                            <div style={{ paddingTop: 10 + 'px' }}></div>

                            <div class="tabSystem">
                                <div class="tbsxyz-bar tbsxyz-black">
                                    <div class="xyzButtonRD">
                                        <div class="xyzBtnsRD">
                                            <button class="tbsxyz-bar-item tbsxyz-button btnActiveRD" onclick="openCity('Tests')">Find Tests</button>
                                            <button class="tbsxyz-bar-item tbsxyz-button dvBtnzRD" onclick="openCity('Results')">Test Results</button>
                                        </div>
                                    </div>
                                    <div class="arrowRD difArrowRD"><i class="fa fa-angle-left" aria-hidden="true"></i></div>


                                    <div id="Results" class="tbsxyz-container city" style={{ display: 'none' }}>
                                        <div class="wrkWrapRD">
                                            <div class="resultDivRD">
                                                <div>Lorem Ipsum Test</div>
                                                <div>Date Taken: 3/25/20</div>
                                                <div>Results: <span class="redClrRD"></span>Positive</div>
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
                        <div style={{ marginTop: -40 + 'px' }}></div>
                        <div class="bodyWrapperRD">
                            <div class="btnXyx">
                                <div class="xrzt-bar xrzt-black">
                                    <div>Test Type: Alpha Test</div>
                                    <div>Williamsburg Drive-Thru Testing</div>
                                    <div>Results: Positive</div>
                                    <div>3/26/2020</div>
                                    <i class="fa fa-arrow-right arrowRightRD" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                        <div class="bodyWrapperRD">
                            <div class="btnXyx">
                                <div class="xrzt-bar xrzt-black">
                                    <div>Test Type: Alpha Test</div>
                                    <div>Williamsburg Drive-Thru Testing</div>
                                    <div>Results: Positive</div>
                                    <div>3/22/2020</div>
                                    <i class="fa fa-arrow-right arrowRightRD" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                        <div class="navAreaRD">

                            <i class=" plusRightRD" aria-hidden="true" style={{ fontSize: 38 + 'px' }}>+ </i>
                        </div>


                    </div>

                    <div style={{ marginBottom: 20 + 'px', float: 'left', width: 100 + '%' }}></div>
                </div>
            </Fragment>
        )
    }
}
export default ResultDetail