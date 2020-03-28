import React, { Fragment } from 'react';
import states from './Symptom.state';
import './Symptom.module.css';

class Symptom extends React.Component {
    state = states

    componentDidMount = () => {

    }

    handleInputChange = (event, name) => {

    }





    render() {
        return (
            <Fragment>
                <div className="wrapScreen">
                    <div className="screenHead">
                        <div style={{paddingTop:60}}></div>
                        <div className="arrow"><i class="fa fa-angle-left" aria-hidden="true"></i></div>
                        <div className="headingTxt">Symptoms</div>
                        <div className="subHeading">Select all symptoms that you are currently experiencing.</div>
                    </div>
                    <div className="workSpaceArea">
                        <div className="wrapBox">
                            <div className="box1 selectBG">Cough</div>
                            <div className="box1">Symptom</div>
                            <div className="box1">Symptom</div>
                        </div>
                        <div className="wrapBox">
                            <div className="box1">Symptom</div>
                            <div className="box1 selectBG">Fever</div>
                            <div className="box1 selectBG">Runny Nose</div>
                        </div>
                        <div className="wrapBox">
                            <div className="box1 selectBG">Sore Throat</div>
                            <div className="box1">Symptom</div>
                            <div className="box1">Symptom</div>
                        </div>
                        <div class="wrapBtn"><button>Submit Symptoms</button></div>
                    </div>


                    <div style={{marginBottom:20,float:'left',width:'100%'}} ></div>
                </div>


            </Fragment>
        )
    }
}
export default Symptom