import { RoomProvider, useRoom } from "@/contexts/RoomContext";
import Board from "@/pages/GamePlay/Board";
import ResultMessage from "@/pages/GamePlay/ResultMessage";
import { useSearchParams } from "react-router-dom";

export default function GamePlayPage() {
  const { board, turn, winner, playerMarks, checkWinner, handleMove, handleRestart } = useRoom();

  return (
    <>
      <Board
        board={board}
        turn={turn}
        showWinningLine={winner !== null}
        handleClick={handleMove}
        checkWinner={checkWinner}
      />
      <ResultMessage
        winner={winner}
        board={board}
        turn={turn}
        playerMarks={playerMarks}
        handleRestart={handleRestart}
      />
    </>
  );
}