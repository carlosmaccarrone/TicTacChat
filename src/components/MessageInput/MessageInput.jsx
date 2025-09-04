import TextInputWithSend from "@/components/MessageInput/TextInputWithSend";
import styles from "@/components/MessageInput/MessageInput.module.css";
import EmojiPicker from "@/components/MessageInput/EmojiPicker";
import { useState, useRef, useEffect, forwardRef } from "react";
import { useUsers } from '@/contexts/UsersContext';

const MessageInput = forwardRef(({ onSend }, ref) => {
  const [message, setMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const { sendMessage } = useUsers();
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const handleSend = () => {
    if (message.trim() === "") return;
    sendMessage(message);
    setMessage("");
    setShowEmojis(false);
  };

  const handleEmojiClick = (emoji) => {
    setMessage((prev) => prev + emoji);
    setShowEmojis(false);

    if (inputRef.current) {
      inputRef.current.focus();
    }    
  };

  useEffect(() => {
    const handleClickOutside = (evt) => {
      if (containerRef.current && !containerRef.current.contains(evt.target)) {
        setShowEmojis(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.container}  ref={(el) => {
        containerRef.current = el;
        if (ref) ref.current = el;
      }}
    >
      <button
        className={styles.emojiButton}
        onClick={() => setShowEmojis((prev) => !prev)}
      >
        🙂
      </button>

      <div className={styles.inputWithSend}>
        <TextInputWithSend
          ref={inputRef}
          value={message}
          onChange={setMessage}
          onSend={handleSend}
          onFocus={() => setShowEmojis(false)}
        />
      </div>

      {showEmojis && (
        <EmojiPicker 
          onEmojiClick={handleEmojiClick} 
          onFocus={() => setShowEmojis(false)}
        />
      )}
    </div>
  );
});

export default MessageInput;