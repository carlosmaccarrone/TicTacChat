import { useState, useEffect } from 'react';
import styles from '@/pages/ChatRoom/UserList/UserList.module.css';

const UserList = ({ users = [], loadingUsers }) => {
  const [prevUsers, setPrevUsers] = useState([]);

  useEffect(() => {
    if (users.length > 0) {
      setPrevUsers(users); // guardar la última lista no vacía
    }
  }, [users]);

  const listToShow = users.length > 0 ? users : prevUsers;

  return (
    <div className={styles.container}>
      {loadingUsers && listToShow.length === 0 && (
        <div className={styles.placeholder}>Loading users...</div>
      )}

      {!loadingUsers && listToShow.length === 0 && (
        <div className={styles.placeholder}>No users connected</div>
      )}

      {listToShow.map((nickname) => (
        <div key={nickname} className={styles.userItem}>
          {nickname}
        </div>
      ))}
    </div>
  );
};

export default UserList;
