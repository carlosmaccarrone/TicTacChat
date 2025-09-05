import { useCpuTicTacToe, getCpuMove } from "@/hooks/useCpuTicTacToe";
import styles from "@/pages/GamePlay/GamePlay.module.css";
import { usePvpTicTacToe } from "@/hooks/usePvpTicTacToe";
import { useCheckWinner } from "@/hooks/useCheckWinner";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function GamePlayPage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "pvp";

  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(() =>
    Math.random() < 0.5 ? "X" : "O"
  );
  const [winner, setWinner] = useState(null);

  const { checkWinner } = useCheckWinner();

  const logic =
    mode === "cpu"
      ? useCpuTicTacToe({ board, setBoard, turn, setTurn, setWinner, checkWinner })
      : usePvpTicTacToe({ board, setBoard, turn, setTurn, setWinner, checkWinner });

  useEffect(() => {
    if (mode === "cpu" && turn === "X" && !winner) {
      const move = getCpuMove(board, "X");
      if (move !== null) {
        setTimeout(() => {
          const cpuBoard = [...board];
          cpuBoard[move] = "X";
          setBoard(cpuBoard);

          const { winner: cpuResult } = checkWinner(cpuBoard);
          if (cpuResult) {
            setWinner(cpuResult);
          } else {
            setTurn("O");
          }
        }, 400);
      }
    }
  }, [turn, board, winner]);

  const handleClick = (index) => {
    if (!winner) logic.handleMove(index);
  };

  const handleRestart = () => {
    const lastWinner = winner;

    setBoard(Array(9).fill(null));
    setWinner(null);

    if (lastWinner === "draw") {
      // tie → random turn
      setTurn(Math.random() < 0.5 ? "X" : "O");
    } else {
      // victory → the winner starts
      setTurn(lastWinner);
    }
  };

  const handleContinue = (player) => {
    setReadyPlayers(prev => ({ ...prev, [player]: true }));
    if (readyPlayers.X && readyPlayers.O) handleRestart();
  };  

  const [showWinningLine, setShowWinningLine] = useState(false);
  useEffect(() => {
    if (!winner) {
      setShowWinningLine(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowWinningLine(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [winner]);
  const renderWinningLine = () => {
    const result = checkWinner(board);
    if (!result?.winner || result.winner === "draw") return null;
    if (!showWinningLine) return null;

    const line = result.line;
    if (!line) return null;

    const wrapper = document.querySelector(`.${styles.boardWrapper}`);
    if (!wrapper) return null;
    const wrapperRect = wrapper.getBoundingClientRect();

    const cells = Array.from(wrapper.querySelectorAll(`.${styles.cell}`));
    const firstCellRect = cells[line[0]].getBoundingClientRect();
    const lastCellRect = cells[line[2]].getBoundingClientRect();

    const startX = firstCellRect.left + firstCellRect.width / 2 - wrapperRect.left;
    const startY = firstCellRect.top + firstCellRect.height / 2 - wrapperRect.top;
    const endX = lastCellRect.left + lastCellRect.width / 2 - wrapperRect.left;
    const endY = lastCellRect.top + lastCellRect.height / 2 - wrapperRect.top;

    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    const height = 8;
    return (
      <div
        className={styles.winningLine}
        style={{
          width: `0px`,
          height: `${height}px`,
          top: `${startY - height / 2}px`,
          left: `${startX}px`,
          transform: `rotate(${angle}deg)`,
          transformOrigin: '0 50%',
          '--final-width': `${length}px`,
        }}
      />
    );
  };

  return (
    <>
      <div>
        <div className={styles.boardWrapper}>
          <div className={styles.board}>
            {board.map((cell, index) => (
              <div key={index} className={`${styles.cell} ${cell === "X" ? styles.x : cell === "O" ? styles.o : ""}`} onClick={() => handleClick(index)}>
                {cell && <div className={cell === "X" ? styles.xInner : styles.oInner}></div>}
              </div>
            ))}
          </div>
          {renderWinningLine(board)}
        </div>


        {winner && (
          <div className={styles.winnerMessage}>
            {winner === "draw" ? "🤝 Draw" : `🏆 Winner ${winner}`}
          </div>
        )}
      </div>
      {winner && (
        <div className={styles.resultMessage}>
          {winner === "draw" ? "Draw, continue" : winner === turn ? "You win, continue" : "You lose, continue"}
          <button onClick={handleRestart}>Continue</button>
        </div>
      )}
    </>
  );
}