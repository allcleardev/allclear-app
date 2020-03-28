import React, { Fragment } from 'react';
import success from '../../assets/images/sucessImg.png';

class Success extends React.Component {

    componentDidMount = () => {

    }

    handleInputChange = (event, name) => {

    }


    render() {
        return (
            <Fragment>
                <div className="mainWrapperS">
                    <div className="wrapScreenS">
                        <div className="screenHeadS">
                            <div style={{ paddingTop: 60 }}></div>
                            <div claclassNamess="arrowS"><i className="fa fa-angle-left" aria-hidden="true"></i></div>
                            <div className="sucessImg001"><img src={success} /></div>
                        </div>
                        <div class="workSpaceAreaS">

                            <div className="sucess008S">
                                <h1>Success!</h1>
                                <p>
                                    Thank you for uploading your results. Share your status and results with others to show that you
                                    care and help stop the spread of COVID-19.
					            </p>
                            </div>
                            <div className="wrapBtnS"><button className="whiteBGS">Submit Symptoms</button></div>
                        </div>



                        <div style={{ marginBottom: 20, float: 'left', width: '100%' }}></div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default Success