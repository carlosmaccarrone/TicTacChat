import styles from "@/components/MessageInput/TextInputWithSend.module.css";

const TextInputWithSend = ({ value, onChange, onSend, onFocus }) => {
  const handleKeyDown = (evt) => {
    if (evt.key === "Enter") {
      onSend?.();
    }
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={(evt) => onChange(evt.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        placeholder="Type a message..."
      />
      <button className={styles.sendButton} onClick={onSend}>
        ➤
      </button>
    </div>
  );
}

export default TextInputWithSend;