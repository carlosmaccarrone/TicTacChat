import styles from '@/pages/ChatRoom/UserList/UserList.module.css';
import UserItem from '@/pages/ChatRoom/UserList/UserItem';
import { useSession } from '@/contexts/SessionContext';
import { useUsers } from '@/contexts/UsersContext';

const mockUsers = [
  { nickname: 'charly', status: 'idle' },
  { nickname: 'pepe', status: 'idle' },
  { nickname: 'ana', status: 'busy' },
  { nickname: 'luis', status: 'idle' },
  { nickname: 'maria', status: 'busy' },
  { nickname: 'jose', status: 'idle' },
  { nickname: 'laura', status: 'idle' },
  { nickname: 'carlos', status: 'busy' },
  { nickname: 'sofia', status: 'idle' },
  { nickname: 'martin', status: 'idle' },
  { nickname: 'veronica', status: 'busy' },
  { nickname: 'daniel', status: 'idle' },
  { nickname: 'julieta', status: 'idle' },
  { nickname: 'fernando', status: 'busy' },
  { nickname: 'gabriela', status: 'idle' },
  { nickname: 'roberto', status: 'idle' },
  { nickname: 'silvia', status: 'busy' },
  { nickname: 'pablo', status: 'idle' },
  { nickname: 'laura2', status: 'idle' },
  { nickname: 'andres', status: 'busy' },
  { nickname: 'monica', status: 'idle' },
  { nickname: 'jorge', status: 'idle' },
  { nickname: 'valeria', status: 'busy' },
  { nickname: 'diego', status: 'idle' },
  { nickname: 'carolina', status: 'idle' },
  { nickname: 'ricardo', status: 'busy' },
  { nickname: 'cristina', status: 'idle' },
  { nickname: 'miguel', status: 'idle' },
  { nickname: 'soledad', status: 'busy' },
  { nickname: 'esteban', status: 'idle' },
];

const UserList = ({ isCollapsed, setCollapsed }) => {
  const { nickname: ownNickname } = useSession();
  const { users, loadingUsers } = useUsers();
  const userCount = users.length;

  return (
    <>
      <div className={`${styles.userCount} ${isCollapsed ? styles.collapsed : ''}`}>
        {!isCollapsed && (
          <>
            {userCount} {userCount === 1 ? 'user' : 'users'} online
          </>
        )}
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

            {mockUsers.map((user) => (
              <UserItem
                key={user.nickname}
                user={user}
                ownNickname={ownNickname}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default UserList;