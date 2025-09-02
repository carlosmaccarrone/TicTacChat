import MessageScreen from '@/components/MessageScreen/MessageScreen';
import MessageInput from '@/components/MessageInput/MessageInput';
import { useElementHeight } from "@/hooks/useElementHeight";
import styles from '@/pages/ChatRoom/ChatRoom.module.css';
import UserList from '@/pages/ChatRoom/UserList/UserList';
import { UsersContext } from '@/contexts/UsersContext';
import { useState } from 'react';

export default function ChatRoomPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [inputRef, inputHeight] = useElementHeight();

  return (
    <div className={styles.container} style={{ "--input-height": `${inputHeight}px` }}>
      <div className={styles.userList}>
        <UserList isCollapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
      <div className={styles.chatArea}>
        <div className={styles.messageScreen}>
          <MessageScreen usersContext={UsersContext} />
        </div>
        <div className={styles.messageInput}>
          <MessageInput ref={inputRef} />
        </div>
      </div>
    </div>
  );
}