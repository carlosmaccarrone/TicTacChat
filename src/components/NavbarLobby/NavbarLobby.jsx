import styles from '@/components/NavbarTemplate/NavbarTemplate.module.css';
import NavbarTemplate from '@/components/NavbarTemplate/NavbarTemplate';
import { useSession } from '@/contexts/SessionContext';
import { useNavigate } from 'react-router-dom';

const NavbarLobby = ({ onMount }) => {
  const { logout } = useSession();
  const navigate = useNavigate();

  const rightSlot = (
    <button className={styles.buttons} onClick={logout}>
      Logout
    </button>
  );

  const centerSlot = (
    <button className={styles.buttons} onClick={() => navigate('/gameplay?mode=cpu')}>
      vs CPU
    </button>
  );

  return <NavbarTemplate onMount={onMount} centerSlot={centerSlot} rightSlot={rightSlot} />;
};

export default NavbarLobby;