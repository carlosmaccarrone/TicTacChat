import NavbarLobby from '@/components/NavbarLobby/NavbarLobby';
import NavbarGame from '@/components/NavbarGame/NavbarGame';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useSession } from '@/contexts/SessionContext';
import { RoomProvider } from "@/contexts/RoomContext";
import { useEffect, useState, useRef } from 'react';

const PrivateLayout = ({ navbarType }) => {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "pvp";
  const { logout } = useSession();

  useEffect(() => {
    const handleBeforeUnload = () => logout();
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [logout]);

  const handleNavbarMount = (height) => {
    setNavbarHeight(height);
  };

  if (navbarType === 'lobby') {
    return (
      <>
        <NavbarLobby onMount={handleNavbarMount} />
        <div style={{ paddingTop: `${navbarHeight}px`, height: `calc(100vh - ${navbarHeight}px)` }}>
          <Outlet />
        </div>
      </>
    );
  }

  return (
    <RoomProvider mode={mode}>
      <NavbarGame onMount={handleNavbarMount} />
      <Outlet context={{ navbarHeight }} />
    </RoomProvider>
  );
};

export default PrivateLayout;