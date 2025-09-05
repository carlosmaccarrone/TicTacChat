import templateStyles from '@/components/NavbarTemplate/NavbarTemplate.module.css';
import NavbarTemplate from '@/components/NavbarTemplate/NavbarTemplate';
import gameStyles from '@/components/NavbarGame/NavbarGame.module.css';
import { useRoom } from "@/contexts/RoomContext";
import { useNavigate } from 'react-router-dom';

const NavbarGame = ({ onMount }) => {
  const navigate = useNavigate();
  const { scores } = useRoom();

  return (
    <NavbarTemplate
      onMount={onMount}
      centerSlot={
        <span className={gameStyles.score}>
          Me: {scores.me} | Opponent: {scores.opponent}
        </span>
      }
      rightSlot={
        <button className={templateStyles.buttons} onClick={() => navigate('/lobby')}>
          Lobby
        </button>
      }
    />
  );
};

export default NavbarGame;