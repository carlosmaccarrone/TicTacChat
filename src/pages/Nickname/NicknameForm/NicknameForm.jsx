import styles from '@/pages/Nickname/NicknameForm/NicknameForm.module.css';
import NicknameInput from '@/pages/Nickname/NicknameForm/NicknameInput';
import SubmitButton from '@/pages/Nickname/NicknameForm/SubmitButton';
import { useSession } from '@/contexts/SessionContext';
import { useState, useEffect } from 'react';

const NicknameForm = () => {
  const [nicknameInput, setNicknameInput] = useState(() => sessionStorage.getItem('nickname') || '');
  const { login, sessionLoading, error: sessionError, setError: setSessionError } = useSession();
  const [localError, setLocalError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionError) {
      setLocalError(sessionError);
      setSessionError('');
    }
  }, [sessionError, setSessionError]);

  const handleChange = (evt) => {
    const value = evt.target.value;
    if (/^[a-zA-Z0-9]{0,14}$/.test(value)) {
      setNicknameInput(value);
      if (localError) setLocalError('');
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (nicknameInput.length < 6) {
      setLocalError('Nickname must be at least 6 characters');
      return;
    }

    setLoading(true);
    const res = await login(nicknameInput);
    setLoading(false);

    if (!res.ok) {
      setLocalError(res.error);
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputContainer}>
        <NicknameInput
          value={nicknameInput}
          onChange={handleChange}
          error={localError}
          placeholder="Your legendary nickname"
        />
      </div>
      <div className={styles.buttonContainer}>
        <SubmitButton disabled={loading || sessionLoading}>
          {loading || sessionLoading ? 'Joining...' : 'Join'}
        </SubmitButton>
      </div>
    </form>
  );
};

export default NicknameForm;