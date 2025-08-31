// UsersContext.jsx
import { createContext, useContext, useState, useRef } from 'react';
import { io } from 'socket.io-client';

export const UsersContext = createContext({});
export const useUsers = () => useContext(UsersContext);

export function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [nickname, setNickname] = useState(null);
  const [joined, setJoined] = useState(false);
  const socketRef = useRef(null);

  const connectSocket = (nick) => {
    setNickname(nick);
    if (!socketRef.current) {
      socketRef.current = io('http://localhost:3001', { autoConnect: false });

      socketRef.current.on('updateUserList', setUsers);
      socketRef.current.on('disconnect', () => setJoined(false));
      socketRef.current.on('kicked', () => {
        setNickname(null);
        setJoined(false);
        socketRef.current.disconnect();
        socketRef.current = null;
      });
    }

    return new Promise((resolve) => {
      const joinRoom = () => {
        socketRef.current.emit('joinRoom', nick, (res) => {
          setJoined(res.ok);
          if (!res.ok) setNickname(null);
          resolve(res);
        });
      };

      if (socketRef.current.connected) joinRoom();
      else {
        socketRef.current.connect();
        socketRef.current.once('connect', joinRoom);
      }
    });
  };

  const disconnectSocket = () => {
    if (!socketRef.current || !joined) return;
    socketRef.current.emit('leaveRoom', () => {
      setNickname(null);
      setUsers([]);
      setJoined(false);
      socketRef.current.disconnect();
      socketRef.current = null;
    });
  };

  return (
    <UsersContext.Provider value={{
      users, nickname, joined,
      addUserToSocket: connectSocket,
      removeUserFromSocket: disconnectSocket,
    }}>
      {children}
    </UsersContext.Provider>
  );
}
