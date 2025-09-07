import styles from "@/pages/GamePlay/ResultMessage/ResultMessage.module.css";
import { useState, useEffect } from 'react';

const ResultMessagePVP = ({ winner, board, turn, playerMarks, mySymbol, handleRestart }) => {
  const [requestedRestart, setRequestedRestart] = useState(false);

  const isDraw = winner === 'draw';
  const iWon = !isDraw && winner === mySymbol;

  const isBoardEmpty = board.every(cell => cell === null);

  useEffect(() => {
    if (!winner) {
      setRequestedRestart(false);
    }
  }, [winner]);

  const onContinue = () => {
    setRequestedRestart(true);
    handleRestart();
  };

  return (
    <div className={styles.resultMessage}>
      {isBoardEmpty && (
        playerMarks[turn] === 'player' ? 'You start' : 'Hold'
      )}

      {winner && (
        isDraw ? '🤝 Draw' : iWon ? 'You win!' : 'You lose'
      )}

      {winner && (
        <button 
          className={styles.continueButton} 
          onClick={onContinue} 
          disabled={requestedRestart}
        >
          {requestedRestart ? 'Waiting opponent...' : 'Continue'}
        </button>
      )}
    </div>
  );
}

export default ResultMessagePVP;