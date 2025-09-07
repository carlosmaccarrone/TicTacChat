import styles from '@/pages/Lobby/ChallengePopup.module.css';
import { useSession } from '@/contexts/SessionContext';

const ChallengePopup = ({ from, to, onAccept, onCancel, onDecline }) => {
  const { nickname } = useSession();

  const amIChallenger = nickname === from;
  const amIChallenged = nickname === to;

  return (
    <div className={styles.challengePopup}>
      {amIChallenger && <p>You challenged {to}!</p>}
      {amIChallenged && <p>{from} challenged you!</p>}

			{amIChallenger && <button onClick={onCancel}>Cancel Challenge</button>}

			{amIChallenged && (
			  <>
			    <button onClick={onAccept}>Accept</button>
			    <button onClick={onDecline}>Decline</button>
			  </>
			)}
    </div>
  );
};

export default ChallengePopup;