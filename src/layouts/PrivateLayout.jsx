import { ChallengeProvider } from "@/contexts/ChallengeContext";
import NavbarLobby from '@/components/NavbarLobby/NavbarLobby';
import NavbarGame from '@/components/NavbarGame/NavbarGame';
import { Outlet, useSearchParams } from 'react-router-dom';
import { UsersProvider } from '@/contexts/UsersContext';
import { RoomProvider } from "@/contexts/RoomContext";
import { useState } from 'react';

const PrivateLayout = ({ navbarType }) => {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "pvp";

  const handleNavbarMount = (height) => setNavbarHeight(height);

  if (navbarType === 'lobby') {
    return (
      <>
        <UsersProvider>
          <ChallengeProvider>
            <NavbarLobby onMount={handleNavbarMount} />
            <div style={{ paddingTop: `${navbarHeight}px`, height: `calc(100vh - ${navbarHeight}px)` }}>
              <Outlet />
            </div>
          </ChallengeProvider>
        </UsersProvider>
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