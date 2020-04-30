import React from 'react';
import { CircularProgress } from '@material-ui/core';

export default function ListLoadingSpinner() {
  return (
    <div
      style={{
        paddingTop: '100px',
        height: '80vh !important',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'top',
      }}
    >
      <CircularProgress color="primary" size={108} />
      <p className="mt-3">Loading Results</p>
    </div>
  );
}
