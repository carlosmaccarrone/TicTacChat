import { useCallback } from "react";

export function getCpuMove(board, cpuSymbol) {
  const playerSymbol = cpuSymbol === "X" ? "O" : "X";

  const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  // 1) If the CPU can win, it does.
  for (const [a, b, c] of winningLines) {
    const line = [board[a], board[b], board[c]];
    if (line.filter(s => s === cpuSymbol).length === 2 && line.includes(null)) {
      return [a, b, c].find(i => board[i] === null);
    }
  }

  // 2) If the CPU can block, it does so
  for (const [a, b, c] of winningLines) {
    const line = [board[a], board[b], board[c]];
    if (line.filter(s => s === playerSymbol).length === 2 && line.includes(null)) {
      return [a, b, c].find(i => board[i] === null);
    }
  }

  // 3) corners
  const corners = [0, 2, 6, 8];
  const freeCorners = corners.filter(i => board[i] === null);
  if (freeCorners.length > 0) {
    return freeCorners[Math.floor(Math.random() * freeCorners.length)];
  }

  // 4) center
  if (board[4] === null) return 4;

  // 5) sides (1, 3, 5, 7)
  const sides = [1, 3, 5, 7];
  const freeSides = sides.filter(i => board[i] === null);
  if (freeSides.length > 0) {
    return freeSides[Math.floor(Math.random() * freeSides.length)];
  }

  // fallback: random
  const available = board.map((cell, index) => cell === null ? index : null).filter(v => v !== null);
  return available.length > 0 ? available[Math.floor(Math.random() * available.length)] : null;
}

export function useCpuTicTacToe({ board, setBoard, turn, setTurn, setWinner, checkWinner }) {
  const handleMove = useCallback((index) => {
    if (!board[index] && turn === "O") {
      // player movement
      const newBoard = [...board];
      newBoard[index] = "O";
      setBoard(newBoard);

      // winning check player
      const { winner: playerResult } = checkWinner(newBoard);
      if (playerResult) {
        setWinner(playerResult);
        return;
      }

      // cpu movement
      const move = getCpuMove(newBoard, "X");
      if (move !== null) {
        setTimeout(() => {
          const cpuBoard = [...newBoard];
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
  }, [board, setBoard, turn, setTurn, setWinner, checkWinner]);

  return { handleMove };
}