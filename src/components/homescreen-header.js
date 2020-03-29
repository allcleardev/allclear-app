import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const headerStyle = {
  background: "linear-gradient(to right, #28baff, #1195ff)",
  borderRadius: "100%",
  marginLeft: "-50vw",
  marginRight: "-50vw",
  padding: "70px 0",
  textAlign: "center",
  paddingLeft: "50vw",
  marginTop: "-40px",
  paddingRight: "50vw",
  color: "#FFF",
  lineHeight: "22px",
  fontFamily: "'Source Sans Pro', sans-serif",
  fontSize: "17px"
}


export default function Header(props) {

  return (
    <div className="header" style={headerStyle}>
      <div className="logo-container">
        <img src="logo.png" alt="logo"></img>
      </div>
      {props.children}
    </div>
  );
}