import React from 'react';
import NavBottom from '../../components/navBottom';
class Trace extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className="phone-verifying">
        <div className="flex-container flex-just-center flex-direction-col" style={{ height: '75vh', width: '100vw' }}>
          <div className="fontsize-34 fontweight-600 color-white aligncenter">Trace with us,</div>
          <p className="fontsize-34 fontweight-600 color-white aligncenter">Beat the virus.</p>
          <p className="fontweight-600 color-white aligncenter" style={{ fontSize: 17, lineHeight: '20px' }}>
            Coming Soon
          </p>
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
