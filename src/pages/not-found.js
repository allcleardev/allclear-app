import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import finn from '../assets/images/finn.png';


export default function NotFound() {
  return (
    <Grid container spacing={24} alignContent="center" className="bg-primary white flex-container flex-just-center">
      <Grid item xs={12} className="aligncenter" style={{marginBottom: '10vh'}}>
        <div className="fontsize-50">404 - Page Not Found</div>
      </Grid>
      <Grid container justify="center" spacing={1}>
        <Grid item xs={12} sm={6} className="aligncenter">
          <img src={finn} alt="finn-the-dog" style={{height: '50vh', width: '50vh'}} />
        </Grid>
        <Grid item xs={12} sm={6} justify='center' className="fontsize-30" style={{marginTop: '5vh', marginLeft: '-8vw'}}>
          <p>We think Finneas ate it!</p>
          <p>But don't worry; he's a good boy.</p>
          <div className="wrapBtnS" style={{width: '30%'}}>
            <Link to="/map">
              <button className="whiteBGS">Go To Map</button>
            </Link>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};
