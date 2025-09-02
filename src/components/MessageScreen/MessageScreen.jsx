import styles from '@/components/MessageScreen/MessageScreen.module.css';
import { useEffect, useRef, useContext, useState } from 'react';
import { useSession } from '@/contexts/SessionContext';

export default function MessageScreen({ usersContext }) {
  const { messages } = useContext(usersContext);
  const { nickname } = useSession();
  const containerRef = useRef(null);

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