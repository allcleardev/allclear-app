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

class Condition extends React.Component {
    state = states

    handleSymtomsChange = (event, newValue) => {
        if (!newValue) return;
        // setValue(newValue);
    };

    handleChange = (event, newValue) => {
        if (!newValue) return;
        // setSymptomsValue(newValue);
    };

    render() {
        return (
            <Fragment>
                <div className="background-responsive">
                    <Box className="condition-new">
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
                                className="toggleButtonGroup"
                            >
                                <ToggleButton
                                    value="weakend"
                                    
                                    aria-label="wantTest"
                                    className="toggleButton"
                                >
                                    Weakend Immune System
                                 </ToggleButton>
                                <ToggleButton
                                    value="cardiovascular"
                                    aria-label="tested"
                                    className="toggleButton"
                                    
                                >
                                    Respiratory Diseases
                                </ToggleButton>
                                <ToggleButton
                                    value="kidneyFailure"
                                    aria-label="neither"
                                    
                                    className="toggleButton"
                                >
                                    Kidney Failure or Cirrhosis
                             </ToggleButton>
                            </ToggleButtonGroup>
                            <ToggleButtonGroup
                                value={this.state.condition}
                                formatting
                                onChange={() => this.state.handleSymtomsChange}
                                aria-label="Testing"
                                className="toggleButtonGroup"
                            >
                                <ToggleButton
                                    value="diabetes"
                                    aria-label="wantTest"
                                    className="toggleButton"
                                    
                                >
                                    Diabetes
                                 </ToggleButton>
                                <ToggleButton
                                    value="pregnancy"
                                    aria-label="tested"
                                    className="toggleButton"
                                    
                                >
                                    Pregnancy
                                </ToggleButton>
                                <ToggleButton
                                    value="none"
                                    aria-label="neither"
                                    
                                    className="toggleButton"
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
                                            className="button btn-responsive font-weight-600"
                                        >
                                            Next
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </div>
                        <ProgressBottom progress="0"></ProgressBottom>
                    </Box>
                </div>
            </Fragment>
        )



    }
    //   return (

    //   );
}
export default Condition
