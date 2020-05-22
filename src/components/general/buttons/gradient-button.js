import React from 'react';
import clsx from 'clsx';
import { Button, withStyles } from '@material-ui/core';

// We can inject some CSS into the DOM.
const styles = {
  root: {
    background: 'linear-gradient(to right, #11BCF1, #007AFF)',
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 10,
    fontSize: '17px',
    border: 0,
    color: 'white',
    height: 48,
    padding: '13px 48px',
  },
};

function ClassNames(props) {
  const { classes, children, className, ...other } = props;

  return (
    <Button className={clsx(classes.root, className)} {...other}>
      {children}
    </Button>
  );
}

export default withStyles(styles)(ClassNames);
