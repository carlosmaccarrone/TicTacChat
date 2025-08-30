import styles from '@/components/Spinner/Spinner.module.css';
import { useState, useEffect } from 'react';

const Spinner = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + '.' : ''));
    }, 250);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <div role="status">Loading{dots}</div>
    </div>
  );
}

export default Spinner;