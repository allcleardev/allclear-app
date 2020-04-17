import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

export default function UnderDevelopmentBanner() {
  return (
    <div>
      <AppBar style={{ textAlign: 'center', padding: '1px', backgroundColor: 'red' }}>
        {/* <Toolbar> */}
        <Typography variant="h6">Under Development</Typography>
        {/* </Toolbar> */}
      </AppBar>
    </div>
  );
}
