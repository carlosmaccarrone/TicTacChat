import styles from '@/components/NavbarTemplate/NavbarTemplate.module.css';
import { useEffect, useRef } from 'react';

const NavbarTemplate = ({ centerSlot, rightSlot, onMount }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (onMount && ref.current) {
      onMount(ref.current.offsetHeight);
    }
  }, [onMount]);

  return (
    <nav ref={ref} className={styles.navbar}>
      <div className={styles.left}>
        <span className={styles.title}>Tic-Tac-Toe</span>
        <span className={styles.subtitle}>by Carlos Maccarrone</span>
      </div>
      <div className={styles.center}>{centerSlot}</div>
      <div className={styles.right}>{rightSlot}</div>
    </nav>
  );
};

export default NavbarTemplate;