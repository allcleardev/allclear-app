import React from 'react';
import Box from '@material-ui/core/Container';
import { Grid, Avatar, IconButton, Button } from '@material-ui/core';
import Header from '../../components/headers/header-homescreen';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import avatar from '../../assets/images/avatar.svg';
import NavBottom from '../../components/navBottom';
import UserAvatar from '@material-ui/core/CardMedia';
import UnderDevelopment from '../UnderDevelopment';
class ShareApp extends React.Component {

  componentDidMount = () => {
  };

  render() {
    return (
      <Box className="complete-profile">
        <UnderDevelopment />
        <Header>
          <p>Allclear</p>
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
                <div>
                  <IconButton>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 15.2178C13.6569 15.2178 15 13.8746 15 12.2178C15 10.5609 13.6569 9.21777 12
                    9.21777C10.3431 9.21777 9 10.5609 9 12.2178C9 13.8746 10.3431 15.2178 12 15.2178Z"
                        stroke="#929292"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19.4 15.2178C19.2669 15.5194 19.2272 15.854 19.286 16.1784C19.3448 16.5028 19.4995 16.8021
                     19.73 17.0378L19.79 17.0978C19.976 17.2835 20.1235 17.5041 20.2241 17.7469C20.3248 17.9897
                      20.3766 18.2499 20.3766 18.5128C20.3766 18.7756 20.3248 19.0359 20.2241 19.2787C20.1235 19.5215
                      19.976 19.742 19.79 19.9278C19.6043 20.1137 19.3837 20.2612 19.1409 20.3619C18.8981 20.4625
                      18.6378 20.5143 18.375 20.5143C18.1122 20.5143 17.8519 20.4625 17.6091 20.3619C17.3663 20.2612
                      17.1457 20.1137 16.96 19.9278L16.9 19.8678C16.6643 19.6372 16.365 19.4826 16.0406 19.4238C15.7162
                      19.365 15.3816 19.4047 15.08 19.5378C14.7842 19.6645 14.532 19.875 14.3543 20.1433C14.1766 20.4116
                      14.0813 20.726 14.08 21.0478V21.2178C14.08 21.7482 13.8693 22.2569 13.4942 22.632C13.1191 23.0071
                       12.6104 23.2178 12.08 23.2178C11.5496 23.2178 11.0409 23.0071 10.6658 22.632C10.2907 22.2569
                       10.08 21.7482 10.08 21.2178V21.1278C10.0723 20.7968 9.96512 20.4758 9.77251 20.2065C9.5799
                       19.9372 9.31074 19.7321 9 19.6178C8.69838 19.4847 8.36381 19.445 8.03941 19.5038C7.71502
                       19.5626 7.41568 19.7172 7.18 19.9478L7.12 20.0078C6.93425 20.1937 6.71368 20.3412 6.47088
                       20.4419C6.22808 20.5425 5.96783 20.5943 5.705 20.5943C5.44217 20.5943 5.18192 20.5425 4.93912
                       20.4419C4.69632 20.3412 4.47575 20.1937 4.29 20.0078C4.10405 19.822 3.95653 19.6015 3.85588
                        19.3587C3.75523 19.1159 3.70343 18.8556 3.70343 18.5928C3.70343 18.3299 3.75523 18.0697 3.85588
                         17.8269C3.95653 17.5841 4.10405 17.3635 4.29 17.1778L4.35 17.1178C4.58054 16.8821 4.73519
                         16.5828 4.794 16.2584C4.85282 15.934 4.81312 15.5994 4.68 15.2978C4.55324 15.002 4.34276
                         14.7498 4.07447 14.5721C3.80618 14.3944 3.49179 14.2991 3.17 14.2978H3C2.46957 14.2978 1.96086
                         14.0871 1.58579 13.712C1.21071 13.3369 1 12.8282 1 12.2978C1 11.7673 1.21071 11.2586 1.58579
                          10.8836C1.96086 10.5085 2.46957 10.2978 3 10.2978H3.09C3.42099 10.29 3.742 10.1829 4.0113
                          9.99028C4.28059 9.79768 4.48572 9.52851 4.6 9.21777C4.73312 8.91616 4.77282 8.58158 4.714
                          8.25718C4.65519 7.93279 4.50054 7.63345 4.27 7.39777L4.21 7.33777C4.02405 7.15203 3.87653
                          6.93145 3.77588 6.68865C3.67523 6.44586 3.62343 6.1856 3.62343 5.92277C3.62343 5.65994
                          3.67523 5.39969 3.77588 5.15689C3.87653 4.9141 4.02405 4.69352 4.21 4.50777C4.39575 4.32182
                          4.61632 4.1743 4.85912 4.07365C5.10192 3.97301 5.36217 3.9212 5.625 3.9212C5.88783 3.9212
                          6.14808 3.97301 6.39088 4.07365C6.63368 4.1743 6.85425 4.32182 7.04 4.50777L7.1
                          4.56777C7.33568 4.79831 7.63502 4.95296 7.95941 5.01178C8.28381 5.0706 8.61838 5.03089 8.92
                           4.89777H9C9.29577 4.77101 9.54802 4.56053 9.72569 4.29224C9.90337 4.02395 9.99872 3.70956
                           10 3.38777V3.21777C10 2.68734 10.2107 2.17863 10.5858 1.80356C10.9609 1.42849 11.4696
                           1.21777 12 1.21777C12.5304 1.21777 13.0391 1.42849 13.4142 1.80356C13.7893 2.17863
                           14 2.68734 14 3.21777V3.30777C14.0013 3.62956 14.0966 3.94395 14.2743 4.21224C14.452
                           4.48053 14.7042 4.69101 15 4.81777C15.3016 4.95089 15.6362 4.9906 15.9606 4.93178C16.285
                           4.87296 16.5843 4.71831 16.82 4.48777L16.88 4.42777C17.0657 4.24182 17.2863 4.0943 17.5291
                           3.99365C17.7719 3.89301 18.0322 3.8412 18.295 3.8412C18.5578 3.8412 18.8181 3.89301 19.0609
                            3.99365C19.3037 4.0943 19.5243 4.24182 19.71 4.42777C19.896 4.61352 20.0435 4.8341 20.1441
                            5.07689C20.2448 5.31969 20.2966 5.57994 20.2966 5.84277C20.2966 6.1056 20.2448 6.36586
                            20.1441 6.60865C20.0435 6.85145 19.896 7.07203 19.71 7.25777L19.65 7.31777C19.4195 7.55345
                            19.2648 7.85279 19.206 8.17718C19.1472 8.50158 19.1869 8.83616 19.32
                            9.13777V9.21777C19.4468 9.51354 19.6572 9.76579 19.9255 9.94347C20.1938 10.1211
                            20.5082 10.2165 20.83 10.2178H21C21.5304 10.2178 22.0391 10.4285 22.4142 10.8036C22.7893
                            11.1786 23 11.6873 23 12.2178C23 12.7482 22.7893 13.2569 22.4142 13.632C22.0391 14.0071
                            21.5304 14.2178 21 14.2178H20.91C20.5882 14.2191 20.2738 14.3144 20.0055 14.4921C19.7372
                            14.6698 19.5268 14.922 19.4 15.2178Z"
                        stroke="#929292"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </IconButton>
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={3} style={{ justifyContent: 'center', marginBottom: '56px' }}>
          <Grid item xs={12} sm={11}>
            <div className="profile-body" style={{ display: 'flex', justifyContent: 'center' }}>
              <h2 className="body-title">Your Contacts</h2>
              <Card className="shareCardContent">
                <CardContent >
                  <p className="sharecard-description" >
                    {'Help your friends find tests and share results'}
                  </p>
                  <Grid container justify="center">
                    <Grid container justify="center">
                      <Grid item xs={12} sm={6}>
                        <Button className="shareButton" variant="outlined"
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
                          color="primary" >
                          Invite Friends
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <h2 className="body-title">Public</h2>
              <Card className="shareCardContent">
                <Grid container justify="space-between">
                  <Grid item xs={2}>
                    <UserAvatar>
                      <img
                        className="shareFrndImg"
                        src={avatar}
                        alt={'username'}
                      ></img>
                    </UserAvatar>
                  </Grid>
                  <Grid item xs={8}>
                    <CardContent>
                      <h3 className="card-title" style={{ color: '#000' }}>
                        {'Ravi Chauhan'}
                      </h3>
                      <p className="card-description" style={{ color: '#929292' }}>
                        <strong>Test Results: </strong>
                        {'12/12/12'}
                      </p>
                    </CardContent>
                  </Grid>
                  <Grid item xs={2} style={{ margin: 'auto', textAlign: 'center' }}>
                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                  </Grid>
                </Grid>
              </Card>
              <Card className="shareCardContent">
                <Grid container justify="space-between">
                  <Grid item xs={2}>
                    <UserAvatar>
                      <img
                        className="shareFrndImg"
                        src={avatar}
                        alt={'username'}
                      ></img>
                    </UserAvatar>
                  </Grid>
                  <Grid item xs={8}>
                    <CardContent>
                      <h3 className="card-title" style={{ color: '#000' }}>
                        {'Ravi Chauhan'}
                      </h3>
                      <p className="card-description" style={{ color: '#929292' }}>
                        <strong>Test Results: </strong>
                        {'12/12/12'}
                      </p>
                    </CardContent>
                  </Grid>
                  <Grid item xs={2} style={{ margin: 'auto', textAlign: 'center' }}>
                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                  </Grid>
                </Grid>
              </Card>
              <Card className="shareCardContent">
                <Grid container justify="space-between">
                  <Grid item xs={2}>
                    <UserAvatar>
                      <img
                        className="shareFrndImg"
                        src={avatar}
                        alt={'username'}
                      ></img>
                    </UserAvatar>
                  </Grid>
                  <Grid item xs={8}>
                    <CardContent>
                      <h3 className="card-title" style={{ color: '#000' }}>
                        {'Ravi Chauhan'}
                      </h3>
                      <p className="card-description" style={{ color: '#929292' }}>
                        <strong>Test Results: </strong>
                        {'12/12/12'}
                      </p>
                    </CardContent>
                  </Grid>
                  <Grid item xs={2} style={{ margin: 'auto', textAlign: 'center' }}>
                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                  </Grid>
                </Grid>
              </Card>
            </div>
          </Grid>
        </Grid>
        <NavBottom active={0}></NavBottom>
      </Box>
    );
  }
}
export default ShareApp;
