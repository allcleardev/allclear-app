import React, { Fragment } from 'react';
import states from './Result.state';
import upload from '../../assets/images/uploadicon.png';
class Result extends React.Component {
    state = states

    componentDidMount = () => {

    }

    handleInputChange = (event, name) => {

    }


    render() {
        return (
            <Fragment>
                <div className="mainWrapper">
                    <div className="wrapScreen">
                        <div className="screenHead">
                            <div className={{ paddingTop: 60 }}></div>
                            <div className="arrow"><i className="fa fa-angle-left" aria-hidden="true"></i></div>
                            <div className="headingTxt">Test Results</div>
                            <div className="subHeading">
                                If you've taken a COVID-19 test, please submit your results here. These results are private unless you Choose to share.
			            </div>
                        </div>
                    </div>
                    <div className="workSpaceArea">
                        <div className="inputFeild">
                            <p className="inputHeading">Test Type </p>
                            <input className="inpStyle" placeholder="Select Test" />
                        </div>
                        <div className="inputFeild">
                            <p className="inputHeading">Test Location</p>
                            <input className="inpStyle" placeholder="Choose Location" />
                        </div>
                        <div className="xyz001">
                            <p className="xyz002">Did you test positive?</p>
                            <div className="xyz003">
                                <div className="switch">
                                    <input type="checkbox" defaultChecked={true} />
                                    <span className="slider round"></span>
                                </div>
                            </div>
                        </div>
                        <div className="xyz001">
                            <p className="xyz002"><div>Upload Image</div>
                                <div className="txt-1">Verify your results by uploading an image</div></p>
                            <div className="xyz003">
                                <img src={upload} />
                            </div>
                        </div>
                        <div className="policyBtn"><a href="#">Privacy Policy</a></div>
                        <div className="wrapBtn"><button>Submit Symptoms</button></div>
                        <div className="policyBtn"><a className="skipBtn" href="#">Skip</a></div>
                    </div>

                </div>
            </Fragment>
        )
    }
}
export default Result