import React, { Fragment } from 'react';
// import states from './Symptom.state';
// import './Symptom.module.css';
import { Link } from "react-router-dom";
import logo from '../../assets/images/Union.png';

class TestResult extends React.Component {
    // state = states

    componentDidMount = () => {

    }

    handleInputChange = (event, name) => {

    }

    render() {
        return (
            <Fragment>
                <div class="diffBGwrapper">
                    <div class="divClassBG">
                        <div class="WrapCondition">
                            <div class="wrapInnerPart">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-lg-6 text-left">
                                            <div class="conditionLeft">
                                                <img src={logo} />
                                            </div>
                                        </div>
                                        <div class="col-lg-6 text-right">
                                            <div class="conditionRight">
                                                <li>Home</li>
                                                <li>Test</li>
                                                <li>Tracing</li>
                                                <li>Friends</li>
                                                <li>Profile</li>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="conditionHeading text-center w-50per">
                                        <div class="xyzButton widthCustm">
                                            <div class="xyzBtns">
                                                <button class="tbsxyz-bar-item tbsxyz-button dvBtnz"
                                                    onclick="openCity('Tests')">Find Tests</button>
                                                <button class="tbsxyz-bar-item tbsxyz-button btnActive "
                                                    onclick="openCity('Results')">Test Results</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="boxWrap23 testShown mBottm">
                                        <div class="work1">
                                            <div class="ShownLeft">
                                                <div class="testShownList">
                                                    <h3>Lorem Ipsum Test Name </h3>
                                                    <div class="subHeads003">Date Taken: 3/25/20</div>
                                                    <div class="subHeads9832">Results: <span class="sIn"></span> Positive</div>
                                                </div>
                                            </div>
                                            <div class="ShownRight">
                                                <div class="testShownBtn">
                                                    <i class="fa fa-pencil" style={{ fontSize: 20 }}></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="boxWrap23 testShown mTopz">
                                        <div class="work1">
                                            <div class="ShownLeft">
                                                <div class="testShownList">
                                                    <h3>Lorem Ipsum Test Name </h3>
                                                    <div class="subHeads003">Date Taken: 3/25/20</div>
                                                    <div class="subHeads9832">Results: <span class="sIn"></span> Positive</div>
                                                </div>
                                            </div>
                                            <div class="ShownRight">
                                                <div class="testShownBtn">
                                                    <i class="fa fa-pencil" style={{ fontSize: 20 }}></i>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="priPolicy">
                                        <div class="wrapBtn">
                                            <button class="pure-material-button-contained addTestBn">Add Test</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="conditonRSP">
                        <div class="mainWrapper">
                            <div class="wrapScreen">
                                <div class="screenHead">
                                    <div class="conditionHeading text-center w-50per resMtZeo">
                                        <div class="xyzButton widthCustm">
                                            <div class="xyzBtns">
                                                <button class="tbsxyz-bar-item tbsxyz-button dvBtnz"
                                                    onclick="openCity('Tests')">Find Tests</button>
                                                <button class="tbsxyz-bar-item tbsxyz-button  btnActive"
                                                    onclick="openCity('Results')">Test Results</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="workSpaceArea difWorkSpaceArea divBottomArea resTstZero">
                                    <div class="btnXyx">
                                        <div class="xrzt-bar xrzt-black">
                                            <div class="boxWrap23 testShown mBottm">
                                                <div class="work1">
                                                    <div class="ShownLeft">
                                                        <div class="testShownList">
                                                            <h3>Lorem Ipsum Test Name </h3>
                                                            <div class="subHeads003">Date Taken: 3/25/20</div>
                                                            <div class="subHeads9832">Results: <span class="sIn"></span> Positive
												</div>
                                                        </div>
                                                    </div>
                                                    <div class="ShownRight">
                                                        <div class="testShownBtn">
                                                            <i class="fa fa-pencil" style={{ fontSize: 20 }}></i>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div class="boxWrap23 testShown mTopz">
                                                <div class="work1">
                                                    <div class="ShownLeft">
                                                        <div class="testShownList">
                                                            <h3>Lorem Ipsum Test Name </h3>
                                                            <div class="subHeads003">Date Taken: 3/25/20</div>
                                                            <div class="subHeads9832">Results: <span class="sIn"></span> Positive
												</div>
                                                        </div>
                                                    </div>
                                                    <div class="ShownRight">
                                                        <div class="testShownBtn">
                                                            <i class="fa fa-pencil" style={{ fontSize: 20 }}></i>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="wrapBtn"><button>Leave Feedback</button></div>
                                    </div>
                                </div>
                                <div style={{ marginBottom: 20, float: 'right', width: '100%' }}></div>
                            </div>
                        </div>
                        <div class="plusRight">+</div>
                    </div>
                  
                </div>
            </Fragment>
        )
    }
}
export default TestResult