import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function ProgressBottom({ progress, barColor, barStyle, barWidth }) {
  useStyles();  

  const linearProgressStyles = { 
    bar: { 
      borderRadius: 20,
      backgroundColor: barColor,
    }
  };

  const BorderLinearProgress = withStyles(linearProgressStyles)(LinearProgress);
  

  return (
    <div className={barStyle}>
        <BorderLinearProgress
        className="progress-bottom-bar"
        variant="determinate"
        value={100}
        color="secondary"
        style={{
          width: barWidth,
          backgroundColor: 'transparent',
          left: progress,
        }}
      />
    </div>
  );
}