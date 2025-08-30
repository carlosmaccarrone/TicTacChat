import NavbarChat from '@/components/NavbarChat/NavbarChat';
import NavbarGame from '@/components/NavbarGame/NavbarGame';
import { useEffect, useState, useRef } from 'react';
import { Outlet } from 'react-router-dom';

const PrivateLayout = ({ navbarType }) => {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef(null);

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  }, []);

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