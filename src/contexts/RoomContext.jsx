import { createContext, useContext, useState, useEffect } from "react";
import { useCpuTicTacToe, getCpuMove } from "@/hooks/useCpuTicTacToe";
import { usePvpTicTacToe } from "@/hooks/usePvpTicTacToe";
import { useCheckWinner } from "@/hooks/useCheckWinner";

const RoomContext = createContext({});
export const useRoom = () => useContext(RoomContext);

export function RoomProvider({ children, mode }) {
  const { checkWinner } = useCheckWinner();

  // Main states
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(() => (Math.random() < 0.5 ? "X" : "O"));
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ me: 0, opponent: 0 });

  // Random PlayerMarks that last the entire session
  const [playerMarks] = useState(() => {
    const assign = Math.random() < 0.5;
    if (mode === "cpu") {
      return assign ? { X: "player", O: "cpu" } : { X: "cpu", O: "player" };
    } else {
      return assign ? { X: "player1", O: "player2" } : { X: "player2", O: "player1" };
    }
  });

  // Game logic
  const logic =
    mode === "cpu"
      ? useCpuTicTacToe({ board, setBoard, turn, setTurn, setWinner, checkWinner, playerMarks })
      : usePvpTicTacToe({ board, setBoard, turn, setTurn, setWinner, checkWinner });

  // CPU move effect with safe closure
  useEffect(() => {
    if (mode !== "cpu" || winner || playerMarks[turn] !== "cpu") return;

    const timeout = setTimeout(() => {
      setBoard(prevBoard => {
        const move = getCpuMove(prevBoard, turn);
        if (move === null) return prevBoard;

        const newBoard = [...prevBoard];
        newBoard[move] = turn;

        // Check winner with the new board
        const { winner: cpuResult } = checkWinner(newBoard);
        if (cpuResult) setWinner(cpuResult);
        else setTurn(prevTurn => (prevTurn === "X" ? "O" : "X"));

        return newBoard;
      });
    }, 400);

    return () => clearTimeout(timeout);
  }, [turn, board, winner, playerMarks, mode, checkWinner]);

  // Updating scores
  useEffect(() => {
    if (!winner || winner === "draw") return;

    const meMark = mode === "cpu" ? Object.entries(playerMarks).find(([_, v]) => v === "player")[0] : "X";
    const opponentMark = mode === "cpu" ? Object.entries(playerMarks).find(([_, v]) => v === "cpu")[0] : "O";

    setScores(prev => {
      const newScores = {
        me: prev.me + (winner === meMark ? 1 : 0),
        opponent: prev.opponent + (winner === opponentMark ? 1 : 0)
      };
      return newScores;
    });
  }, [winner, mode, playerMarks]);

  const handleMove = (index) => {
    if (!winner && playerMarks[turn]?.includes("player") && logic?.handleMove) {
      logic.handleMove(index);
    }
  };

  const handleRestart = () => {
    const lastWinner = winner;
    setBoard(Array(9).fill(null));
    setWinner(null);

    // winner starts next, draw random
    if (lastWinner === "draw" || !lastWinner) {
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
        scores,
        mode
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}