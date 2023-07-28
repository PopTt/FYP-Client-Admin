import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f1f1f1',
  },
  text: {
    margin: 5
  }
});

function Loading() {
  const classes = useStyles();

  return (
    <div className={classes.loading}>
      <CircularProgress color="primary" />
      <span className={classes.text}>Loading...</span>
    </div>
  );
}

export default Loading;