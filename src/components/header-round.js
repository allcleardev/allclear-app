import React from 'react';

const headerStyle = {
  background: "linear-gradient(to right, #28baff, #1195ff)",
  borderRadius: "100%",
  marginLeft: "-50vw",
  marginRight: "-50vw",
  padding: "120px 0",
  textAlign: "center",
  paddingLeft: "50vw",
  marginTop: "-40px",
  paddingRight: "50vw",
  color: "#FFF",
  lineHeight: "22px",
  fontFamily: "'Source Sans Pro', sans-serif",
  fontSize: "17px"
}

export default function HeaderRound(props) {
  return (
    <div className="d-flex " style={headerStyle}>
      {props.children}
    </div>
  );
}