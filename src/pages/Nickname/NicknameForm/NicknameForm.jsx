import styles from '@/pages/Nickname/NicknameForm/NicknameForm.module.css';
import NicknameInput from '@/pages/Nickname/NicknameForm/NicknameInput';
import SubmitButton from '@/pages/Nickname/NicknameForm/SubmitButton';
import { useSession } from '@/contexts/SessionContext';
import { useState, useEffect } from 'react';

const NicknameForm = () => {
  const [nicknameInput, setNicknameInput] = useState(() => sessionStorage.getItem('nickname') || '');
  const { login, loginLoading, error: sessionError, setError: setSessionError } = useSession();
  const [showLoading, setShowLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    let timer;
    if (loginLoading) {
      setShowLoading(true);
    } else {
      timer = setTimeout(() => setShowLoading(false), 250); // wait 25ms before hiding the loading
    }
    return () => clearTimeout(timer);
  }, [loginLoading]);

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

    if (nicknameInput.length < 3) {
      setLocalError('Nickname must be at least 3 characters');
      return;
    }

    const res = await login(nicknameInput);

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
        <SubmitButton disabled={showLoading}>
          {showLoading ? 'Joining...' : 'Join'}
        </SubmitButton>
      </div>
    </form>
  );
};

export default NicknameForm;