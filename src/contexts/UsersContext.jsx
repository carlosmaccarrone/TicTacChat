import { createContext, useContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';

export const UsersContext = createContext({});
export const useUsers = () => useContext(UsersContext);

export function UsersProvider({ children }) {
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [users, setUsers] = useState([]);
  const socketRef = useRef(null);

  const connectSocket = (nickname) => {
    return new Promise((resolve) => {
      try {
        if (socketRef.current) {
          socketRef.current.disconnect();
          socketRef.current = null;
          setUsers([]);
          setLoadingUsers(true);
        }

        socketRef.current = io('http://localhost:3001', {
          transports: ['websocket'],
        });

        socketRef.current.on('updateUserList', (list) => {
          setUsers(list);
          setLoadingUsers(false);
        });

        socketRef.current.on('connect', () => {
          socketRef.current.emit('joinRoom', nickname, (res) => {
            resolve(res || { ok: false, error: 'No response from server' });
          });
        });

        socketRef.current.on('disconnect', (reason) => {
          setUsers([]);
          setLoadingUsers(true);
          console.log('Socket disconnected:', reason);
        });
      } catch (err) {
        resolve({ ok: false, error: err.message || 'Socket connection failed' });
      }
    });
  };

  const disconnectSocket = () => {
    if (socketRef.current) {
      socketRef.current.emit('forceDisconnect', () => {});
      socketRef.current.disconnect();
      socketRef.current = null;
      setUsers([]);
      setLoadingUsers(true);
    }
  };

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.off();
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  return (
    <UsersContext.Provider value={{ users, loadingUsers, connectSocket, disconnectSocket }}>
      {children}
    </UsersContext.Provider>
  );
}