import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { Button, Snackbar, Slide } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  message: {
    fontSize: '.95rem',
    [theme.breakpoints.up('sm')]: {
      minWidth: 300,
    },
  },
}));

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function SnackbarMessage(props) {
  const classes = useStyles();

  return (
    <Snackbar
      open={props.isOpen}
      TransitionComponent={SlideTransition}
      autoHideDuration={props.duration || 4000}
      onClose={props.onClose}
      message={
        <Alert className={classes.message} onClose={props.onClose} severity={props.severity || 'error'}>
          {props.message}
        </Alert>
      }
      classes={{ root: clsx(props.severity) }}
      className={`snackbar ${(props.snackbarClass || 'snackbar__error')}`}
      action={<Button onClick={props.onAction}>{props.action}</Button>}
    >

    </Snackbar>
  );
}
