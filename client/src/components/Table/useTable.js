import { useMemo, useState } from 'react';

const useTable = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const keys = useMemo(() => {
    if (data.length > 0) return Object.keys(data[0]);
    return [];
  }, [data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredData = data.filter((row) =>
    keys.some((key) => String(row[key]).toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return {
    searchTerm,
    setSearchTerm,
    keys,
    filteredData,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};

export default useTable;
