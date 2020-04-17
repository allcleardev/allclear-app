import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)',
    borderRadius: '6px',
  },
  content: {},
}));

export default function ArrowCard({ title, description, symptoms, isRelaxed }) {
  const classes = useStyles();

  return (
    <Card className={isRelaxed === 'true' ? 'isRelaxedBackground root' : 'root'} style={{ marginBottom: 10 }}>
      <CardContent className={classes.content}>
        <p className="card-title" style={{ color: '#000' }}>
          {title}
        </p>
        <p className="card-description" style={{ color: '#929292' }}>
          {description}
        </p>

        {symptoms ? (
          <p className="card-description" style={{ color: '#929292' }}>
            Symptoms: {symptoms}
          </p>
        ) : (
          ''
        )}
      </CardContent>
      <IconButton>
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
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
