import styles from '@/pages/Lobby/UserList/UserList.module.css';
import UserItem from '@/pages/Lobby/UserList/UserItem';
import { useSession } from '@/contexts/SessionContext';
import { useUsers } from '@/contexts/UsersContext';

const UserList = ({ isCollapsed, setCollapsed, onChallenge }) => {
  const { nickname: ownNickname } = useSession();
  const { users, loadingUsers } = useUsers();
  const userCount = users.length;

  return (
    <>
      <div className={`${styles.title} ${isCollapsed ? styles.collapsed : ''}`}>
        <span className={`${styles.userCount} ${isCollapsed ? styles.collapsed : ''}`}>
          {!isCollapsed && (
            <>
              {userCount} {userCount === 1 ? 'user' : 'users'} online
            </>
          )}
        </span>
        <button
          className={styles.collapseButton} 
          onClick={() => setCollapsed(!isCollapsed)}
        >
          {isCollapsed ? '▶️' : '◀️'}
        </button>
      </div>
      <div className={`${styles.container} ${isCollapsed ? styles.collapsed : ''}`}>
        {!isCollapsed && (
          <>
            {loadingUsers && users.length === 0 && (
              <div className={styles.placeholder}>Loading users...</div>
            )}

            {users.map((user) => (
              <UserItem
                key={user.nickname}
                user={user}
                ownNickname={ownNickname}
                onChallenge={onChallenge}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default UserList;