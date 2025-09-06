import { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);
export const useSocket = () => useContext(SocketContext);

let globalSocket = null;

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(globalSocket);
  const [connected, setConnected] = useState(globalSocket?.connected || false);

  const initSocket = () => {
    if (!globalSocket || !globalSocket.connected) {
      globalSocket = io("http://localhost:3001", { transports: ["websocket"] });

      globalSocket.on("connect", () => {
        setConnected(true);
      });

      globalSocket.on("disconnect", (reason) => {
        setConnected(false);
      });

      setSocket(globalSocket);
    } else {
      setSocket(globalSocket);
      setConnected(globalSocket.connected);
    }
  };

  const waitForConnection = () =>
    new Promise((resolve) => {
      if (globalSocket?.connected) return resolve();
      const onConnect = () => {
        globalSocket.off("connect", onConnect);
        resolve();
      };
      globalSocket?.on("connect", onConnect);
    });

  const joinRoom = async (nickname) => {
    initSocket();
    await waitForConnection();
    return new Promise((resolve) => {
      if (!globalSocket) return resolve({ ok: false, error: "No socket" });
      globalSocket.emit("joinRoom", nickname, (res) => resolve(res));
    });
  };

  const leaveRoom = async () => {
    if (!globalSocket || !globalSocket.connected) return;
    return new Promise((resolve) => {
      globalSocket.emit("logout", () => {
        resolve();
      });
    });
  };

  return (
    <SocketContext.Provider value={{ socket, connected, joinRoom, leaveRoom }}>
      {children}
    </SocketContext.Provider>
  );
};