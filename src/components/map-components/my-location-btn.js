import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import MyLocationIcon from '@material-ui/icons/MyLocation';

export default class MyLocationBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isHovered: false };
    this.onHover = this.onHover.bind(this);
    this.onClick = props.onClick.bind(this);
  }

  onHover(isEnter) {
    this.setState(() => ({ isHovered: isEnter }));
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
