import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import AlertSwitch from "../components/switch";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(to right, #28baff, #1195ff)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 15
  },
  content: {}
}));

export default function AlertToggleCard({ title, description }) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <p className="card-title" style={{ color: "#FFF" }}>
          {title}
        </p>
        <p
          className="card-description"
          style={{ color: "#FFF", padding: "5px 0" }}
        >
          {description}
        </p>
      </CardContent>
      <div>
        <AlertSwitch></AlertSwitch>
      </div>
    </Card>
  );
}
