import React from "react";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {Grid} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";

import Header from "../components/homescreen-header";
import TestResultCard from "../components/cardTestResults";
import NavBottom from "../components/navBottom";
import FabBlueBottom from "../components/fabBlueBottom";

import {testResult} from "../constants";

function TabPanel(props) {
  const {children, value, index, ...other} = props;

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

function a12yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
    margin: "15px 0",
    borderRadius: "10px",
    height: 48
  }
}));

export default function CompleteProfile() {
  useStyles();

  const [value, setValue] = React.useState(0);
  const [secondValue, setSecondValue] = React.useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleSecondChange = (e, newValue) => {
    setSecondValue(newValue);
  };

  return (
    <Box className="test">
      <Header>
        <div className="test-tabs-wrapper">
          <AppBar position="static" className="test-tabs">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Find Tests and Test Results"
            >
              <Tab
                label="Find Tests"
                {...a11yProps(0)}
                style={{width: "50%"}}
              />
              <Tab
                label="Test Results"
                {...a11yProps(1)}
                style={{width: "50%"}}
              />
            </Tabs>
          </AppBar>
        </div>
        <TabPanel
          value={value}
          index={0}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            color: "#fff",
            padding: "36px 0",
            lineHeight: "7px"
          }}
          className="header-tabpanel"
        >
          <Fab
            size="small"
            aria-label="add"
            className="hide-desktop"
            style={{background: "transparent", boxShadow: "none"}}
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Fab>
          <Button
            startIcon={<ArrowBackIosIcon/>}
            style={{color: "#fff"}}
            className="hide-mobile"
          >
            Back
          </Button>
          <h2 className="body-title">Williamsburg Drive-Thru Testing</h2>
          <div style={{lineHeight: "12px", textAlign: "left"}}>
            <p className="white" style={{fontSize: "16px"}}>
              8383 Marcy Ave, Brooklyn, NY 11211
            </p>
            <p className="white" style={{fontSize: "16px"}}>
              (737) 002-0379
            </p>
          </div>
          <div style={{display: "flex", flexDirection: "row"}}>
            <p>
              <strong>Open</strong>
            </p>
            <p style={{padding: "0 30px"}}>9am - 5pm</p>
            <p style={{padding: "0 30px"}}>Walk-Up</p>
          </div>
          <div style={{paddingTop: "15px"}}>
            <Button className="btn-gradient white">Website</Button>
            <Button className="btn-gradient white">Directions</Button>
            <Button className="btn-gradient white">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.18695 5.80956C0.351636 4.3358 0.0332031 3.1477 0.0332031 2.34522C0.0332031 1.54273 0.235805 1.31257 0.44139 1.12663C0.646976 0.940693 1.57402 0.384483 1.73198 0.280752C1.88993 0.177021 2.49279 -0.0245694 2.87085 0.504677C3.24891 1.03392 3.96084 2.09654 4.45168 2.80245C5.22189 3.80232 4.60828 4.24125 4.41008 4.50433C4.04536 4.98843 3.83536 5.10783 3.83536 5.70226C3.83536 6.29669 5.54246 7.98549 5.95065 8.40159C6.35573 8.81453 8.0567 10.2656 8.58378 10.3432C9.11456 10.4214 9.82513 9.87452 9.9762 9.73585C10.7447 9.16165 11.1786 9.59698 11.5326 9.78621C11.8866 9.97543 13.486 10.9453 13.9817 11.2723C14.4482 11.5992 14.419 12.1045 14.419 12.1045C14.419 12.1045 13.4569 13.5906 13.3403 13.7689C13.1945 13.9769 12.8446 14.1553 12.0574 14.1553C11.2702 14.1553 10.4291 14.0154 8.43013 12.9455C6.79453 12.0702 5.23535 10.6994 4.41898 9.89692C3.57345 9.09443 2.14112 7.49301 1.18695 5.80956Z"
                  fill="white"
                />
              </svg>
            </Button>
            <Button className="btn-gradient white">
              <svg
                width="12"
                height="16"
                viewBox="0 0 12 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.859863 8.15513V13.298C0.859863 13.639 0.995322 13.966 1.23644 14.2071C1.47756 14.4482 1.80458 14.5837 2.14558 14.5837H9.85986C10.2009 14.5837 10.5279 14.4482 10.769 14.2071C11.0101 13.966 11.1456 13.639 11.1456 13.298V8.15513M8.57415 4.29799L6.00272 1.72656M6.00272 1.72656L3.43129 4.29799M6.00272 1.72656V10.0837"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Button>
          </div>
        </TabPanel>
      </Header>
      <TabPanel value={value} index={0}>
        <div className="tab-overview-tests">
          <AppBar position="static" className="tab-header-overview-tests">
            <Tabs
              value={secondValue}
              onChange={handleSecondChange}
              aria-label="Overview and Tests"
            >
              <Tab label="Overview" {...a12yProps(0)} />
              <Tab label="Tests" {...a12yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel
            value={secondValue}
            index={0}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              padding: "12px",
              flexDirection: "column",
              color: "#5C5C5C"
            }}
          >
            <div></div>
            <p>
              <strong>Location Type: </strong> Hospital
            </p>
            <p>
              <strong>Appoinments: </strong> No
            </p>
            <p>
              <strong>Drive-Thru: </strong> Yes
            </p>
            <h3 className="body-title black">Screening Requirements</h3>
            <div>
              <p className="list">Must be 65+ in age</p>
              <p className="list">
                Must have Fever, Cough, and/or <br/>
                Shortness of Breath
              </p>
              <p className="list">Must be immunocompromised</p>
            </div>
            <p
              className="grey"
              style={{marginBottom: "2px", marginTop: "20px"}}
            >
              Description
            </p>
            <p style={{marginTop: "3px"}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              volutpat orci fusce ipsum. Nibh augue amet, rhoncus nulla
              ultricies vulputate ornare. Amet dolor volutpat rhoncus, quis sit.
              Aliquet scelerisque vulputate amet natoque. Pretium neque turpis
              arcu enim. Posuere auctor velit arcu vestibulum. Tincidunt diam
              nisi convallis id a aliquam. Mattis euismod tellus penatibus
              pellentesque parturient sodales nec mattis porta. Lacus amet,
              egestas turpis sit id quisque pharetra, sit. Tristique
              sollicitudin sed ipsum sollicitudin. Urna ac enim quis bibendum id
              orci.
            </p>
          </TabPanel>
          <TabPanel value={secondValue} index={1}>
            Item Two
          </TabPanel>
        </div>
        <TabPanel value={secondValue} index={0}>
          <Grid container justify="center">
            <Grid item xs={12} sm={4}>
              <p
                style={{
                  textAlign: "center",
                  margin: "50px 0",
                  color: "#7B7B7B"
                }}
              >
                Want to help us improve our data?
              </p>
              <Button
                variant="contained"
                color="primary"
                className="btn-big bg-primary color-white btn-leave-feedback"
              >
                Leave Feedback
              </Button>
            </Grid>
          </Grid>
        </TabPanel>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="test-results">
          {testResult.map((result, index) => (
            <TestResultCard
              key={index}
              title={result.title}
              date={result.date}
              result={result.result}
            ></TestResultCard>
          ))}
        </div>
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
    </Box>
  );
}
