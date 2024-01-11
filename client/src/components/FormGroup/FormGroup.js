import React from 'react';
import { TextField, Grid } from '@mui/material';
import { Button } from 'components/Styled/Button/Button';

const FormGroup = ({ inputProps = {}, buttonLabel = '', buttonProps = {} }) => {
  console.log(inputProps);
  return (
    <>
      <Grid container columnSpacing={1} rowSpacing={0} alignItems="stretch">
        <Grid item xs={8} md={10}>
          <TextField {...inputProps} />
        </Grid>
        <Grid item xs={4} md={2}>
          <Button {...buttonProps}>{buttonLabel}</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FormGroup;
