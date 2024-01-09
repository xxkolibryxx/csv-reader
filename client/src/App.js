// client/src/App.js
import React, { useContext } from 'react';
import { Container } from '@mui/material';
import Input from './components/Input/Input';
import Table from 'components/Table/Table';
import { GlobalContext } from 'providers/Global';
import Loading from 'components/Loading/Loading';
import 'App.css';

function App() {
  const { loading } = useContext(GlobalContext);
  return (
    <Container maxWidth="lg">
      <header>
        <Input />
      </header>
      <main>{loading ? <Loading /> : <Table />}</main>
    </Container>
  );
}

export default App;
