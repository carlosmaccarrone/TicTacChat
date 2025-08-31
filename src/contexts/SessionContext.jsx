// SessionContext.jsx
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useUsers } from './UsersContext';

export const SessionContext = createContext({});
export const useSession = () => useContext(SessionContext);

export function SessionProvider({ children }) {
  const [nickname, setNickname] = useState(() => sessionStorage.getItem('nickname') || null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const { addUserToSocket, removeUserFromSocket } = useUsers();
  const bootedRef = useRef(false);

  const hasNickname = Boolean(nickname);

  useEffect(() => {
    if (bootedRef.current) return;
    bootedRef.current = true;

    const boot = async () => {
      if (!nickname) {
        setSessionLoading(false);
        return;
      }

      setSessionLoading(true);
      const res = await addUserToSocket(nickname);
      // si falla, solo resetea si hay error real
      if (!res.ok && res.error === 'nickname in use') {
        setNickname(null);
        sessionStorage.removeItem('nickname');
      }
      setSessionLoading(false);
    };
    boot();
  }, []);

  const login = async (name) => {
    const res = await addUserToSocket(name);
    if (res.ok) {
      setNickname(name);
      return { ok: true };
    } else {
      return { ok: false, error: res.error || 'Nickname already in use!' };
    }
  };

  const logout = async () => {
    if (nickname) {
      await removeUserFromSocket();
      setNickname(null);
    }
  };

  useEffect(() => {
    if (nickname) sessionStorage.setItem('nickname', nickname);
    else sessionStorage.removeItem('nickname');
  }, [nickname]);

  return (
    <SessionContext.Provider value={{
      nickname,
      hasNickname,
      sessionLoading,
      login,
      logout
    }}>
      {children}
    </SessionContext.Provider>
  );
}
