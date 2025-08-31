import styles from '@/pages/Nickname/NicknameForm.module.css';
import NicknameInput from '@/pages/Nickname/NicknameInput';
import SubmitButton from '@/pages/Nickname/SubmitButton';
import { useSession } from '@/contexts/SessionContext';
import { useState } from 'react';

const NicknameForm = () => {
  const { login } = useSession();
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const handleChange = (evt) => {
    const value = evt.target.value;
    if (/^[a-zA-Z0-9]{0,14}$/.test(value)) {
      setNickname(value);
      setError('');
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (nickname.length < 6) {
      setError('Nickname must be at least 6 characters');
      return;
    }
    const res = await login(nickname);
    if (!res.ok) {
      setError(res.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputContainer}>
        <NicknameInput
          value={nickname}
          onChange={handleChange}
          error={error}
          placeholder="Your legendary nickname"
        />
      </div>
      <div className={styles.buttonContainer}>
        <SubmitButton>Join</SubmitButton>
      </div>
    </form>
  );
}

export default NicknameForm;