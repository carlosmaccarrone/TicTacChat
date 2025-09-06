import { createContext, useContext, useState, useEffect } from "react";
import { useSocket } from "@/contexts/SocketContext";

export const SessionContext = createContext({});
export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const { joinRoom, leaveRoom } = useSocket();
  const [nickname, setNickname] = useState(sessionStorage.getItem("nickname") || null);

  const login = async (name) => {
    const res = await joinRoom(name);
    if (res.ok) {
      sessionStorage.setItem("nickname", name);
      setNickname(name);
    }
    return res;
  };

  const logout = async () => {
    if (nickname) {
      await leaveRoom();
    }
    sessionStorage.removeItem("nickname");
    setNickname(null);
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      logout();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [logout]);

  return (
    <SessionContext.Provider value={{ nickname, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};