import { useRoomPVP } from '@/contexts/RoomContextPvp';
import { useSession } from '@/contexts/SessionContext';
import { useSocket } from '@/contexts/SocketContext';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

export const useNotifyDisconnect = () => {
  const { nickname } = useSession();
  const { socket } = useSocket();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "pvp";

  const notifyLeave = (voluntary = false) => {
    if (mode !== 'pvp' || !socket || !nickname) return;
    socket.emit('pvp:leaveRoom', { nickname, voluntary });
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!socket || !nickname) return;
      socket.emit('pvp:leaveRoom', { nickname, voluntary: false });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [socket, nickname]);

  return notifyLeave;
};