import React, { useState } from "react";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Container";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Grid } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";

import Header from "../components/headerWhite";
import TestResultCard from "../components/cardTestResults";
import NavBottom from "../components/navBottom";
import FabBlueBottom from "../components/fabBlueBottom";
import SearchGoogleMapInput from "../components/searchGoogleMapInput";

import MapComponent from "../components/map";


import SampleMap from "../assets/images/dallas-map.png";

import { mapLocationData } from "../constants";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function CardMapLocation({
  index,
  title,
  description,
  status,
  service_time,
  commute
}) {
  const classes = useStyles();

  return (
    <div className="card-map-location">
      <Box className="container-location">
        <div className="card-content">
          <h3 className="card-title" style={{ color: "#000" }}>
            <span className="grey" style={{}}>
              {index + 1}.
            </span>{" "}
            {title}
          </h3>
          <div
            style={{ display: "flex", flexDirection: "row", fontSize: "13px" }}
            className="grey"
          >
            <p style={{ color: status === "Open" ? "#22AF3A" : "red" }}>
              {status}
            </p>
            <p style={{ padding: "0 30px" }}>{service_time}</p>
            <p style={{ padding: "0 30px" }}>{commute}</p>
          </div>
          <p className="card-description" style={{ color: "#151522" }}>
            {description}
          </p>
          <div className="buttons" style={{ marginTop: "15px" }}>
            <a href={'https://www.google.com/maps/dir/?api=1&destination=' + description} target="_blank"><Button className="btn primary-back white">Directions</Button></a>
            <Button
              className="btn primary-color primary-outline"
              style={{ marginLeft: "15px" }}
            >
              Call
            </Button>
          </div>
        </div>
        <div className="btn-arrow">
          <IconButton>
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 8.59961H15M15 8.59961L8 1.59961M15 8.59961L8 15.5996"
                stroke="#007AFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </IconButton>
        </div>
      </Box>
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  button: {
    width: "100%",
    margin: "15px 0",
    borderRadius: "10px",
    height: 48
  }
}));



export default function CompleteProfile() {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const [secondValue, setSecondValue] = React.useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleSecondChange = (e, newValue) => {
    setSecondValue(newValue);
  };

  const [currTab, setTabValue] = useState(1);


  

  return (
    <div className="test-map-page">
      <Header>
        <div className="test-tabs-wrapper map-tab">
          <AppBar position="static" className="test-tabs">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Find Tests and Test Results"
            >
              <Tab
                label="Find Tests"
                {...a11yProps(0)}
                style={{ width: "50%" }}
              />
              <Tab
                label="Test Results"
                {...a11yProps(1)}
                style={{ width: "50%" }}
              />
            </Tabs>
          </AppBar>
        </div>
      </Header>
      <TabPanel value={value} index={0}>
        <div className="map-fullscreen">
          <MapComponent changeTab={{otherTabIdx: 0, changeTabFn: setTabValue}} />

        </div>
        <div className="nav-left-location">
          <Box>
            <SearchGoogleMapInput
              style={{ marginTop: "50px" }}
            ></SearchGoogleMapInput>
            <div style={{ margin: "40px 0" }} className="search-map-filter">
              <h3
                className="body-title"
                style={{ margin: "5px 0", fontSize: "16px" }}
              >
                Filters
              </h3>
              <p className="grey" style={{ fontSize: "16px" }}>
                Filters would go there.
              </p>
            </div>
          </Box>
          <Divider className={classes.divider} orientation="horizontal" />
          {mapLocationData.map((result, index) => (
            <CardMapLocation
              index={index}
              title={result.Name}
              description={result.Address}
              status={result.status}
              service_time={result.Hours}
              commute={result['Drive Through']}
            ></CardMapLocation>
          ))}
        </div>
        <IconButton aria-label="delete" size="small" className="btn-hide-nav">
          <svg
            width="89"
            height="87"
            viewBox="0 0 89 87"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d)">
              <path
                d="M12.6566 12.7188H42.9841C58.4481 12.7188 70.9841 25.2548 70.9841 40.7188C70.9841 56.1827 58.4481 68.7188 42.9841 68.7188H12.6566V12.7188Z"
                fill="#F1F1F2"
              />
            </g>
            <path
              d="M48.8204 40.7188H34.8204M34.8204 40.7188L41.8204 47.7188M34.8204 40.7188L41.8204 33.7188"
              stroke="#333333"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <defs>
              <filter
                id="filter0_d"
                x="0.656616"
                y="0.71875"
                width="88.3275"
                height="86"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dx="3" dy="3" />
                <feGaussianBlur stdDeviation="7.5" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </IconButton>
        <NavBottom></NavBottom>
        <FabBlueBottom class_name="btn-blue-bottom">
          <svg
            width="24"
            height="21"
            viewBox="0 0 24 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.99841 19.6816V12.6816M3.99841 8.68164V1.68164M11.9984 19.6816V10.6816M11.9984 6.68164V1.68164M19.9984 19.6816V14.6816M19.9984 10.6816V1.68164M0.998413 12.6816H6.99841M8.99841 6.68164H14.9984M16.9984 14.6816H22.9984"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </FabBlueBottom>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FabBlueBottom
          style={{
            position: "fixed",
            bottom: 70,
            right: 20
          }}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.5 1.12891V15.1289M1.5 8.12891H15.5"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </FabBlueBottom>
        <NavBottom></NavBottom>
      </TabPanel>
    </div>
  );
}
