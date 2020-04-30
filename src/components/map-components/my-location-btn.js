import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import { bindAll } from 'lodash';
import { AppContext } from '@contexts/app.context';

export default class MyLocationBtn extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    bindAll(this, ['onHover', 'onClick']);
    this.state = { isHovered: false };
  }

  onHover(isEnter) {
    this.setState(() => ({ isHovered: isEnter }));
  }

  onClick() {
    this.props.onClick();
  }

  render() {
    return (
      <Tooltip title="Go to Profile Location" placement="left">
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '40px',
            height: '40px',
            padding: '8px',
            bottom: 110,
            right: 10,
            background: 'white',
            borderRadius: '2px',
            cursor: 'pointer',
          }}
          onMouseEnter={() => this.onHover(true)}
          onMouseLeave={() => this.onHover(false)}
          onClick={() => this.onClick()}
        >
          <MyLocationIcon style={{ color: this.state.isHovered ? 'black' : '#666666' }} />
        </div>
      </Tooltip>
    );
  }
}
