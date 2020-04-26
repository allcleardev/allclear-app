import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '60%',
    fontSize: '.95rem',
    [theme.breakpoints.up('sm')]: {
      minWidth: 400,
    },
  },
}));

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function SnackbarMessage(props) {
  const classes = useStyles();

  return (
    <Paper elevation={16}>
      <Snackbar
        open={props.isOpen}
        TransitionComponent={SlideTransition}
        autoHideDuration={props.duration || 4000}
        onClose={props.onClose}
        className={props.snackbarClass || 'snackbar__error'}
      >
        <Alert className={classes.root} onClose={props.onClose} severity={props.severity || 'error'}>
          {props.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
