import { useCallback, useContext, useState } from 'react';
import { GlobalContext } from 'providers/Global';

export const useInput = () => {
  const { setData, setLineCount, setLoading } = useContext(GlobalContext);
  const [url, setUrl] = useState('');
  const [error, setError] = useState(null);

  const handleShowButtonClick = useCallback(() => {
    setLoading(true);
    const ws = new WebSocket(process.env.REACT_APP_SERVER_SOCKET_URL);

    ws.onopen = () => {
      ws.send(url);
    };

    ws.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      if (receivedData.error) {
        setError(receivedData.error);
      } else {
        setData(receivedData.data || []);
        setLineCount(receivedData.lineCount || null);
      }
      ws.close();
      setLoading(false);
    };

    ws.onerror = (error) => {
      setError('Ошибка соединения с сервером');
      console.error('WebSocket Error:', error);
      setLoading(false);
    };
  }, [setData, setLineCount, setLoading, url]);

  return {
    url,
    setUrl,
    error,
    handleShowButtonClick,
  };
};
