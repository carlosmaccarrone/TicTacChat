import React, { createContext, useContext, useState, useEffect } from 'react';

export const SessionContext = createContext({});
export const useSession = () => useContext(SessionContext);

export function SessionProvider({ children }) {
  const [nickname, setNickname] = useState(() => sessionStorage.getItem('nickname') || null);
  const [sessionLoading , setSessionLoading ] = useState(false);

  const hasNickname = Boolean(nickname);

  useEffect(() => {
    if (nickname) {
      sessionStorage.setItem('nickname', nickname);
    } else {
      sessionStorage.removeItem('nickname');
    }
  }, [nickname]);

  const login = (name) => {
    if (!nickname) {
      setNickname(name);
    }
  };

  const logout = () => setNickname(null);

  return (
    <SessionContext.Provider value={{ nickname, hasNickname, sessionLoading, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
}