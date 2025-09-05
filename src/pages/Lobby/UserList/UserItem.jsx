import styles from '@/pages/Lobby/UserList/UserItem.module.css';
import { useState } from 'react';

const UserItem = ({ user, ownNickname }) => {
  const [waiting, setWaiting] = useState(false);

  const handleChallenge = () => {
    setWaiting(true);
    // Here I will integrate the logic of sending challenge to the backend
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
          {waiting ? "⏳" : "⚔️"}
        </span>
      )}
    </div>
  );
}

export default UserItem;