import styles from "@/pages/GamePlay/ResultMessage/ResultMessage.module.css";

const ResultMessageCPU = ({ winner, board, turn, playerMarks, handleRestart }) => {
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

export default ResultMessageCPU;