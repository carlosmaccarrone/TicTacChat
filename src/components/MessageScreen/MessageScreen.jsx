import styles from '@/components/MessageScreen/MessageScreen.module.css';
import { useSession } from '@/contexts/SessionContext';
import { useUsers } from '@/contexts/UsersContext';
import { useEffect, useRef } from 'react';

export default function MessageScreen() {
  const { nickname } = useSession();
  const containerRef = useRef(null);
  const { messages } = useUsers();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.container} ref={containerRef}>
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`${styles.message} ${msg.from === nickname ? styles.own : ''}`}
        >
          {msg.from !== nickname && <div className={styles.sender}>{msg.from}</div>}
          <div className={styles.text}>{msg.text}</div>
        </div>
      ))}
    </div>
  );
}