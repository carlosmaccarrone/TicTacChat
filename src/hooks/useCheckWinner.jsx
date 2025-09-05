export function useCheckWinner() {
  const checkWinner = (board) => {
    const winningLines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6],            // diagonals
    ];

    for (const [a, b, c] of winningLines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line: [a, b, c] };
      }
    }

    if (board.every((cell) => cell !== null)) {
      return { winner: "draw", line: null };
    }

    return { winner: null, line: null }; // still no winner
  };

  return { checkWinner };
}