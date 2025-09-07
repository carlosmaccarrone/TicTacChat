import templateStyles from '@/components/NavbarTemplate/NavbarTemplate.module.css';
import NavbarTemplate from '@/components/NavbarTemplate/NavbarTemplate';
import gameStyles from '@/components/NavbarGame/NavbarGame.module.css';
import { useNotifyDisconnect } from '@/hooks/useNotifyDisconnect'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRoomCPU } from '@/contexts/RoomContextCpu';
import { useRoomPVP } from '@/contexts/RoomContextPvp';
import { useSocket } from '@/contexts/SocketContext';
import { useEffect } from 'react';

const NavbarGame = ({ onMount }) => {
  const { socket } = useSocket();
  const notifyLeave = useNotifyDisconnect();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'pvp';  
  const roomCPU = useRoomCPU();
  const roomPVP = useRoomPVP();
  useEffect(() => {
    if (!socket) return;

    const onForceLobby = () => {
      navigate('/lobby');
    };

    socket.on('pvp:forceLobby', onForceLobby);
    return () => socket.off('pvp:forceLobby', onForceLobby);
  }, [socket, navigate]);

  const scores =
    mode === 'cpu'
      ? roomCPU?.scores ?? { me: 0, opponent: 0 }
      : roomPVP?.scores ?? { me: 0, opponent: 0 };
  
  return (
    <NavbarTemplate
      onMount={onMount}
      centerSlot={
        <span className={gameStyles.score}>
          Me: <span style={{color:"yellow"}}>{scores.me}</span> | Opponent: <span style={{color:"yellow"}}>{scores.opponent}</span>
        </span>
      }
      rightSlot={
        <button 
          className={templateStyles.buttons} 
          onClick={() => {
            notifyLeave(true);
            navigate('/lobby');
          }}
        >
          Lobby
        </button>
      }
    />
  );
};

export default NavbarGame;