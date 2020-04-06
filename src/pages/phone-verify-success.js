import React from 'react';

import Box from '@material-ui/core/Container';

import RoundHeader from '../components/headers/header-round';

export default function PhoneVerifySuccess({ props }) {
  return (
    <div className="background-responsive">
      <Box className="phone-verify">
        <RoundHeader>
          <h1 style={{ justifyContent: 'center', margin: '0' }}>Signup Successful</h1>
          <p>Please check sms text message for your verification link!</p>
        </RoundHeader>
      </Box>
    </div>
  );
}
