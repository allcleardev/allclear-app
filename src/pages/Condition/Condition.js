import React, { Fragment } from "react";
import Header from "../../components/header-round";
import ProgressBottom from "../../components/progressBottom";
import states from './Condition.state';
import Box from "@material-ui/core/Container";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import logo from '../../assets/images/Union.png';

class Condition extends React.Component {
    state = states

    componentDidMount = () => {
    }

    handleSymtomsChange = (event, newValue) => {
        if (!newValue) return;
        // setValue(newValue);
    };
   selectAll = () => {
    let { conditions } = this.state;
    conditions.filter((condition) => {
            condition.isActive = true;
    });
    this.setState({ conditions });
   }
    handleChange = (event) => {
        let { conditions } = this.state;
        conditions.filter((condition) => {
            if (condition.name == event.name) {
                condition.isActive = !condition.isActive;
            }
        });
        this.setState({ conditions });
        // setSymptomsValue(newValue);
    };

    render() {
        return (
            <Fragment>
                <div className="WrapCondition">
                    <div className="wrapInnerPart">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 text-left">
                                    <div className="conditionLeft">
                                        <img src={logo} />
                                    </div>
                                </div>
                                <div className="col-lg-6 text-right">
                                    <div className="conditionRight">
                                        <li>About Us</li>
                                        <li>Help</li>
                                    </div>
                                </div>
                            </div>

                            <div className="conditionHeading text-center">
                                <h2>Conditions</h2>
                                <p>Some test centers are only seeing patients with certain health conditions.</p>
                            </div>

                            <div className="wrp_btns008 text-center">
                                <h6 className="text-left" onClick={() => this.selectAll()}>Select all that apply.</h6>
                                {this.state.conditions && this.state.conditions.map((res) => {
                                    return (
                                        <li onClick={() => this.handleChange(res)} className={"pure-material-button-contained" + (res.isActive ? ' btns008Active' : '')}>{res.name}</li>
                                    )

                                })}
                                {/* <li className="pure-material-button-contained">Weakend Immune System</li>
                                <li className="pure-material-button-contained btns008Active">Cordiovascular or Respiratory Disease</li>
                                <li className="pure-material-button-contained">Kidney Failur or Cirrhosis</li>
                                <li className="pure-material-button-contained">Diabetes</li>
                                <li className="pure-material-button-contained btns008Active">Pregnancy</li>
                                <li className="pure-material-button-contained">None</li> */}
                            </div>

                            <div className="footerBtn">
                                <div className="row dispNone">
                                    <div className="col-lg-6 text-left">
                                        <button className="backBtn pure-material-button-contained">Back</button>
                                    </div>
                                    <div className="col-lg-6 text-right">
                                        <button className="nextBtn pure-material-button-contained">Next</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                <div className="conditonRSP">
                    <div className="mainWrapper">
                        <div className="wrapScreen">
                            <div className="screenHead">
                                <div style={{ paddingTop: 60 }} ></div>
                                <div className="arrow"><i className="fa fa-angle-left" aria-hidden="true"></i></div>
                                <div className="headingTxt">Conditions</div>
                                <div className="subHeading">
                                    Some test centers are only seeing patients with certain health conditions
					</div>
                            </div>
                            <div className="workSpaceArea">
                                <div className="btnXyx">
                                    <h5 onClick={() => this.selectAll()}>Select all that Apply</h5>
                                    {this.state.conditions && this.state.conditions.map((res) => {
                                    return (
                                        <div className={"wrapBtns" + (res.isActive ? ' btns008Active' : '')}  onClick={() => this.handleChange(res)}>{res.name}</div>
                                    )

                                })}

                                    {/* <div className="wrapBtns">Weakened Immune System</div>
                                    <div className="wrapBtns">Cardiovascular or Respiratory Disease</div>
                                    <div className="wrapBtns">Kidney Failure or Cirrhosis</div>
                                    <div className="wrapBtns">Diabetes</div>
                                    <div className="wrapBtns">Pregnancy</div>
                                    <div className="wrapBtns">None</div> */}
                                    <div className="wrapBtn">
                                        <button className="pure-material-button-contained">Send</button></div>
                                </div>

                            </div>
                            <ProgressBottom progress="0"></ProgressBottom>
                            <div style={{ marginBottom: 20, float: 'right', width: '100%' }} ></div>
                        </div>


                    </div>
                </div>
            </Fragment>
        )



    }
    //   return (

    //   );
}
export default Condition


{/* <div classNameName="background-responsive">
<Box classNameName="condition-new">
    <Header>
        <h1>Conditions</h1>
        <p>
            Some test centers are only seeing patients with certain health conditions.
           </p>
    </Header>


    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', alignContent: 'space-between' }}>
        <h4>COVID-19 TESTING</h4>


        <ToggleButtonGroup
            value={this.state.condition}
            formatting
            onChange={() => this.state.handleSymtomsChange}
            aria-label="Testing"    
            classNameName="toggleButtonGroup"
        >
            <ToggleButton
                value="weakend"
                
                aria-label="wantTest"
                classNameName="toggleButton"
            >
                Weakend Immune System
             </ToggleButton>
            <ToggleButton
                value="cardiovascular"
                aria-label="tested"
                classNameName="toggleButton"
                
            >
                Respiratory Diseases
            </ToggleButton>
            <ToggleButton
                value="kidneyFailure"
                aria-label="neither"
                
                classNameName="toggleButton"
            >
                Kidney Failure or Cirrhosis
         </ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
            value={this.state.condition}
            formatting
            onChange={() => this.state.handleSymtomsChange}
            aria-label="Testing"
            classNameName="toggleButtonGroup"
        >
            <ToggleButton
                value="diabetes"
                aria-label="wantTest"
                classNameName="toggleButton"
                
            >
                Diabetes
             </ToggleButton>
            <ToggleButton
                value="pregnancy"
                aria-label="tested"
                classNameName="toggleButton"
                
            >
                Pregnancy
            </ToggleButton>
            <ToggleButton
                value="none"
                aria-label="neither"
                
                classNameName="toggleButton"
            >
                None
         </ToggleButton>
        </ToggleButtonGroup>
        <Grid container justify="center">
            <Grid item xs={12} sm={4}>
                <Link to="/phone-verify">
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth="true"
                        classNameName="button btn-responsive font-weight-600"
                    >
                        Next
                    </Button>
                </Link>
            </Grid>
        </Grid>
    </div>
    <ProgressBottom progress="0"></ProgressBottom>
</Box>
</div> */}
