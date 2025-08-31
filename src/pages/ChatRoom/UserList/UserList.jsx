import styles from '@/pages/ChatRoom/UserList/UserList.module.css';

const UserList = ({ users = [], loadingUsers }) => {
  return (
    <div className={styles.container}>
      {loadingUsers && users.length === 0 && (
        <div className={styles.placeholder}>Loading users...</div>
      )}

      {!loadingUsers && users.length === 0 && (
        <div className={styles.placeholder}>No users connected</div>
      )}

      {users.map((nickname) => (
        <div key={nickname} className={styles.userItem}>
          {nickname}
        </div>
      ))}
    </div>
  );
};

export default UserList;
