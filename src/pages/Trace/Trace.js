import React from 'react';
import NavBottom from '../../components/navBottom';

class Trace extends React.Component {


    componentDidMount() {
    }


    render() {
        return (
            <div className="phone-verifying">
                <div class="mobile-content" style={{ padding: '25px 25px 0px 25px' }}>
                    <span class="MuiButtonBase-root MuiFab-root btn-back-fab MuiFab-sizeSmall"
                     tabindex="0" aria-disabled="false" aria-label="add" elevation="0" >
                        <span class="MuiFab-label">
                            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.59375 13.1428L1.59375 7.14282L7.59375 1.14282" stroke="white" stroke-width="2"
                                 stroke-linecap="round" stroke-linejoin="round">
                                </path>
                            </svg>
                        </span>
                    </span>
                </div>

                <div className="flex-container flex-just-center flex-direction-col" style={{ height: '75vh', width: '100vw' }}>
                    <div className="fontsize-34 fontweight-600 color-white aligncenter">Trace with us,</div>
                    <p className="fontsize-34 fontweight-600 color-white aligncenter">Beat the virus.</p>
                    <p className="fontweight-600 color-white aligncenter" style={{ fontSize: 17, lineHeight: '20px' }}>Comming Soon</p>
                    <p className="color-white aligncenter" style={{ fontSize: '15px', padding: '0px 10px 0px 10px' }}>
                        Participate in community-driven contact tracing to beat COVID-19.
                    </p>
                </div>
                <NavBottom active={2}></NavBottom>
            </div>
        );
    }
}
export default Trace;
