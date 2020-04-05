import React, { Fragment } from 'react';
import states from './Symptom.state';
import './Symptom.module.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/Union.png';
import Axios from 'axios';

class Symptom extends React.Component {
  state = states;

  componentDidMount = () => {
    this.getSymptoms();
  };

  getSymptoms = () => {
    this.setState({ loading: true });

    Axios.get('https://api-dev.allclear.app/types/symptoms', {})
      .then((response) => {
        console.log(response);

        this.setState({ symptoms: response.data });
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  selectAll = () => {
    let { symptoms } = this.state;
    symptoms.filter((symptom) => {
      symptom.isActive = true;
    });
    this.setState({ symptoms });
    sessionStorage.setItem('symptoms', JSON.stringify(symptoms));
  };

  handleChange = (event) => {
    let { symptoms } = this.state;
    symptoms.filter((symptom) => {
      if (symptom.name === event.name) {
        symptom.isActive = !symptom.isActive;
      }
    });
    this.setState({ symptoms });
    sessionStorage.setItem('symptoms', JSON.stringify(symptoms));
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
                    <img alt="logo" src={logo} />
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
                <h2>Symptoms</h2>
                <p>Most test centers are only seeing patients with certain symptoms.</p>
              </div>

              <div className="wrp_btns008 text-center symptomsWrap">
                <h6 className="text-left" onClick={() => this.selectAll()}>
                  Select all that apply.
                </h6>
                {this.state.symptoms &&
                  this.state.symptoms.map((res) => {
                    return (
                      <li
                        onClick={() => this.handleChange(res)}
                        className={'pure-material-button-contained' + (res.isActive ? ' Active' : '')}
                      >
                        {res.name}
                      </li>
                    );
                  })}
              </div>

              <div className="footerBtn">
                <div className="row dispNone">
                  <div className="col-lg-6 text-left">
                    <Link to="/condition">
                      <button className="backBtn pure-material-button-contained">Back</button>
                    </Link>
                  </div>
                  <div className="col-lg-6 text-right">
                    <Link to="/result">
                      <button className="nextBtn pure-material-button-contained">Next</button>
                    </Link>
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
                <div style={{ paddingTop: 60 }}></div>
                <div className="arrow">
                  <i className="fa fa-angle-left" aria-hidden="true"></i>
                </div>
                <div className="headingTxt">Symptoms</div>
                <div className="subHeading" onClick={() => this.selectAll()}>
                  Select all symptoms that you are currently experiencing.
                </div>
              </div>
              <div className="workSpaceArea">
                <div className="btnXyx">
                  <h5 onClick={() => this.selectAll()}>Select all that Apply</h5>
                  {this.state.symptoms &&
                    this.state.symptoms.map((res) => {
                      return (
                        <div
                          onClick={() => this.handleChange(res)}
                          className={'wrapBtns' + (res.isActive ? ' selectBG' : '')}
                        >
                          {res.name}
                        </div>
                      );
                    })}
                  {/* {this.state.symptoms && this.state.symptoms.map((res,index) => {
                                    return (
                                        <div className={ "a" + (index === 0 || index === 3 || index === 6 ? ' wrapBox':'')}>
                                            <div onClick={() => this.handleChange(res)} className={"box1 pure-material-button-contained" + (res.isActive ? ' selectBG' : '')}>{res.name}</div>
                                        </div>
                                    )

                                })} */}
                  <div className="wrapBtn">
                    <button className="pure-material-button-contained">Send</button>
                  </div>
                </div>
              </div>
              {/* <ProgressBottom progress="0"></ProgressBottom> */}
              <div style={{ marginBottom: 20, float: 'right', width: '100%' }}></div>
            </div>
          </div>
        </div>
        {/* <div className="conditonRSP">
                    <div className="mainWrapper">
                        <div className="wrapScreen">
                            <div className="screenHead">
                                <div style={{ paddingTop: 60 }}></div>
                                <div className="arrow"><i className="fa fa-angle-left" aria-hidden="true"></i></div>
                                <div className="headingTxt">Symptoms</div>
                                <div className="subHeading" onClick={() => this.selectAll()}>Select all symptoms that you are currently experiencing.</div>
                            </div>
                            <div className="workSpaceArea">
                            <div class="wrapBox">
									<div class="box1 pure-material-button-contained selectBG">Fever</div>
									<div class="box1 pure-material-button-contained ">Shorness of Breath</div>
									<div class="box1 pure-material-button-contained">Dry Cough</div>
								</div>
								<div class="wrapBox">
									<div class="box1 pure-material-button-contained">Fatigue</div>
									<div class="box1 pure-material-button-contained selectBG">Runny Nose or Nasal Congestion</div>
									<div class="box1 pure-material-button-contained selectBG">Sore Throat</div>
								</div>
								<div class="wrapBox">
									<div class="box1 pure-material-button-contained selectBG">Nausea or Vomiting</div>
									<div class="box1 pure-material-button-contained">Muscle Ache</div>
									<div class="box1 pure-material-button-contained">Diarrhea</div>
								</div>


                                <div className="wrapBtn"><button className="pure-material-button-contained">Submit Symptoms</button></div>
                            </div>
                            <div  ></div>
                        </div>


                    </div>
                </div> */}
      </Fragment>
    );
  }
}
export default Symptom;
