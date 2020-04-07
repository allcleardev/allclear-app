import React from 'react';

import HomescreenHeader from '../components/headers/header-homescreen';
import UserProfileCard from '../components/cardProfile';
import NavBottom from '../components/navBottom';
import UpdateCriteriaModal from './updateTestingCriteriaModal';

import Box from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import userAvatar from '../assets/images/avatar.svg';

const useStyles = makeStyles((theme) => ({
  button: {
    width: '100%',
    margin: '15px 0',
    borderRadius: '10px',
    height: 48,
  },
}));

export default function ProfileEdit() {
  const classes = useStyles();

  return (
    <Box className="profile-edit">
      <HomescreenHeader>
        <p>Allclear</p>
      </HomescreenHeader>

      <UserProfileCard
        avatar={userAvatar}
        userName="sdf"
        location="NYC"
        health="Sympathic"
        status="untested"
      ></UserProfileCard>
      <Grid container spacing={3} className={classes.root} style={{ justifyContent: 'center', marginBottom: '56px' }}>
        <Grid item xs={12} sm={11}>
          <div className="profile-body flex-direction-col">
            <h2 className="body-title">Test Location Preferences</h2>
            <UpdateCriteriaModal></UpdateCriteriaModal>
          </div>
        </Grid>
      </Grid>
      <NavBottom active={0}></NavBottom>
    </Box>
  );
}
