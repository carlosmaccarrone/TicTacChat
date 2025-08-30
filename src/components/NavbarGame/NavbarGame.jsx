import NavbarTemplate from '@/components/NavbarTemplate/NavbarTemplate';
import { forwardRef } from 'react';

const NavbarGame = forwardRef((props, ref) => {
  return <NavbarTemplate ref={ref} centerSlot={null} rightSlot={null} />;
});

export default NavbarGame;