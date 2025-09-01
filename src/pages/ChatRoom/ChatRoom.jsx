/*import MessageScreen from '@/pages/ChatRoom/MessageScreen/MessageScreen';*/
/*import MessageInput from '@/pages/ChatRoom/MessageInput/MessageInput';*/
import styles from '@/pages/ChatRoom/ChatRoom.module.css';
import UserList from '@/pages/ChatRoom/UserList/UserList';
/*import PopUp from '@/pages/ChatRoom/PopUp/PopUp';*/

export default function ChatRoomPage() {
  return (
    <div className={styles.container}>
      {/* User List */}
      <div className={styles.userList}>
        <UserList />
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