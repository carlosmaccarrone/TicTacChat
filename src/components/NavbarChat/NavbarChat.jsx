import NavbarTemplate from '@/components/NavbarTemplate/NavbarTemplate';
import styles from '@/components/NavbarChat/NavbarChat.module.css';
import { useSession } from '@/contexts/SessionContext';
import { forwardRef } from 'react';

const NavbarChat = forwardRef((props, ref) => {
  const { logout } = useSession();

  const rightSlot = (
    <button className={styles.logoutButton} onClick={logout}>
      Logout
    </button>
  );

  return <NavbarTemplate ref={ref} centerSlot={null} rightSlot={rightSlot} />;
});

export default NavbarChat;