import { createContext, useContext, useState, useEffect } from 'react';
import { useUsers } from '@/contexts/UsersContext';

export const SessionContext = createContext({});
export const useSession = () => useContext(SessionContext);

export function SessionProvider({ children }) {
  const [loginLoading, setLoginLoading] = useState(false);
  const { connectSocket, disconnectSocket } = useUsers();
  const [nickname, setNickname] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem('nickname');
    if (stored) setNickname(stored);
    setLoading(false);
  }, []);

  const login = async (name) => {
    setLoginLoading(true);
    setError('');
    try {
      const res = await connectSocket(name);
      if (!res.ok) {
        setError(res.error);
        return { ok: false, error: res.error };
      }
      sessionStorage.setItem('nickname', name);
      setNickname(name);
      return { ok: true };
    } catch (err) {
      const msg = err.message || 'Unexpected error';
      setError(msg);
      return { ok: false, error: msg };
    } finally {
      setLoginLoading(false);
    }
  };

  const logout = () => {
    disconnectSocket();
    sessionStorage.removeItem('nickname');
    setNickname(null);
    setError('');
  };

  return (
    <SessionContext.Provider
      value={{
        nickname,
        login,
        loginLoading,
        logout,
        loading,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
