import styles from '@/components/NavbarTemplate/NavbarTemplate.module.css';
import NavbarTemplate from '@/components/NavbarTemplate/NavbarTemplate';
import { useSession } from '@/contexts/SessionContext';
import { useNavigate } from 'react-router-dom';
import { forwardRef } from 'react';

const NavbarChat = forwardRef((props, ref) => {
  const { logout } = useSession();
  const navigate = useNavigate();

  const rightSlot = (
    <button className={styles.buttons} onClick={logout}>
      Logout
    </button>
  );

  const centerSlot = (
    <button 
      className={styles.buttons} 
      onClick={() => navigate('/gameplay?mode=cpu')}
    >
      vs CPU
    </button>
  );

  return <NavbarTemplate ref={ref} centerSlot={centerSlot} rightSlot={rightSlot} />;
});

export default NavbarChat;