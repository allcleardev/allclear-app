import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';

function SlideTransition(props) {
  return <Slide {...props} direction="up"/>;
}

export default function SnackbarMessage(props) {

  return (
    <Paper
      elevation={16}
    >
      <Snackbar
        open={props.isOpen}
        TransitionComponent={SlideTransition}
        autoHideDuration={props.duration || 4000}
        onClose={props.onClose}
        className={props.snackbarClass || 'snackbar__error'}
      >
        <Alert onClose={props.onClose} severity="error">
          {props.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
