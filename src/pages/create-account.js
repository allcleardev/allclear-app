import React from "react";
import Header from "../components/header-round";

import Box from "@material-ui/core/Container";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const bodyStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // height: "100vh",
  flexDirection: "column",
  alignContent: "space-between"
};

const useStyles = makeStyles(theme => ({
  button: {
    margin: "6px 0",
    borderRadius: "14px",
    width: "100%"
  }
}));

export default function CreateAccount({}) {
  const classes = useStyles();

  return (
    <Box>
      <Header>
        <h1>Create Account</h1>
        <p>
          First, tell us a litte about yourself so we know how to help you best.
        </p>
      </Header>

      <div style={bodyStyle}>
        <h4>CORVID-19 TESTING</h4>
        <Grid container justify="center">
          <Grid item xs={8} sm={4}>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              className={classes.button}
            >
              I want to be tested
            </Button>
            <Button
              variant="contained"
              size="small"
              color="primary"
              className={classes.button}
              style={{
                backgroundColor: "#003297"
              }}
            >
              I have been tested
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              className={classes.button}
            >
              Neither
            </Button>
          </Grid>
        </Grid>

        <h4>CORVID-19 SYMPTOMS</h4>
        <Grid container justify="center">
          <Grid item xs={8} sm={4}>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              className={classes.button}
            >
              I don't have symptoms
            </Button>
            <Button
              variant="contained"
              size="small"
              color="primary"
              className={classes.button}
              style={{
                backgroundColor: "#003297"
              }}
            >
              I had symptoms
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              className={classes.button}
            >
              I have symptoms
            </Button>
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item xs={12} sm={4}>
            <Link to="/phone-verify">
              <Button
                variant="contained"
                color="primary"
                fullWidth="true"
                style={{
                  height: "48px",
                  backgroundColor: "#007AFF",
                  margin: "30px 0",
                  borderRadius: "14px"
                }}
              >
                Create Account
              </Button>
            </Link>

            <h4 style={{ color: "#999999", textAlign: "center" }}>
              Already have an account?{" "}
              <span style={{ color: "#007AFF" }}>Sign In</span>
            </h4>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}
