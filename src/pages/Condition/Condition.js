import React, { Fragment } from 'react';
import states from './Condition.state';

class Condition extends React.Component {
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
                            <div style={{ paddingTop: 60 }}></div>
                            <div className="arrow"><i className="fa fa-angle-left" aria-hidden="true"></i></div>
                            <div className="headingTxt">Conditions</div>
                            <div className="subHeading">
                                Some test centers are only seeing patients with certain health conditions
			        	</div>
                        </div>
                        <div className="workSpaceArea">
                            <div className="btnXyx">
                                <h5>Select all that Apply</h5>

                                <div className="wrapBtns">Weakened Immune System</div>
                                <div className="wrapBtns">Cardiovascular or Respiratory Disease</div>
                                <div className="wrapBtns">Kidney Failure or Cirrhosis</div>
                                <div className="wrapBtns">Diabetes</div>
                                <div className="wrapBtns">Pregnancy</div>
                                <div className="wrapBtns">None</div>
                                <div className="wrapBtn"><button>Send</button></div>
                            </div>
                        </div>

                        <div style={{ marginBottom: 20, float: 'left', width: '100%' }}></div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default Condition