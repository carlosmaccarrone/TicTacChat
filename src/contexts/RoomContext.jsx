import { createContext, useContext, useState, useEffect } from "react";
import { useCpuTicTacToe, getCpuMove } from "@/hooks/useCpuTicTacToe";
import { usePvpTicTacToe } from "@/hooks/usePvpTicTacToe";
import { useCheckWinner } from "@/hooks/useCheckWinner";

const RoomContext = createContext({});
export const useRoom = () => useContext(RoomContext);

export function RoomProvider({ children, mode }) {
  const [scores, setScores] = useState({ me: 0, opponent: 0 });
  const { checkWinner } = useCheckWinner();

  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(() => (Math.random() < 0.5 ? "X" : "O"));
  const [winner, setWinner] = useState(null);
  const [playerMarks, setPlayerMarks] = useState(() => {
    if (mode === "cpu") {
      return Math.random() < 0.5
        ? { X: "player", O: "cpu" }
        : { X: "cpu", O: "player" };
    } else {
      return Math.random() < 0.5
        ? { X: "player1", O: "player2" }
        : { X: "player2", O: "player1" };
    }
  });

  const logic =
    mode === "cpu"
      ? useCpuTicTacToe({ board, setBoard, turn, setTurn, setWinner, checkWinner, playerMarks })
      : usePvpTicTacToe({ board, setBoard, turn, setTurn, setWinner, checkWinner });

  // CPU move effect
  useEffect(() => {
    if (mode === "cpu" && playerMarks[turn] === "cpu" && !winner) {
      const move = getCpuMove(board, turn);
      if (move !== null) {
        setTimeout(() => {
          const cpuBoard = [...board];
          cpuBoard[move] = turn;
          setBoard(cpuBoard);

          const { winner: cpuResult } = checkWinner(cpuBoard);
          if (cpuResult) {
            setWinner(cpuResult);
          } else {
            setTurn(turn === "X" ? "O" : "X");
          }
        }, 400);
      }
    }
  }, [turn, board, winner, playerMarks, mode, checkWinner]);

  useEffect(() => {
    if (!winner || winner === "draw") return;

    const meMark = Object.entries(playerMarks).find(([mark, player]) => player.includes("player"))[0];
    const opponentMark = Object.entries(playerMarks).find(([mark, player]) => !player.includes("player"))[0];

    if (winner === meMark) {
      setScores(prev => ({ ...prev, me: prev.me + 1 }));
    } else if (winner === opponentMark) {
      setScores(prev => ({ ...prev, opponent: prev.opponent + 1 }));
    }
  }, [winner]);

  const handleMove = (index) => {
    if (!winner && playerMarks[turn]?.includes("player")) {
      logic.handleMove(index);
    }
  };

  const handleRestart = () => {
    const lastWinner = winner;
    setBoard(Array(9).fill(null));
    setWinner(null);

    if (lastWinner === "draw") {
      setTurn(Math.random() < 0.5 ? "X" : "O");
    } else {
      setTurn(lastWinner);
    }
  };

  return (
    <RoomContext.Provider
      value={{
        board,
        turn,
        winner,
        playerMarks,
        checkWinner,
        handleMove,
        handleRestart,
        scores
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}