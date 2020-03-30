import React from "react";

import Logo from "../assets/images/logo.svg";

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
};

const logoStyle = {
  width: 45,
  height: "auto"
};

export default function Header(props) {
  return (
    <div className="header" style={headerStyle}>
      <div className="logo-container">
        <img src={Logo} alt="logo" style={logoStyle} />
      </div>
      {props.children}
    </div>
  );
}
