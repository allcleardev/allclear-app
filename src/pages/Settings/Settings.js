import React from 'react';
import Box from '@material-ui/core/Container';
import { Grid, Avatar, IconButton, Button } from '@material-ui/core';
import Header from '../../components/headers/header-homescreen';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import avatar from '../../assets/images/avatar.svg';
import NavBottom from '../../components/navBottom';
import UserAvatar from '@material-ui/core/CardMedia';

class Settings extends React.Component {

  componentDidMount = () => {
  };

  render() {
    return (
      <Box className="complete-profile">
        <Header>
          <p>Settings</p>
        </Header>
        <Grid container spacing={3} style={{ justifyContent: 'center' }}>
          <Grid item xs={12} sm={11}>
            <Card className="shareProfile"
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Avatar className="shareImg">
                <img src={avatar} alt="shareImg" ></img>
              </Avatar>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%'
                }}
              >
                <CardContent >
                  <p className="shareProfileName">{'ravi'}</p>
                  <Grid container spacing={0}>
                    <Grid item xs={12} sm={4}>
                      <p className="profile-card-content">
                        <strong>Location: </strong> {'location'}
                      </p>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <p className="profile-card-content">
                        <strong>Health: </strong> {'health'}
                      </p>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <p className="profile-card-content">
                        <strong>Test Status: </strong> {'status'}
                      </p>
                    </Grid>
                  </Grid>
                </CardContent>
             
              </div>
            </Card>
          </Grid>
        </Grid>
        <NavBottom active={0}></NavBottom>
      </Box>
    );
  }
}
export default Settings;
