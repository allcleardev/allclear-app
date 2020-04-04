import React, { Fragment } from 'react';
// import states from './Symptom.state';
// import './Symptom.module.css';
import { Link } from "react-router-dom";
import logo from '../../assets/images/Union.png';

class AddTest extends React.Component {
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

						<div class="conditionHeading  w-50per">
							<i class="fa fa-angle-left wBolder" aria-hidden="true"></i><span>Back</span>
							<div class="absoluteTY"><span>Edit Test Result</span></div>
						</div>



						<div class="boxWrap23">
							<div class="row">
								<div class="col-lg-12">
									<div class="wrapBoxInp wid50Prcent">
										<div class="tstType">Test Type</div>
										<div class="selectOptionType">
											<select>
												<option>Nose Invasion Test</option>
												<option>demo</option>
												<option>demo</option>
												<option>demo</option>
											</select>
										</div>
									</div>
									<div class="wrapBoxInp">
										<div class="tstType">Test Location</div>
										<input type="text" placeholder="Williambsurg Drive-Thru Testing" />
									</div>
									<div class="wrapBoxInp wid50Prcent">
										<div class="tstType">Test Date</div>
										<input type="date" class="dateBorder"
											placeholder="Williambsurg Drive-Thru Testing" />
									</div>
									<div class="xyz001 wid50Prcent">
										<div class="xyz001">
											<div class="xyz002 tstType">Did you test positive?</div>
											<div class="xyz003">
												<label class="switch">
													<input type="checkbox" checked />
													<span class="slider round"></span>
												</label>
											</div>
										</div>
									</div>

								</div>
							</div>

						</div>

						<div class="priPolicy">
							<a href="#">Privacy Policy</a>
						</div>
						<div class="wrapBtn"><button>Edit Test Result</button></div>
					</div>
				</div>
			</div>
		</div>


		<div class="conditonRSP">
			<div class="mainWrapper">
				<div class="wrapScreen">
					<div class="screenHead">
						<div style={{paddingTop:10}} ></div>

						<div class="tabSystem">
							<div class="tbsxyz-bar tbsxyz-black">
								<div class="conditionHeading  w-50per">
									<i class="fa fa-angle-left wBolder" aria-hidden="true"></i>
									<div class="absoluteTY"><span>Edit Test Result</span></div>
								</div>

								<div id="Results" class="tbsxyz-container city" style={{display:'none'}} >
									<div class="wrkWrap">
										<div class="resultDiv">
											<div>Edit Test Result</div>
											<div>Date Taken: 3/25/20</div>
											<div>Results: <span class="redClr"></span>Positive</div>
										</div>
										<div class="resultDivR">
											<i class="fa fa-phone" aria-hidden="true"></i>
											<i class="fa fa-cloud-upload" aria-hidden="true"></i>
										</div>
									</div>
								</div>
							</div>
						</div>



					</div>
					<div class="workSpaceArea difWorkSpaceArea divBottomArea mtResPcent">
						<div class="btnXyx">
							<div class="xrzt-bar xrzt-black">

								<div style={{marginTop:20}}  id="Overviews" class="xrzt-container city">

									<div class="row">
										<div class="col-lg-6">
											<div class="wrapBoxInp">
												<div class="tstType">Test Type</div>
												<div class="selectOptionType">
													<select>
														<option>Nose Invasion Test</option>
														<option>demo</option>
														<option>demo</option>
														<option>demo</option>
													</select>
												</div>
											</div>
											<div class="wrapBoxInp">
												<div class="tstType">Test Location</div>
												<div class="selectOptionType">
													<select>
														<option>Williambsurg Drive-Thru Testing</option>
														<option>demo</option>
														<option>demo</option>
														<option>demo</option>
													</select>
												</div>
											</div>
											<div class="wrapBoxInp">
												<div class="tstType">Test Date</div>
												<input class="dateBorder res45Widht" type="date"
													placeholder="Williambsurg Drive-Thru Testing" />
											</div>
											<div class="xyz001">
												<div class="xyz001">
													<div class="xyz002 tstType">Did you test positive?</div>
													<div class="xyz003">
														<label class="switch">
															<input type="checkbox" checked />
															<span class="slider round"></span>
														</label>
													</div>
												</div>
											</div>

										</div>
									</div>

								</div>
								<div id="Tests" class="xrzt-container city" style={{display:'none'}} >
									demo
								</div>
							</div>
						</div>
						<div class="priPolicy">
							<a href="#">Privacy Policy</a>
						</div>
						<div class="wrapBtn"><button>Edit Test Result</button></div>
					</div>
				</div>

				<div style={{ marginBottom: 20, float: 'right', width: '100%' }}></div>
			</div>
		</div>

	</div>
            </Fragment>
        )
    }
}
export default AddTest