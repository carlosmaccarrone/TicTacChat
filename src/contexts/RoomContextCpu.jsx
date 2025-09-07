import { createContext, useContext, useState, useEffect } from "react";
import { useCpuTicTacToe, getCpuMove } from "@/hooks/useCpuTicTacToe";
import { useCheckWinner } from "@/hooks/useCheckWinner";

const RoomContextCPU = createContext({});
export const useRoomCPU = () => useContext(RoomContextCPU);

export function RoomProviderCPU({ children }) {
  const { checkWinner } = useCheckWinner();

  // Main states
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(() => (Math.random() < 0.5 ? "X" : "O"));
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ me: 0, opponent: 0 });

  // Random PlayerMarks that last the entire session
  const [playerMarks] = useState(() => {
    const assign = Math.random() < 0.5;
    return assign ? { X: "player", O: "cpu" } : { X: "cpu", O: "player" };
  });

  const mySymbol = Object.entries(playerMarks).find(([key, val]) => val === "player")[0];

  // Game logic
  const logic = useCpuTicTacToe({ board, setBoard, turn, setTurn, setWinner, checkWinner, playerMarks })

  // CPU move effect with safe closure
  useEffect(() => {
    if (winner || playerMarks[turn] !== "cpu") return;

    const timeout = setTimeout(() => {
      setBoard(prevBoard => {
        const move = getCpuMove(prevBoard, turn);
        if (move === null) return prevBoard;

        const newBoard = [...prevBoard];
        newBoard[move] = turn;

        const { winner: cpuResult } = checkWinner(newBoard);
        if (cpuResult) setWinner(cpuResult);
        else setTurn(prevTurn => (prevTurn === "X" ? "O" : "X"));

        return newBoard;
      });
    }, 400);

    return () => clearTimeout(timeout);
  }, [turn, winner, board, playerMarks, checkWinner]);

  // Updating scores
  useEffect(() => {
    if (!winner || winner === "draw") return;

    const meMark = Object.entries(playerMarks).find(([_, v]) => v === "player")[0]; // user
    const opponentMark = Object.entries(playerMarks).find(([_, v]) => v === "cpu")[0]; // CPU

    setScores(prev => ({
      me: prev.me + (winner === meMark ? 1 : 0),
      opponent: prev.opponent + (winner === opponentMark ? 1 : 0)
    }));
  }, [winner, playerMarks]);

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
    <RoomContextCPU.Provider
      value={{ board, turn, winner, playerMarks, checkWinner, handleMove, mySymbol, handleRestart, scores }}>
      {children}
    </RoomContextCPU.Provider>
  );
}