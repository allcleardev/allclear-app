import React from "react";

import { IconButton } from "@material-ui/core";

const headerStyle = {
  display: "flex",
  flexDirection: "column",
  background: "linear-gradient(to right, #36d1bc, #1195ff)",
  borderRadius: "100%",
  marginLeft: "-50vw",
  marginRight: "-50vw",
  padding: "120px 0",
  paddingBottom: "50px",
  textAlign: "center",
  paddingLeft: "50vw",
  marginTop: "-40px",
  paddingRight: "50vw",
  color: "#FFF",
  lineHeight: "22px",
  fontFamily: "'Source Sans Pro', sans-serif",
  fontSize: "17px"
};

export default function Header(props) {
  return (
    <div className="header" style={headerStyle}>
      <IconButton
        style={{
          marginTop: "-25px",
          justifyContent: "flex-start",
          display: "block"
        }}
      >
        <svg
          width="9"
          height="15"
          viewBox="0 0 9 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.59375 13.1428L1.59375 7.14282L7.59375 1.14282"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </IconButton>
      {props.children}
    </div>
  );
}
