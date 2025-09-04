const useCpuTicTacToe = () => {
  function getMove(board) {
    // TODO: implement algorithm
    return Math.floor(Math.random() * 9); // placeholder
  }

  return { getMove };
}

export default useCpuTicTacToe;