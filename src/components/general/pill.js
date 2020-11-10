import React from 'react';
import { Button } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 20
  },
}));

export default function Pill({text}) {

  const classes = useStyles();

  return (
    <Button
      variant="outlined"
      size="small"
      color="primary"
      className={classes.root}
    >
      {text}
    </Button>
  );
};
