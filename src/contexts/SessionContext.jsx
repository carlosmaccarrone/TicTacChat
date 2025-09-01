import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useUsers } from '@/contexts/UsersContext';

export const SessionContext = createContext({});
export const useSession = () => useContext(SessionContext);

export function SessionProvider({ children }) {
  const { connectSocket, disconnectSocket } = useUsers();

  const [sessionState, setSessionState] = useState({
    nickname: null,
    sessionLoading: false,
    loginAttempted: false,
    error: '',
  });

  const hasNickname = Boolean(sessionState.nickname);

  useEffect(() => {
    const stored = sessionStorage.getItem('nickname');
    if (stored) setSessionState(prev => ({ ...prev, nickname: stored }));
  }, []);

  const resetSession = useCallback(() => {
    setSessionState({
      nickname: null,
      sessionLoading: false,
      loginAttempted: false,
      error: '',
    });
    sessionStorage.removeItem('nickname');
  }, []);

  const login = async (name) => {
    setSessionState(prev => ({ ...prev, loginAttempted: true, sessionLoading: true, error: '' }));

    try {
      const res = await connectSocket(name);

      if (!res.ok) {
        setSessionState(prev => ({ ...prev, error: res.error }));
        return res;
      }

      sessionStorage.setItem('nickname', name);
      setSessionState(prev => ({ ...prev, nickname: name }));
      return { ok: true };
    } catch (err) {
      const msg = err.message || 'Unexpected error';
      setSessionState(prev => ({ ...prev, error: msg }));
      return { ok: false, error: msg };
    } finally {
      setSessionState(prev => ({ ...prev, sessionLoading: false }));
    }
  };

  const logout = () => {
    disconnectSocket();
    resetSession();
  };

  return (
    <SessionContext.Provider
      value={{
        ...sessionState,
        hasNickname,
        login,
        logout,
        setError: (error) => setSessionState(prev => ({ ...prev, error })),
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}