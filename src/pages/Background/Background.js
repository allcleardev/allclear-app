import React, { Fragment } from 'react';
import states from './Background.state';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";


  
class Background extends React.Component {
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
                            <div className="arrow">< i className="fa fa-angle-left" aria-hidden="true"></i></div>
                            <div className="headingTxt">Background</div>
                            <div className="subHeading">
                                Provide information to let us recommand the best test sites.
			        	</div>
                        </div><div className="workSpaceAreaB">
                            <div className="btnXyx">
                                <h3>Location*</h3>
                                <h5>We can give localized test center recommendations with your location</h5>
                                <input className="inpStyles" placeholder="" />
                                <div>

                                </div>
                            </div>
                        </div>
                        <div className="workSpaceAreaB">
                            <div className="btnXyx">
                                <h3>Date of Birth*</h3>
                                <h5>Some test centers have minimum age requirements</h5>
                                <div>
                                    <TextField
                                        id="date"
                                        type="date"
                                        defaultValue="2017-05-24"
                                        style={{width:352}}
                                        // className={this.state.classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="workSpaceAreaB">
                            <div className="btnXyx">
                                <h3>Exposure to COVID-19</h3>
                                <h5>Select all that Apply</h5>

                                <div className="wrapBtns">Live with someone</div>
                                <div className="wrapBtns">Known contact with someone</div>
                                <div className="wrapBtns">Not Sure</div>
                                <div className="wrapBtns">No Contact (Self Quarantine)</div>
                                <div className="wrapBtn"><Link to="/condition"><button>Next</button></Link></div>
                            </div>
                        </div>

                        <div style={{ marginBottom: 20, float: 'left', width: '100%' }}></div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default Background