import styles from '@/pages/ChatRoom/UserList/UserItem.module.css';
import { useState } from 'react';

const UserItem = ({ user, ownNickname }) => {
  const [waiting, setWaiting] = useState(false);

  const handleChallenge = () => {
    setWaiting(true);
    // Aquí mañana integraremos la lógica de enviar reto al backend
    console.log(`Challenged ${user.nickname}`);
  };

  const statusColor = user.status === 'idle' ? 'green' : 'red';

  return (
    <div className={styles.container}>
      <span className={styles.nickname} style={{ color: statusColor }}>
        👤 {user.nickname}
      </span>
      {user.nickname !== ownNickname && (
        <span
          className={styles.challenge}
          role="button"
          onClick={handleChallenge}
          title="Challenge"
        >
          ⚔️
        </span>
      )}
      {waiting && <span className={styles.waiting}>⏳</span>}
    </div>
  );
}

export default UserItem;