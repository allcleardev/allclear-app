import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import UserAvatar from '@material-ui/core/CardMedia';
import { Grid, IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: 0,
    margin: "4px 0",
  },
  useravatar: {
    display: "flex",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: "50%",
    margin: "16px 10px",
  },
  content: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
    }
  }
}));

export default function FriendCard({user_avatar, username, tested_on}) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root}>
      <Grid container className={classes.root} justify="space-between">
        <Grid item xs={"auto"}>
          <UserAvatar>
            <img className={classes.useravatar} src={user_avatar} alt={username}></img>
          </UserAvatar>
        </Grid>
        <Grid item xs={8}>
          <CardContent className={classes.content}>
            <h3 className="card-title" style={{color: "#000"}}>
              {username}
            </h3>
            <p className="card-description" style={{color: "#929292"}}>
              <strong>Tested On: </strong>{tested_on}
            </p>
          </CardContent>
        </Grid>
        <Grid item xs={"auto"}>
          <IconButton>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 8.59961H15M15 8.59961L8 1.59961M15 8.59961L8 15.5996" stroke="#007AFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </IconButton>
        </Grid>
      </Grid>
    </Card>
    
  );
}



