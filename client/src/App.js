// client/src/App.js
import React from 'react';
import { Container } from '@mui/material';
import FormGroup from './components/FormGroup/FormGroup';
import Table from 'components/Table/Table';
import Loading from 'components/Loading/Loading';
import 'App.css';
import useGlobal from 'hooks/useGlobal';

function App() {
  const { url, setUrl, error, handleShowButtonClick, data, lineCount, loading } = useGlobal();
  console.log(url);
  return (
    <Container maxWidth="lg">
      <header>
        <FormGroup
          inputProps={{
            label: error ? error : 'URL файла CSV',
            value: url,
            onChange: (e) => setUrl(e.target.value),
            error: error,
            variant: 'outlined',
            fullWidth: true,
            size: 'small',
          }}
          buttonLabel="Показать"
          buttonProps={{
            onClick: handleShowButtonClick,
            variant: 'contained',
            color: 'primary',
            fullWidth: true,
          }}
        />
      </header>
      <main>{loading ? <Loading /> : <Table data={data} lineCount={lineCount} />}</main>
    </Container>
  );
}

export default App;
