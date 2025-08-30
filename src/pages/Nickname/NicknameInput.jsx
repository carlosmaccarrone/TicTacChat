import styles from '@/pages/Nickname/NicknameInput.module.css';

const NicknameInput = ({ value, onChange, error, placeholder }) => {
  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input}
      />
      {error ? (
        <span className={styles.error}>{error}</span>
      ) : (
        <span className={styles.error} style={{ visibility: 'hidden' }}>placeholder</span>
      )}
    </>
  );
}

export default NicknameInput;