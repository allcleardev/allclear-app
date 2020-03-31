import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: "0px 3px 25px rgba(0, 0, 0, 0.3)",
    fontSize: "14px",
    color: "#fff"
  },

  content: {}
}));

export default function fabBlueBottom({ children, style }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes = useStyles();

  return (
    <Fab
      aria-label="add"
      className={classes.root}
      color="primary"
      style={style}
    >
      {children}
    </Fab>
  );
}
