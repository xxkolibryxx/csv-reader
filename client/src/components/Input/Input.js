import React from 'react';
import { TextField, Grid } from '@mui/material';
import { useInput } from './useInput';
import { Button } from 'components/Styled/Button/Button';

const Input = () => {
  const { url, setUrl, error, handleShowButtonClick } = useInput();
  return (
    <>
      <Grid container columnSpacing={1} rowSpacing={0} alignItems="stretch">
        <Grid item xs={8} md={10}>
          <TextField
            error={error}
            label={error ? error : 'URL файла CSV'}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            variant="outlined"
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={4} md={2}>
          <Button variant="contained" color="primary" onClick={handleShowButtonClick} fullWidth>
            Показать
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Input;
