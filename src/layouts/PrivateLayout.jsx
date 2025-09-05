import NavbarChat from '@/components/NavbarChat/NavbarChat';
import NavbarGame from '@/components/NavbarGame/NavbarGame';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useSession } from '@/contexts/SessionContext';
import { RoomProvider } from "@/contexts/RoomContext";
import { useEffect, useState, useRef } from 'react';

const PrivateLayout = ({ navbarType }) => {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef(null);
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "pvp";
  const { logout } = useSession();

  useEffect(() => {
    if (navbarRef.current) setNavbarHeight(navbarRef.current.offsetHeight);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => logout();
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [logout]);

  if (navbarType === 'lobby') {
    return (
      <>
        <NavbarChat ref={navbarRef} />
        <div style={{ paddingTop: `${navbarHeight}px`, height: `calc(100vh - ${navbarHeight}px)` }}>
          <Outlet />
        </div>
      </>
    );
  }

  return (
    <RoomProvider mode={mode}>
      <NavbarGame ref={navbarRef} />
      <div style={{ paddingTop: `${navbarHeight}px`, height: `calc(100vh - ${navbarHeight}px)` }}>
        <Outlet />
      </div>
    </RoomProvider>
  );
};

export default PrivateLayout;