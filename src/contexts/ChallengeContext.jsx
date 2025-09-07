import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useSession } from "@/contexts/SessionContext";
import { useSocket } from "@/contexts/SocketContext";
import { useNavigate } from "react-router-dom";

export const ChallengeContext = createContext({});
export const useChallenge = () => useContext(ChallengeContext);

export const ChallengeProvider = ({ children }) => {
  const [challenge, setChallenge] = useState(null);
  const { nickname } = useSession();
  const { socket } = useSocket();
  const navigate = useNavigate();

  // --- Emit actions ---
  const startChallenge = useCallback((to) => {
    if (!socket) return;
    socket.emit('challenge:send', { toNickname: to }, (res) => {
      if (res.ok) setChallenge({ type: 'sent', from: nickname, to });
    });
  }, [socket, nickname]);

  const acceptChallenge = useCallback(() => {
    if (!socket || !challenge) return;
    socket.emit('challenge:response', { accepted: true });
    setChallenge(null);
  }, [socket, challenge]);

  const declineChallenge = useCallback(() => {
    if (!socket || !challenge) return;
    socket.emit('challenge:response', { accepted: false });
    setChallenge(null);
  }, [socket, challenge]);

  const cancelChallenge = useCallback(() => {
    if (!socket || !challenge) return;
    socket.emit('challenge:response', { accepted: false });
    setChallenge(null);
  }, [socket, challenge]);

  // --- Socket listeners ---
  useEffect(() => {
    if (!socket) return;

    const onReceived = ({ from, to }) => {
      setChallenge({ type: 'received', from, to });
    };

    const onClosed = ({ reason, by }) => {
      setChallenge(null);
    };

    const onPvpStart = ({ board, turn, mySymbol, opponent }) => {
      setChallenge(null);
      navigate('/gameplay?mode=pvp');
    };

    socket.on('challenge:received', onReceived);
    socket.on('challenge:closed', onClosed);
    socket.on('pvp:start', onPvpStart);

    return () => {
      socket.off('challenge:received', onReceived);
      socket.off('challenge:closed', onClosed);
      socket.off('pvp:start', onPvpStart);
    };
  }, [socket, navigate]);

  return (
    <ChallengeContext.Provider value={{
      challenge,
      startChallenge,
      acceptChallenge,
      declineChallenge,
      cancelChallenge
    }}>
      {children}
    </ChallengeContext.Provider>
  );
};