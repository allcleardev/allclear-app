import React from 'react';
import { useHistory } from 'react-router-dom';

// import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme) => ({
  frontProgress: {
    color: '#fff',
  },
  backProgress: {
    color: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
  },
}));

const Launch = ({ props }) => {
  useHistory();

  // useEffect(() => {
  //   console.log(props);
  //   setTimeout(() => {
  //     history.push("/phone-verify");
  //   }, 3000);
  // });

  const classes = useStyles();

  return (
    <div maxWidth="xs" className="phone-verifying">
      <div style={{ position: 'absolute' }}>
        {/*maxWidth="xs"*/}
        <Fab
          size="small"
          aria-label="add"
          className="btn-back-fab"
          style={{
            marginTop: '41px',
            marginLeft: '25px',
            backgroundColor: 'transparent',
            boxShadow: 'none',
          }}
        >
          <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.59375 13.1428L1.59375 7.14282L7.59375 1.14282"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Fab>
      </div>
      <div className="flex-container flex-just-center flex-direction-col" style={{ height: '100vh', width: '100vw' }}>
        <p className="fontsize-34 fontweight-600 color-white aligncenter">Verifying Phone Number</p>
        <p className="color-white fontsize-17 aligncenter">We are verifying your phone number.</p>
        <p className="color-white fontsize-17 aligncenter">
          After verifying it, you will advance to complete your profile.
        </p>
        <div className="flex-container flex-just-center" style={{ paddingTop: '67px' }}>
          <CircularProgress
            value="25"
            thickness="2"
            size={100}
            className={classes.frontProgress}
            // disableShrink
          />
          <CircularProgress value="100" size={100} className={classes.backProgress} variant="static" thickness="2" />
        </div>
      </div>
    </div>
  );
};

export default Launch;
