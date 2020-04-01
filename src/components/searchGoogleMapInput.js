import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
  root: {},
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

export default function SearchGoogleMapInput({ style }) {
  const classes = useStyles();

  return (
    <Paper component="form" className="input-search-googlemap" style={style}>
      <InputBase
        className={classes.input}
        placeholder="Search by Location"
        inputProps={{ "aria-label": "Search by Location" }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.4626 18.7188L15.1126 14.3688M17.4626 8.71875C17.4626 13.137 13.8809 16.7188 9.46265 16.7188C5.04437 16.7188 1.46265 13.137 1.46265 8.71875C1.46265 4.30047 5.04437 0.71875 9.46265 0.71875C13.8809 0.71875 17.4626 4.30047 17.4626 8.71875Z"
            stroke="#151522"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </IconButton>
    </Paper>
  );
}
