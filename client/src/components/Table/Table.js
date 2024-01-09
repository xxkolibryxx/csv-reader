import React, { useContext } from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  Grid,
  Typography,
} from '@mui/material';
import useTable from './useTable';
import useBrakePoints from 'hooks/useBakePoints';
import { GlobalContext } from 'providers/Global';

const Table = () => {
  const { data, lineCount } = useContext(GlobalContext);
  const {
    searchTerm,
    setSearchTerm,
    keys,
    filteredData,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useTable({ data });
  const { sm } = useBrakePoints();
  if (data.length === 0 || !Array.isArray(data)) return null;
  return (
    <div>
      <Grid container columnSpacing={1} rowSpacing={0} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            label="Поиск"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            size="small"
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {lineCount !== null && (
            <Typography variant="body1" component="p" align={sm ? 'right' : 'left'}>
              Количество строк в файле: {lineCount}
            </Typography>
          )}
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <MuiTable>
          <TableHead>
            <TableRow>
              {keys.map((key, index) => (
                <TableCell key={index}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {keys.map((key, keyIndex) => (
                    <TableCell key={keyIndex}>{row[key]}</TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Table;
