import { createContext, useContext, useState, useRef } from 'react';
import { io } from 'socket.io-client';

export const UsersContext = createContext({});
export const useUsers = () => useContext(UsersContext);

export function UsersProvider({ children }) {
  const [nickname, setNickname] = useState(null);
  const [joined, setJoined] = useState(false);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const socketRef = useRef(null);
  const nicknameRef = useRef(nickname);
  const joinedRef = useRef(joined);
  const retryTimeoutRef = useRef(null);

  const setNicknameSafe = (nick) => {
    nicknameRef.current = nick;
    setNickname(nick);
  };
  const setJoinedSafe = (val) => {
    joinedRef.current = val;
    setJoined(val);
  };

  const connectSocket = (nick) => {
    setNicknameSafe(nick);
    setLoadingUsers(true);

    if (!socketRef.current) {
      socketRef.current = io('http://localhost:3001', { autoConnect: false, reconnection: true });

      socketRef.current.on('updateUserList', (list) => {
        clearTimeout(retryTimeoutRef.current); // cancelamos cualquier reintento
        setUsers(list);
        setLoadingUsers(false);
      });

      socketRef.current.on('disconnect', () => setJoinedSafe(false));

      socketRef.current.on('kicked', () => {
        setNicknameSafe(null);
        setJoinedSafe(false);
        socketRef.current.disconnect();
        socketRef.current = null;
      });
    }

    return new Promise((resolve) => {
      const joinRoom = () => {
        socketRef.current.emit('joinRoom', nick, (res) => {
          setJoinedSafe(res.ok);
          if (!res.ok) setNicknameSafe(null);

          // Si la lista de usuarios no llega en 500ms, reintentamos
          if (res.ok && (!socketRef.current || !socketRef.current.connected)) return;
          retryTimeoutRef.current = setTimeout(() => {
            socketRef.current.emit('joinRoom', nick, () => {});
          }, 500);

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
    clearTimeout(retryTimeoutRef.current);
    if (!socketRef.current || !joinedRef.current) return;
    socketRef.current.emit('leaveRoom', () => {
      setNicknameSafe(null);
      setUsers([]);
      setJoinedSafe(false);
      setLoadingUsers(false);
      socketRef.current.disconnect();
      socketRef.current = null;
    });
  };

  return (
    <UsersContext.Provider value={{
      users,
      nickname,
      joined,
      loadingUsers,
      addUserToSocket: connectSocket,
      removeUserFromSocket: disconnectSocket,
    }}>
      {children}
    </UsersContext.Provider>
  );
}
