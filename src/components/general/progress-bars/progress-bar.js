import React from 'react';
import {lighten, makeStyles, withStyles} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    borderRadius: 8,
    backgroundColor: () => lighten('#808080', 0.85)
  },
  bar: {
    borderRadius: 20,
    backgroundColor: (props) => props.color
  },
})(LinearProgress);


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function ProgressBar({children, ...props}) {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <BorderLinearProgress
        className={classes.margin}
        variant="determinate"
        color={props.barColor || 'secondary'}
        value={props.value}
      />
    </div>
  );
}
