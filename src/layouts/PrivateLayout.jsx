import { ChallengeProvider } from "@/contexts/ChallengeContext";
import NavbarLobby from '@/components/NavbarLobby/NavbarLobby';
import NavbarGame from '@/components/NavbarGame/NavbarGame';
import { RoomProviderCPU } from "@/contexts/RoomContextCpu";
import { RoomProviderPVP } from "@/contexts/RoomContextPvp";
import { UsersProvider } from '@/contexts/UsersContext';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

const PrivateLayout = ({ navbarType }) => {
  const [navbarHeight, setNavbarHeight] = useState(0);

  const handleNavbarMount = (height) => setNavbarHeight(height);

  return (
    <UsersProvider>
      <ChallengeProvider>
        <RoomProviderCPU>
          <RoomProviderPVP>
            {navbarType === 'lobby' ? (
              <>
                <NavbarLobby onMount={handleNavbarMount} />
                <div style={{ paddingTop: `${navbarHeight}px`, height: `calc(100vh - ${navbarHeight}px)` }}>
                  <Outlet />
                </div>
              </>
            ) : (
              <>
                <NavbarGame onMount={handleNavbarMount} />
                <Outlet context={{ navbarHeight }} />
              </>
            )}
          </RoomProviderPVP>
        </RoomProviderCPU>
      </ChallengeProvider>
    </UsersProvider>
  );
};

export default PrivateLayout;