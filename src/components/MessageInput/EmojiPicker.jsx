import styles from "@/components/MessageInput/EmojiPicker.module.css";

const EmojiPicker = ({ onEmojiClick }) => {
  const emojis = ["😀", "😂", "😍", "😎", "🤔", "😭", "🔥", "👍", "😡", "❤️", "😮", "😢"];

  return (
    <div className={styles.emojiPicker}>
      {emojis.map((emoji) => (
        <span
          key={emoji}
          className={styles.emoji}
          onClick={() => onEmojiClick(emoji)}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
}

export default EmojiPicker;