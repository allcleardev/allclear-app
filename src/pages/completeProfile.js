import React from 'react';

import HomescreenHeader from '../components/headers/header-homescreen';
import UserProfileCard from '../components/cardProfile';
import AlertToggleCard from '../components/cardAlertToggle';
import ArrowCard from '../components/cardArrow';
import FriendCard from '../components/cardFriend';
import NavBottom from '../components/navBottom';

import Box from '@material-ui/core/Container';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import userAvatar from '../assets/images/avatar.svg';

import { friendData } from '../constants';

const useStyles = makeStyles((theme) => ({
  button: {
    width: '100%',
    margin: '15px 0',
    borderRadius: '10px',
    height: 48,
  },
}));

export default class CompleteProfile extends React.Component  {
  // const classes = useStyles();
  
  componentDidMount =() => {
  }

  render(){
    return (
      <Box className="complete-profile">
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
        <Grid container spacing={3}  style={{ justifyContent: 'center', marginBottom: '56px' }}>
          <Grid item xs={12} sm={11}>
            <div className="profile-body" style={{ display: 'flex', justifyContent: 'center' }}>
              {/* <h2 className="body-title">Complete Profile</h2>
              <AlertToggleCard
                title="Get Text Alerts"
                description="Sign up for real-time updates on your eligible tests."
              ></AlertToggleCard> */}
              <h2 className="body-title">Test Locations Near You</h2>
              <ArrowCard
                title="East Williamsburg"
                description="Williamsburg Drive-Thru Testing"
                symptoms="Fever or Cough"
                isRelaxed = 'true'
              ></ArrowCard>
               <ArrowCard
                title="Greenoint Clinic"
                description="Dolor Set Test"
                symptoms="Fever, Sore Throat"
                isRelaxed = 'true'
              ></ArrowCard> <ArrowCard
              title="Chelsea Drive-Thru Clinic"
              description="1 Mile"
              isRelaxed = 'false'
              ></ArrowCard> <ArrowCard
              title="Williamsburg Drive-Thru"
              description="1.4 Mile"
              isRelaxed = 'false'
              ></ArrowCard>
              <Grid container justify="center">
                <Grid item xs={12} sm={6}>
                  <Button variant="outlined" color="primary" 
                    onClick={() => this.props.history.push('find-test-map')}
                    style={{width:'100%',margin:'15px 0', borderRadius:'10px',height:48}}
                  // className={classes.button}
                  >
                    View More
                  </Button>
                </Grid>
              </Grid>
  
              <h2 className="body-title">Friends</h2>
              {friendData.map((friend, index) => (
                <FriendCard
                  key={index}
                  user_avatar={userAvatar}
                  username={friend.username}
                  tested_on={friend.testedDate}
                ></FriendCard>
              ))}
              <Grid container justify="center">
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{width:'100%',margin:'15px 0', borderRadius:'10px',height:48}}
                    // className={classes.button}
                    startIcon={
                      <svg width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M16.1206 19.7041V17.7041C16.1206 16.6432 15.6992 15.6258 14.949 14.8757C14.1989 14.1255
                          13.1815 13.7041 12.1206 13.7041H5.12061C4.05974 13.7041 3.04232 14.1255 2.29218 14.8757C1.54203
                          15.6258 1.12061 16.6432 1.12061 17.7041V19.7041M20.1206 6.7041V12.7041M23.1206
                          9.7041H17.1206M12.6206 5.7041C12.6206 7.91324 10.8297 9.7041 8.62061 9.7041C6.41147
                          9.7041 4.62061 7.91324 4.62061 5.7041C4.62061 3.49496 6.41147 1.7041 8.62061 1.7041C10.8297
                          1.7041 12.6206 3.49496 12.6206 5.7041Z"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                  >
                    View More
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
        <NavBottom active={0}></NavBottom>
      </Box>
    );
  }
  
}
