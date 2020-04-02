import React from "react";
import qs from "qs";
import { useHistory } from "react-router-dom";

import Box from "@material-ui/core/Container";
import Axios from "axios";

import Header from "../components/header-round";
import LinearProgress from "@material-ui/core/LinearProgress";
import {Grid} from "@material-ui/core";

const ContainerStyle = {
  height: "100vh",
  background: "linear-gradient(to right, #28baff, #1195ff)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

export default function VerifyMagicLink({ props, location }) {
  const history = useHistory();

  const santizeSearchParams = (searchParams) => {
    searchParams = searchParams.replace('?', '');
    searchParams = qs.parse(searchParams, []);
    return searchParams;
  };

  // Function to make call backend service to confirm the magic link
  const verifyMagicLink = async (searchParams) => {
    await Axios.post(
      "https://allclear-dev.azurewebsites.net/peoples/confirm",
      {
        phone: searchParams.phone,
        code: searchParams.code
      }
    ).then((response) => {
      console.log('response', response);
      history.push("/create-account");
    }).catch((error) => {
      console.log('error', error);
      //history.push("/create-account");
    });

  };

  let searchParams = santizeSearchParams(location.search);

  verifyMagicLink(searchParams);

  return (
    <div className="background-responsive">
      <Box className="phone-verify">
        <Header>
          <h1 style={{ justifyContent: "center", margin: "0" }}>
            Verifying Phone Number
          </h1>
          <p>We are verifying your phone number.</p>
          <p>After verifying it, you will advance to complete your profile.</p>
        </Header>

        <Grid container justify="center">
          <Grid item xs={12} sm={6}>
            <LinearProgress color="primary" value="50" />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
