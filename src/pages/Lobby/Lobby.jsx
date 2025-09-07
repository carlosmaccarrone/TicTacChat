import MessageScreen from '@/components/MessageScreen/MessageScreen';
import MessageInput from '@/components/MessageInput/MessageInput';
import { useElementHeight } from '@/hooks/useElementHeight';
import { useChallenge } from '@/contexts/ChallengeContext';
import ChallengePopup from '@/pages/Lobby/ChallengePopup';
import UserList from '@/pages/Lobby/UserList/UserList';
import styles from '@/pages/Lobby/Lobby.module.css';
import { useUsers } from '@/contexts/UsersContext';
import { useState } from 'react';

export default function LobbyPage() {
  const { challenge, startChallenge, acceptChallenge, declineChallenge, cancelChallenge } = useChallenge();
  const [inputRef, inputHeight] = useElementHeight();
  const [collapsed, setCollapsed] = useState(false);
  const { messages, sendMessage } = useUsers();

  return (
    <div className={styles.container} style={{ "--input-height": `${inputHeight}px` }}>
      <div className={styles.userList}>
        <UserList 
          isCollapsed={collapsed} 
          setCollapsed={setCollapsed} 
          onChallenge={startChallenge} 
        />
      </div>
      <div className={styles.chatArea}>
        <div className={styles.messageScreen}>
          <MessageScreen messages={messages} />
        </div>
        <div className={styles.messageInput}>
          <MessageInput ref={inputRef} onSend={sendMessage} />
        </div>
      </div>
      {challenge && (
        <>
          <div className={styles.challengeOverlay}></div>
          <ChallengePopup
            from={challenge.from}
            to={challenge.to}
            onAccept={acceptChallenge}
            onCancel={cancelChallenge}
            onDecline={declineChallenge}
            countdown={challenge.countdown}
          />
        </>
      )}
    </div>
  );
}