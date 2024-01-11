import { useCallback, useEffect, useRef, useState } from 'react';

const useGlobal = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lineCount, setLineCount] = useState(null);
  const [url, setUrl] = useState('');
  const [error, setError] = useState(null);
  const wsRef = useRef(null);

  const handleOpen = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.send(url);
    }
  }, [url]);

  const handleMessage = useCallback(
    (event) => {
      if (wsRef.current) {
        const receivedData = JSON.parse(event.data);
        if (receivedData.error) {
          setError(receivedData.error);
        } else {
          setData(receivedData.data || []);
          setLineCount(receivedData.lineCount || null);
        }
        wsRef.current.close();
        setLoading(false);
      }
    },
    [setData, setLineCount, setLoading]
  );

  const handleError = useCallback(
    (error) => {
      setError('Ошибка соединения с сервером');
      console.error('WebSocket Error:', error);
      setLoading(false);
    },
    [setLoading]
  );

  const handleShowButtonClick = useCallback(() => {
    setLoading(true);

    const ws = new WebSocket(process.env.REACT_APP_SERVER_SOCKET_URL);
    wsRef.current = ws;

    ws.onopen = handleOpen;
    ws.onmessage = handleMessage;
    ws.onerror = (error) => handleError(error);

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [handleOpen, handleMessage, handleError, setLoading]);

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return {
    url,
    setUrl,
    error,
    handleShowButtonClick,
    data,
    lineCount,
    loading,
  };
};

export default useGlobal;
