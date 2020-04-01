import React from "react";
import qs from "qs";
import { useHistory } from "react-router-dom";

import Box from "@material-ui/core/Container";
import Axios from "axios";

import Header from "../components/header-round";

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
      history.push("/background");
    }).catch((error) => {
      console.log('error', error)
    });

  };

  let searchParams = santizeSearchParams(location.search);

  verifyMagicLink(searchParams);

  return (
    <div className="background-responsive">
      <Box className="phone-verify">
        <Header>
          <h1 style={{ justifyContent: "center", margin: "0" }}>
            Verifying Account
          </h1>
          <p>Please check sms text message for your verification link!</p>
        </Header>

      </Box>
    </div>
  );
}
