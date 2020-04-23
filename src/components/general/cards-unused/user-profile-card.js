import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: '-60px',
    borderRadius: 15,
    boxShadow: '0px 24px 32px rgba(50, 50, 71, 0.08), 0px 16px 16px rgba(50, 50, 71, 0.08)',
  },
  profileName: {
    fontSize: 15,
    fontWeight: 600,
    padding: 0,
    margin: 0,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  small: {
    width: 75,
    height: 75,
    margin: 16,
  },
  content: {
    width: 'auto',
  },
  cover: {
    width: 75,
    height: 75,
    borderRadius: '50%',
    backgroundColor: 'red',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export default function UserProfileCard({ children }) {
  useStyles();

  return (
    <div className="user-profile-card">
      <Grid container style={{ justifyContent: 'left' }}>
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </div>
  );
}
