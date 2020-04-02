import React, { Fragment } from "react";
import states from "./Symptom.state";
import "./Symptom.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Union.png";

class Symptom extends React.Component {
  state = states;

  componentDidMount = () => {};

  selectAll = () => {
    let { symptoms } = this.state;
    symptoms.filter(symptom => {
      symptom.isActive = true;
    });
    this.setState({ symptoms });
    sessionStorage.setItem("symptoms", JSON.stringify(symptoms));
  };

  handleChange = event => {
    console.log("event", event);
    let { symptoms } = this.state;
    symptoms.filter(symptom => {
      if (symptom.name === event.name) {
        symptom.isActive = !symptom.isActive;
      }
    });
    console.log("symptoms", symptoms);

    this.setState({ symptoms });
    sessionStorage.setItem("symptoms", JSON.stringify(symptoms));
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
                <h2>Symptoms</h2>
                <p>Select all symptoms that you are currently experiencing.</p>
              </div>

              <div className="wrp_btns008 text-center">
                <h6 className="text-left" onclick={() => this.selectAll()}>
                  Select all that apply.
                </h6>
                {this.state.symptoms &&
                  this.state.symptoms.map(res => {
                    return (
                      <li
                        onclick={() => this.handleChange(res)}
                        className={
                          "pure-material-button-contained" +
                          (res.isActive ? " btns008Active" : "")
                        }
                      >
                        {res.name}
                      </li>
                    );
                  })}
              </div>

              <div className="footerBtn">
                <div className="row dispNone">
                  <div className="col-lg-6 text-left">
                    <Link to="/background">
                      <button className="backBtn pure-material-button-contained">
                        Back
                      </button>
                    </Link>
                  </div>
                  <div className="col-lg-6 text-right">
                    <Link to="/symptom">
                      <button className="nextBtn pure-material-button-contained">
                        Next
                      </button>
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
                  <i class="fa fa-angle-left" aria-hidden="true"></i>
                </div>
                <div className="headingTxt">Symptoms</div>
                <div className="subHeading">
                  Select all symptoms that you are currently experiencing.
                </div>
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
                <div class="wrapBtn">
                  <Link to="/result">
                    <button>Next</button>
                  </Link>
                </div>
              </div>

              <div
                style={{ marginBottom: 20, float: "left", width: "100%" }}
              ></div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default Symptom;
