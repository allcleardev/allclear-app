import React, { Fragment } from 'react';
import ProgressBottom from '../../components/progressBottom';
import states from './Condition.state';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/Union.png';
import Axios from 'axios';

class Condition extends React.Component {
  state = states;

  constructor() {
    super();
    this.getConditions = this.getConditions.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getConditions();
  };

  getConditions() {
    this.setState({ loading: true });

    Axios.get('https://api-dev.allclear.app/types/conditions', {})
      .then((response) => {
        console.log(response);

        this.setState({ conditions: response.data });
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  selectAll() {
    let { conditions } = this.state;
    conditions.filter((condition) => {
      condition.isActive = true;
    });
    this.setState({ conditions });
    sessionStorage.setItem('conditions', JSON.stringify(conditions));
  };

  handleChange(event){
    let { conditions } = this.state;
    conditions.filter((condition) => {
      if (condition.name === event.name) {
        condition.isActive = !condition.isActive;
      }
    });
    this.setState({ conditions });
    sessionStorage.setItem('conditions', JSON.stringify(conditions));
  };

  render() {
    return (
      <div className="background-responsive">
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
                  <h2>Conditions</h2>
                  <p>Some test centers are only seeing patients with certain health conditions.</p>
                </div>

                <div className="wrp_btns008 text-center">
                  <h6 className="text-left" onClick={() => this.selectAll()}>
                    Select all that apply.
                  </h6>
                  {this.state.conditions &&
                    this.state.conditions.map((res) => {
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
                      <Link to="/background">
                        <button className="backBtn pure-material-button-contained">Back</button>
                      </Link>
                    </div>
                    <div className="col-lg-6 text-right">
                      <Link to="/symptom">
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
                  <div className="headingTxt">Conditions</div>
                  <div className="subHeading">
                    Some test centers are only seeing patients with certain health conditions
                  </div>
                </div>
                <div className="workSpaceArea">
                  <div className="btnXyx">
                    <h5 onClick={() => this.selectAll()}>Select all that Apply</h5>
                    {this.state.conditions &&
                      this.state.conditions.map((res) => {
                        return (
                          <div
                            className={'wrapBtns' + (res.isActive ? ' Active' : '')}
                            onClick={() => this.handleChange(res)}
                          >
                            {res.name}
                          </div>
                        );
                      })}
                    <div className="wrapBtn">
                      <button className="pure-material-button-contained">Send</button>
                    </div>
                  </div>
                </div>
                <ProgressBottom progress="0"></ProgressBottom>
                <div style={{ marginBottom: 20, float: 'right', width: '100%' }}></div>
              </div>
            </div>
          </div>
        </Fragment>
      </div>
    );
  }
}
export default Condition;
