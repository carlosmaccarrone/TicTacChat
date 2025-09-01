import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useUsers } from './UsersContext';

export const SessionContext = createContext({});
export const useSession = () => useContext(SessionContext);

export function SessionProvider({ children }) {
  const [sessionLoading, setSessionLoading] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false);
  const { connectSocket, disconnectSocket } = useUsers();
  const [nickname, setNickname] = useState(null);
  const [error, setError] = useState('');

  const hasNickname = Boolean(nickname);

  useEffect(() => {
    const stored = sessionStorage.getItem('nickname');
    if (stored) setNickname(stored);
  }, []);

  const resetSession = useCallback(() => {
    setNickname(null);
    sessionStorage.removeItem('nickname');
    setError('');
    setLoginAttempted(false);
  }, []);

  const login = async (name) => {
    setLoginAttempted(true);
    setSessionLoading(true);
    setError('');

    try {
      const res = await connectSocket(name);

      if (!res.ok) {
        setError(res.error);
        return res;
      }

      setNickname(name);
      sessionStorage.setItem('nickname', name);
      return { ok: true };
    } catch (err) {
      const msg = err.message || 'Unexpected error';
      setError(msg);
      return { ok: false, error: msg };
    } finally {
      setSessionLoading(false);
    }
  };

  const logout = () => {
    disconnectSocket();
    resetSession();
  };

  return (
    <SessionContext.Provider
      value={{ nickname, hasNickname, sessionLoading, loginAttempted, login, logout, error, setError }}>
      {children}
    </SessionContext.Provider>
  );
}