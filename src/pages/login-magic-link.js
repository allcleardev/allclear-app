import React from 'react';
import qs from 'qs';
import { useHistory } from 'react-router-dom';

import Box from '@material-ui/core/Container';
import Axios from 'axios';

import RoundHeader from '../components/headers/header-round';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Grid } from '@material-ui/core';

export default function LoginMagicLink({ props, location }) {
  const history = useHistory();

  const santizeSearchParams = (searchParams) => {
    searchParams = searchParams.replace('?', '');
    searchParams = qs.parse(searchParams, []);
    return searchParams;
  };

  // Function to make call backend service to confirm the magic link
  const verifyMagicLink = async (searchParams) => {
    await Axios.put('/peoples/auth', {
      phone: searchParams.phone,
      token: searchParams.token,
    })
      .then((response) => {
        console.log('response', response);
        localStorage.setItem('sessid', response.data.id);
        localStorage.setItem('session', response.data);
        history.push('/map');
      })
      .catch((error) => {
        console.log('error', error);
        // TODO Display Error Message
      });
  };

  let searchParams = santizeSearchParams(location.search);

  verifyMagicLink(searchParams);

  return (
    <div className="background-responsive">
      <Box className="sign-up">
        <RoundHeader>
          <h1 style={{ justifyContent: 'center', margin: '0' }}>Verifying Phone Number</h1>
          <p>We are verifying your phone number.</p>
          <p>After verifying it, you will advance to complete your profile.</p>
        </RoundHeader>

        <Grid container justify="center">
          <Grid item xs={12} sm={6}>
            <LinearProgress color="primary" value={50} variant="indeterminate" />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
