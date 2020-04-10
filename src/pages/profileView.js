import React from 'react';
import { Link } from 'react-router-dom';

import HomescreenHeader from '../components/headers/header-homescreen';
import NavBottom from '../components/navBottom';
// import CardArrow from '../components/cardArrow';

import Box from '@material-ui/core/Container';
import { Button, Grid, IconButton } from '@material-ui/core';
// import { makeStyles } from "@material-ui/core/styles";

import userAvatar from '../assets/images/defaultProfile.svg';
// import editSvg from '../assets/images/edit.svg';

// const useStyles = makeStyles(theme => ({
//   button: {
//     width: "100%",
//     margin: "15px 0",
//     borderRadius: "10px",
//     height: 48
//   }
// }));

const EditIconButton = () => {
  return (
    <IconButton>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.7437 0.712402L18.7437 5.7124L5.74365 18.7124H0.743652V13.7124L13.7437 0.712402Z"
          stroke="#242424"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconButton>
  );
};

export default function ProfileView() {
  return (
    <Box className="profile-view">
      <HomescreenHeader>
        <div className="avatar-edit">
          <div className="avatar">
            <img
              src={userAvatar}
              alt="avatar"
              style={{ borderRadius: '50%', backgroundColor: 'white', border: '1px solid white' }}
            />
          </div>
          {/* <EditIconButton></EditIconButton> */}
        </div>
      </HomescreenHeader>
      <Grid container className="flex-container flex-just-center">
        <Grid item xs={12} sm={6}>
          <div className="card-phone">
            <div className="phone-number" style={{}}>
              <p className="fontsize-15">Phone</p>
              <p className="fontsize-15">(408) 555 - 5555</p>
            </div>
            <IconButton>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.7437 0.712402L18.7437 5.7124L5.74365 18.7124H0.743652V13.7124L13.7437 0.712402Z"
                  stroke="#242424"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </IconButton>
          </div>
        </Grid>
      </Grid>
      <Grid container className="flex-container flex-just-center">
        <Grid item xs={12} sm={6}>
          <div className="card-blank">
            <div className="flex-container flex-direction-row flex-just-between flex-align-start">
              <div className="flex-container flex-direction-col">
                <div className="card-detail">
                  <p className="title">Location</p>
                  <p className="description">11211</p>
                </div>
                <div className="card-detail">
                  <p className="title">Exposure to COVID-19</p>
                  <p className="description">Known Contact With Someone</p>
                </div>
                <div className="card-detail">
                  <p className="title">Health Worker Status</p>
                  <p className="description">
                    I live with a health worker or <br /> first responder
                  </p>
                </div>
                <div className="card-detail">
                  <p className="title">Conditions</p>
                  <div className="flex-containter flex-wrap-on">
                    <Button className="btn-description color-white bg-navy">Weakened Immune System</Button>
                    <Button className="btn-description color-white bg-navy">Kidney Failure or Cirrhosis</Button>
                  </div>
                </div>
                <div className="card-detail">
                  <p className="title">Symptoms</p>
                  <div className="flex-containter flex-wrap-on">
                    <Button className="btn-description color-white bg-navy">Fever</Button>
                    <Button className="btn-description color-white bg-navy">Dry Cough</Button>
                    <Button className="btn-description color-white bg-navy">Runny Nose/Nasal Congestion</Button>
                  </div>
                </div>
              </div>
              <Link to="/profile-edit">
                <EditIconButton></EditIconButton>
              </Link>
            </div>
          </div>
          {/* <h3 className="fontsize-17" style={{ padding: '30px 0', marginBottom: '-10px' }}>
            Test Results
          </h3>
          <CardArrow title="Test Type: Alpha Test" description="Williamsburg Drive-Thru Testing">
            <p className="card-description">
              Results:{' '}
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5.59961" cy="5.05566" r="5" fill="#FF0000" />
              </svg>{' '}
              Positive
            </p>
            <p className="card-description">3/26/2020</p>
          </CardArrow> */}
        </Grid>
      </Grid>
      <Grid
        container
        style={{
          display: 'flex',
          justifyContent: 'space-around',

          padding: '15px 0px 0px 5px',
        }}
        className="btn-group"
      >
        <Grid item xs={12} sm={6}>
          <Button style={{ color: '#2A7DF4', border: '1px solid #2A7DF4' }} className="btn-big  fontsize-16">
            Logout
          </Button>
        </Grid>
      </Grid>
      <NavBottom active={4}></NavBottom>
    </Box>
  );
}
