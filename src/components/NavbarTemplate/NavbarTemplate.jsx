import styles from '@/components/NavbarTemplate/NavbarTemplate.module.css';
import { forwardRef } from 'react';

const NavbarTemplate = forwardRef(({ centerSlot, rightSlot }, ref) => {
  return (
    <nav ref={ref} className={styles.navbar}>
      <div data-role="navbar-brand" className={styles.left}>
        <span className={styles.title}>Tic-Tac-Toe</span>
        <span className={styles.subtitle}>by Carlos Maccarrone</span>
      </div>
      <div className={styles.center}>{centerSlot}</div>
      <div className={styles.right}>{rightSlot}</div>
    </nav>
  );
});

export default NavbarTemplate;