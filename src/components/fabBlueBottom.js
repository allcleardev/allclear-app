import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';


const useStyles = makeStyles(() => ({
  root: {},

  content: {},
}));

export default function fabBlueBottom({ children, style, class_name, handle_name }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useStyles();

  return (
    <Fab aria-label="add" className={class_name} color="primary" style={style} onClick={handle_name}>
      {children}
    </Fab>
  );
}
