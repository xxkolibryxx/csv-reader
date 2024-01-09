import React from 'react';
import { CircularProgress, Grid } from '@mui/material';

const Loading = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        height: '100%',
      }}
    >
      <CircularProgress />
    </Grid>
  );
};
export default Loading;
