import { createContext, useContext, useState, useEffect } from 'react';
import { useSocket } from '@/contexts/SocketContext';

export const UsersContext = createContext({});
export const useUsers = () => useContext(UsersContext);

export function UsersProvider({ children }) {
  const { socket, connected } = useSocket();

  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(!connected);

  useEffect(() => {
    if (!socket || !connected) return;

    const handleUserList = (list) => {
      setUsers(list);
      setLoadingUsers(false);
    };

    const handleRecentMessages = (msgs) => setMessages([...msgs]);

    const handleNewMessage = (msg) => setMessages((prev) => [...prev, msg]);

    socket.on('updateUserList', handleUserList);
    socket.on('chat:recentMessages', handleRecentMessages);
    socket.on('chat:newMessage', handleNewMessage);

    socket.emit('requestUserList');
    socket.emit('requestRecentMessages');

    return () => {
      socket.off('updateUserList', handleUserList);
      socket.off('chat:recentMessages', handleRecentMessages);
      socket.off('chat:newMessage', handleNewMessage);
    };
  }, [socket, connected]);

  const sendMessage = (text) => {
    if (socket && connected && text.trim()) {
      socket.emit('chat:newMessage', text);
    }
  };

  return (
    <UsersContext.Provider value={{ users, loadingUsers, messages, sendMessage }}>
      {children}
    </UsersContext.Provider>
  );
}