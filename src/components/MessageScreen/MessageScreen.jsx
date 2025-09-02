import styles from '@/components/MessageScreen/MessageScreen.module.css';
import { useEffect, useRef } from 'react';

const mockMessages = [
  { id: 1, sender: 'charly', text: 'Hola, cómo estás?', own: true },
  { id: 2, sender: 'ana', text: 'Bien, ¿y vos?', own: false },
  { id: 3, sender: 'charly', text: 'Todo tranquilo 😎', own: true },
  { id: 4, sender: 'esteban', text: 'Chicos, llego tarde hoy', own: false },
  { id: 1, sender: 'charly', text: 'Hola, cómo estás?', own: true },
  { id: 2, sender: 'ana', text: 'Bien, ¿y vos?', own: false },
  { id: 3, sender: 'charly', text: 'Todo tranquilo 😎', own: true },
  { id: 4, sender: 'esteban', text: 'Chicos, llego tarde hoy', own: false },
  { id: 1, sender: 'charly', text: 'Hola, cómo estás?', own: true },
  { id: 2, sender: 'ana', text: 'Bien, ¿y vos?', own: false },
  { id: 3, sender: 'charly', text: 'Todo tranquilo 😎', own: true },
  { id: 4, sender: 'esteban', text: 'Chicos, llego tarde hoy', own: false },
  { id: 1, sender: 'charly', text: 'Hola, cómo estás?', own: true },
  { id: 2, sender: 'ana', text: 'Bien, ¿y vos?', own: false },
  { id: 3, sender: 'charly', text: 'Todo tranquilo 😎', own: true },
  { id: 4, sender: 'esteban', text: 'Chicos, llego tarde hoy', own: false },
  { id: 1, sender: 'charly', text: 'Hola, cómo estás?', own: true },
  { id: 2, sender: 'ana', text: 'Bien, ¿y vos?', own: false },
  { id: 3, sender: 'charly', text: 'Todo tranquilo 😎', own: true },
  { id: 4, sender: 'esteban', text: 'Chicos, llego tarde hoy', own: false },
  { id: 1, sender: 'charly', text: 'Hola, cómo estás?', own: true },
  { id: 2, sender: 'ana', text: 'Bien, ¿y vos?', own: false },
  { id: 3, sender: 'charly', text: 'Todo tranquilo 😎', own: true },
  { id: 4, sender: 'esteban', text: 'Chicos, llego tarde hoy', own: false },
  { id: 4, sender: 'esteban', text: 'pepito', own: false }         
];

export default function MessageScreen() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      {mockMessages.map(msg => (
        <div
          key={msg.id}
          className={`${styles.message} ${msg.own ? styles.own : ''}`}
        >
          {!msg.own && <div className={styles.sender}>{msg.sender}</div>}
          <div className={styles.text}>{msg.text}</div>
        </div>
      ))}
    </div>
  );
}