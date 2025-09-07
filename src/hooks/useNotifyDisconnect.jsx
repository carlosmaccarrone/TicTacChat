import { useRoomPVP } from '@/contexts/RoomContextPvp';
import { useSocket } from '@/contexts/SocketContext';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export const useNotifyDisconnect = () => {
  const { socket } = useSocket();
  const roomPVP = useRoomPVP();
  const mySymbolRef = useRef(roomPVP?.mySymbol);
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "pvp";

  useEffect(() => {
    mySymbolRef.current = roomPVP?.mySymbol;
  }, [roomPVP?.mySymbol]);

  const notifyLeave = () => {
    if (mode !== 'pvp' || !socket || !mySymbolRef.current) return;
    socket.emit('pvp:leaveRoom', { symbol: mySymbolRef.current });
  };

  useEffect(() => {
    window.addEventListener('beforeunload', notifyLeave);
    return () => {
      notifyLeave();
      window.removeEventListener('beforeunload', notifyLeave);
    };
  }, [socket, mode]);

  return notifyLeave;
};