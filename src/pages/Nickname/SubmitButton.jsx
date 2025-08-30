import styles from '@/pages/Nickname/SubmitButton.module.css';

const SubmitButton = ({ children }) => {
  return (
    <button type="submit" className={styles.button}>
      {children}
    </button>
  );
}

export default SubmitButton;