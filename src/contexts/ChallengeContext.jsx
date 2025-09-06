import { createContext, useContext, useState, useEffect } from 'react';
import { useSocket } from '@/contexts/SocketContext';
import { useNavigate } from 'react-router-dom';

export const ChallengeContext = createContext({});
export const useChallenge = () => useContext(ChallengeContext);

export const ChallengeProvider = ({ children }) => {
  const [challenge, setChallenge] = useState(null);
  const { socket, connected } = useSocket();  
  const navigate = useNavigate();
  const nickname = "pepito";

  useEffect(() => {
    if (!socket) return;

    const onReceived = ({ from }) => {
      console.log('Challenge received from:', from);
      setChallenge({ type: 'received', from, to: nickname, countdown: 10 });
    };

    const onResult = ({ accepted, from }) => {
      setChallenge(prev => {
        if (prev?.type === 'sent' && prev.to === from) {
          if (accepted) navigate('/gameplay?mode=pvp');
          return null;
        }
        return prev;
      });
    };

    socket.on('challenge:received', onReceived);
    socket.on('challenge:result', onResult);

    return () => {
      socket.off('challenge:received', onReceived);
      socket.off('challenge:result', onResult);
    };
  }, [socket, nickname, navigate]);

  // Countdown para challenge activo
  useEffect(() => {
    if (!challenge) return;

    if (challenge.countdown <= 0) {
      setChallenge(null);
      return;
    }

    const timer = setInterval(() => {
      setChallenge(prev => prev ? { ...prev, countdown: prev.countdown - 1 } : null);
    }, 1000);

    return () => clearInterval(timer);
  }, [challenge]);

  // Funciones para iniciar, aceptar o declinar challenge
  const startChallenge = (toNickname) => {
    console.log('⚔️ Sending challenge to:', toNickname); // log
    if (!socket) return;
    socket.emit('challenge:send', { toNickname }, (res) => {
      console.log('Challenge send response:', res); // log
      if (res.ok) {
        setChallenge({ type: 'sent', from: nickname, to: toNickname, countdown: 10 });
      } else {
        alert(res.error);
      }
    });
  };

  const acceptChallenge = () => {
    if (!socket || !challenge) return;
    socket.emit('challenge:response', { fromNickname: challenge.from, accepted: true });
    setChallenge(null);
  };

  const declineChallenge = () => {
    if (!socket || !challenge) return;
    socket.emit('challenge:response', { fromNickname: challenge.from, accepted: false });
    setChallenge(null);
  };

  return (
    <ChallengeContext.Provider value={{
      challenge,
      startChallenge,
      acceptChallenge,
      declineChallenge
    }}>
      {children}
    </ChallengeContext.Provider>
  );
};