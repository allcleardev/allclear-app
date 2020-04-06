import React from 'react';

import Box from '@material-ui/core/Container';

import Header from '../components/header-round';

export default function PhoneVerifySuccess({ props }) {
  return (
    <div className="background-responsive">
      <Box className="phone-verify">
        <Header>
          <h1 style={{ justifyContent: 'center', margin: '0' }}>Signup Successful</h1>
          <p>Please check sms text message for your verification link!</p>
        </Header>
      </Box>
    </div>
  );
}
