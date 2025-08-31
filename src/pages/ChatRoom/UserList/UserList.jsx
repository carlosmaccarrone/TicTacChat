import styles from '@/pages/ChatRoom/UserList/UserList.module.css';

const UserList = ({ users = [], loadingUsers }) => {
  const list = Array.isArray(users) ? users : [];

  return (
    <div className={styles.container}>
      {loadingUsers && <div className={styles.placeholder}>Loading users...</div>}

      {!loadingUsers && list.length === 0 && (
        <div className={styles.placeholder}>No users connected</div>
      )}

      {!loadingUsers &&
        list.map((nickname) => (
          <div key={nickname} className={styles.userItem}>
            {nickname}
          </div>
        ))}
    </div>
  );
};

export default UserList;
