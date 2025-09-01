/*import MessageScreen from '@/pages/ChatRoom/MessageScreen/MessageScreen';*/
/*import MessageInput from '@/pages/ChatRoom/MessageInput/MessageInput';*/
import styles from '@/pages/ChatRoom/ChatRoom.module.css';
import UserList from '@/pages/ChatRoom/UserList/UserList';
import { useUsers } from '@/contexts/UsersContext';
/*import PopUp from '@/pages/ChatRoom/PopUp/PopUp';*/

export default function ChatRoomPage() {
	const { users, loadingUsers } = useUsers();

  return (
    <div className={styles.container}>
      {/* User List */}
      <div className={styles.userList}>
        <UserList users={users} loadingUsers={loadingUsers} />
      </div>

      {/* Chat area */}
      <div className={styles.chatArea}>
{/*        <MessageScreen />
        <MessageInput />*/}
      </div>

      {/* PopUp para retos */}
{/*      <PopUp />*/}
    </div>
  );
}