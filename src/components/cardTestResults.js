import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Button } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme) => ({
  root: {},

  content: {},
}));

export default function cardTestResult({ title, date, result }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes = useStyles();

  return (
    <Card className="card-test-result">
      <CardContent className={classes.content}>
        <p className="card-title" style={{ color: '#000' }}>
          {title}
        </p>
        <p className="card-description" style={{ color: '#929292' }}>
          <strong>Date Taken: </strong>
          {date}
        </p>
        <p className="card-description" style={{ color: '#929292' }}>
          <strong>result: </strong>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="5.86523" cy="5.63232" r="5" fill={result === 'positive' ? '#35C759' : '#FF0000'} />
          </svg>
          {result}
        </p>
      </CardContent>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Button className="btn grey-back font-weight-600 hide-mobile">Share Result</Button>
        <Button className="btn primary-back font-weight-600 white hide-mobile" style={{ marginLeft: '15px' }}>
          View Test
        </Button>
        <Fab size="small" aria-label="add" className="grey-back hide-desktop" style={{ boxShadow: 'none' }}>
          <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.785767 7.98026V13.6945C0.785767 14.0734 0.936276 14.4368 1.20419 14.7047C1.47209 14.9726
              1.83546 15.1231 2.21434 15.1231H10.7858C11.1646 15.1231 11.528 14.9726 11.7959 14.7047C12.0638
              14.4368 12.2143 14.0734 12.2143 13.6945V7.98026M9.35719 3.69455L6.50005 0.837402M6.50005 0.837402L3.64291
              3.69455M6.50005 0.837402V10.1231"
              stroke="#333333"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Fab>
        <Button
          className="primary-back white hide-desktop"
          style={{
            marginLeft: '5px',
            padding: '0',
            height: '28px',
            borderRadius: '14px',
          }}
        >
          View
        </Button>
      </div>
    </Card>
  );
}
