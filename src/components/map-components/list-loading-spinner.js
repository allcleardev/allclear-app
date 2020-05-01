import React from 'react';
import { CircularProgress } from '@material-ui/core';

export default function ListLoadingSpinner() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 40,
      }}
    >
      <CircularProgress color="primary" size={108} />
      <p className="mt-3">Loading Results</p>
    </div>
  );
}
