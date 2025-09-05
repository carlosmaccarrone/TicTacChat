import styles from "@/pages/GamePlay/Board.module.css";

const Board = ({ board, turn, checkWinner, showWinningLine, handleClick }) => {
  const renderWinningLine = () => {
    const result = checkWinner(board);
    if (!result?.winner || result.winner === "draw" || !showWinningLine) return null;

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
    <div className={styles.boardWrapper}>
      <div className={styles.board}>
        {board.map((cell, index) => (
          <div
            key={index}
            className={`${styles.cell} ${cell === "X" ? styles.x : cell === "O" ? styles.o : ""}`}
            onClick={() => handleClick(index)}
          >
            {cell && <div className={cell === "X" ? styles.xInner : styles.oInner}></div>}
          </div>
        ))}
      </div>
      {renderWinningLine()}
    </div>
  );
}

export default Board;