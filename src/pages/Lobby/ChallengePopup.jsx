import styles from '@/pages/Lobby/ChallengePopup.module.css';

const ChallengePopup = ({ from, onAccept, onDecline, countdown }) => {
  return (
    <div className={styles.challengePopup}>
      <p>{from} challenged you!</p>
      <p>Starting in: {countdown}s</p>
      <button onClick={onAccept}>Accept</button>
      <button onClick={onDecline}>Decline</button>
    </div>
  );
};

export default ChallengePopup;
