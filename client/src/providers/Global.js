import { useState, createContext } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lineCount, setLineCount] = useState(null);

  return (
    <GlobalContext.Provider value={{ data, setData, loading, setLoading, lineCount, setLineCount }}>
      {children}
    </GlobalContext.Provider>
  );
};
