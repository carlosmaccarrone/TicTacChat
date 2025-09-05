import MessageScreen from '@/components/MessageScreen/MessageScreen';
import MessageInput from '@/components/MessageInput/MessageInput';
import { useElementHeight } from "@/hooks/useElementHeight";
import UserList from '@/pages/Lobby/UserList/UserList';
import { UsersContext } from '@/contexts/UsersContext';
import styles from '@/pages/Lobby/Lobby.module.css';
import { useState } from 'react';

export default function LobbyPage() {
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