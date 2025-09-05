import { useCallback } from "react";

export function usePvpTicTacToe({ board, setBoard, turn, setTurn, setWinner, checkWinner }) {
  const handleMove = useCallback(
    (index) => {
      if (!board[index]) {
        const newBoard = [...board];
        newBoard[index] = turn;
        setBoard(newBoard);

        const result = checkWinner(newBoard);
        if (result) {
          setWinner(result);
          return;
        }

        // alternar turno: X ↔ O
        setTurn(turn === "X" ? "O" : "X");
      }
    },
    [board, setBoard, turn, setTurn, setWinner, checkWinner]
  );

  return { handleMove };
}
