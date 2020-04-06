import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: 12,
    minWidth: 256,
    textAlign: 'center'
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: 'auto'
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginTop: theme.spacing(4),
    marginBottom: 0
  },
  subheader: {
    fontSize: 14,
    color: theme.palette.grey[500],
    marginBottom: theme.spacing(2)
  }
}));

export default function ProfileCard() {
  const styles = useStyles();

  return (
    <Card>
      <CardContent>
        <Avatar className={styles.large} />
        <h3 className={styles.heading}>Alan Podemski</h3>
        <span className={styles.subheader}>New York, United States</span>
      </CardContent>
      <Divider light variant="middle" />
      <CardContent>
        <Box m={0.5}>
          <p>
            Health: <b>Asymptotic</b>
          </p>
        </Box>
      </CardContent>
      <Divider light variant="middle" />
      <CardContent>
        <p>
          Test Status: <b>Untested</b>
        </p>
      </CardContent>
      <Divider light variant="middle" />
      <CardContent>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary">
              Complete Profile
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
