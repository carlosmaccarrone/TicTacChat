import templateStyles from '@/components/NavbarTemplate/NavbarTemplate.module.css';
import NavbarTemplate from '@/components/NavbarTemplate/NavbarTemplate';
import gameStyles from '@/components/NavbarGame/NavbarGame.module.css';
import { useNavigate } from 'react-router-dom';
import { forwardRef } from 'react';

const NavbarGame = forwardRef((props, ref) => {
  const navigate = useNavigate();
  
  const rightSlot = (
    <button 
      className={templateStyles.buttons} 
      onClick={() => navigate('/chatroom')}
    >
      Lobby
    </button>
  );

  const centerSlot = (
    <span className={gameStyles.score}>
      Me: 999 | Opponent: 999
    </span>
  );

  return <NavbarTemplate ref={ref} centerSlot={centerSlot} rightSlot={rightSlot} />;
});

export default NavbarGame;