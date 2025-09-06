import styles from '@/pages/Lobby/UserList/UserItem.module.css';

const UserItem = ({ user, ownNickname, onChallenge }) => {
  const statusColor = user.status === 'idle' ? 'green' : 'red';
  const showChallenge = user.nickname !== ownNickname && user.status === 'idle';

  return (
    <div className={styles.container}>
      <span className={styles.nickname} style={{ color: statusColor }}>
        👤 {user.nickname}
      </span>

      {showChallenge && (
        <span
          className={styles.challenge}
          role="button"
          onClick={() => onChallenge(user.nickname)}
          title="Challenge"
        >
          ⚔️
        </span>
      )}
    </div>
  );
};

export default UserItem;