import React from "react";
import qs from "qs";
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';

import Box from "@material-ui/core/Container";
import Axios from "axios";

import Header from "../components/header-round";
import LinearProgress from "@material-ui/core/LinearProgress";
import {Grid} from "@material-ui/core";

export default function VerifyMagicLink({ props, location }) {
  const history = useHistory();
  const [cookies, setCookie] = useCookies(['cookie-name']);


  const santizeSearchParams = (searchParams) => {
    searchParams = searchParams.replace('?', '');
    searchParams = qs.parse(searchParams, []);
    return searchParams;
  };

  // Function to make call backend service to confirm the magic link
  const verifyMagicLink = async (searchParams) => {
    await Axios.post(
      "https://api-dev.allclear.app/peoples/confirm",
      {
        phone: searchParams.phone,
        code: searchParams.code
      }
    ).then((response) => {
      console.log('response', response);
      setCookie('sessid', response.data.id);
      sessionStorage.setItem('sessid', response.data.id);
      history.push("/background");
    }).catch((error) => {
      console.log('error', error);
      // TODO Display Error Message
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
