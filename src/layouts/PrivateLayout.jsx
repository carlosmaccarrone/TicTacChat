import NavbarChat from '@/components/NavbarChat/NavbarChat';
import NavbarGame from '@/components/NavbarGame/NavbarGame';
import { useSession } from '@/contexts/SessionContext';
import { useEffect, useState, useRef } from 'react';
import { Outlet } from 'react-router-dom';

const PrivateLayout = ({ navbarType }) => {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef(null);
  const { logout } = useSession();

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  }, []);

  const handleRefreshClick = () => {
    const confirmed = window.confirm("You'll be redirected to login. Continue?");
    if (confirmed) logout();
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      logout();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [logout]);

  return (
    <>
      {navbarType === 'chat' && <NavbarChat ref={navbarRef} />}
      {navbarType === 'game' && <NavbarGame ref={navbarRef} />}
      <div style={{ paddingTop: `${navbarHeight}px` }}>
        <Outlet />
      </div>
    </>
  );
};

export default PrivateLayout;