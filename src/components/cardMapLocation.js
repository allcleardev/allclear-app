import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  content: {}
}));

export default function CardMapLocation({
  index,
  title,
  description,
  status,
  serviceTime,
  commuteWay
}) {
  const classes = useStyles();

  return (
    <Card className="card-map-location">
      <h3 className="card-title" style={{ color: "#000" }}>
        <span className="grey" style={{}}>
          {index}.
        </span>{" "}
        {title}
      </h3>
      <p className="card-description" style={{ color: "#929292" }}>
        {description}
      </p>

      <IconButton>
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 8.59961H15M15 8.59961L8 1.59961M15 8.59961L8 15.5996"
            stroke="#007AFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </IconButton>
    </Card>
  );
}
