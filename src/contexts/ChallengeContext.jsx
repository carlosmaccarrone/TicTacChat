import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from '@/contexts/SessionContext';
import { useSocket } from '@/contexts/SocketContext';
import { useNavigate } from 'react-router-dom';

export const ChallengeContext = createContext({});
export const useChallenge = () => useContext(ChallengeContext);

export const ChallengeProvider = ({ children }) => {
  const [challenge, setChallenge] = useState(null);
  const { nickname } = useSession();
  const { socket } = useSocket();  
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket || !nickname) return;

    const onReceived = ({ from, to }) => {
      setChallenge({ type: 'received', from, to, countdown: 10 });
    };

    const onResult = ({ accepted, from }) => {
      setChallenge(prev => {
        if (prev?.type === 'sent' && prev.to === from) return null;
        return prev;
      });

      if (accepted) {
        navigate('/gameplay?mode=pvp');
      }
    };

    socket.on('challenge:received', onReceived);
    socket.on('challenge:result', onResult);

    return () => {
      socket.off('challenge:received', onReceived);
      socket.off('challenge:result', onResult);
    };
  }, [socket, nickname, navigate]);

  useEffect(() => {
    if (!socket) return;

    const onPvpStart = () => {
      navigate('/gameplay?mode=pvp');
    };

    socket.on('pvp:start', onPvpStart);
    return () => socket.off('pvp:start', onPvpStart);
  }, [socket, navigate]);

  useEffect(() => {
    if (!socket) return;

    const onCancelled = ({ from }) => {
      if (challenge && (challenge.from === from || challenge.to === from)) {
        setChallenge(null);
      }
    };

    socket.on('challenge:cancelled', onCancelled);

    return () => {
      socket.off('challenge:cancelled', onCancelled);
    };
  }, [socket, challenge]);

  // Countdown for active challenge
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

  // Functions to start, accept or decline challenge
  const startChallenge = (toNickname) => {
    if (!socket) return;
    socket.emit('challenge:send', { toNickname }, (res) => {
      if (res.ok) {
        setChallenge({ type: 'sent', from: nickname, to: toNickname, countdown: 10 });
      }
    });
  };

  const acceptChallenge = () => {
    if (!socket || !challenge) return;
    socket.emit('challenge:response', { fromNickname: challenge.from, accepted: true });
    navigate('/gameplay?mode=pvp');
    setChallenge(null);
  };

  const respondChallenge = (targetNickname) => {
    if (!socket || !challenge) return;
    socket.emit('challenge:response', { fromNickname: targetNickname, accepted: false });
    setChallenge(null);
  };

  const cancelChallenge = () => {
    if (nickname !== challenge?.from) return;
    respondChallenge(challenge.from);
  };

  const declineChallenge = () => {
    if (nickname !== challenge?.to) return;
    respondChallenge(challenge.from);
  };

  return (
    <ChallengeContext.Provider 
      value={{ challenge, startChallenge, acceptChallenge, cancelChallenge, declineChallenge }}>
      {children}
    </ChallengeContext.Provider>
  );
};