/*import styles from "@/pages/GamePlay/ResultMessage.module.css";

const ResultMessage = ({ winner, board, turn, playerMarks, handleRestart }) => {
  const isBoardEmpty = board.every(cell => cell === null);

  return (
    <div className={styles.resultMessage}>
      {!winner && isBoardEmpty && (
        playerMarks[turn]?.includes("player") ? "You start" : "Hold"
      )}

      {winner && (
        <>
          {winner === "draw"
            ? "🤝 Draw"
            : (winner === turn ? "You win" : "You lose")
          }
          <button className={styles.continueButton} onClick={handleRestart}>
            Continue
          </button>
        </>
      )}
    </div>
  );
}

export default ResultMessage;*/





import styles from "@/pages/GamePlay/ResultMessage.module.css";
import React, { useState } from 'react';

const ResultMessage = ({ winner, board, turn, playerMarks, mySymbol, handleRestart }) => {
  const [requestedRestart, setRequestedRestart] = useState(false);

  const isDraw = winner === 'draw';
  const iWon = !isDraw && winner === mySymbol;

  const isBoardEmpty = board.every(cell => cell === null);

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

export default ResultMessage;