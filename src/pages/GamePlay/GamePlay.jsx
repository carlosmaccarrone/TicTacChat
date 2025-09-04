import styles from '@/pages/GamePlay/GamePlay.module.css';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

export default function GamePlayPage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'pvp';

  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState('O'); // X siempre empieza

  const handleClick = (index) => {
    // solo permite colocar si está vacío
    if (!board[index]) {
      const newBoard = [...board];
      newBoard[index] = turn;
      setBoard(newBoard);

      // alternar turno
      if (mode === 'pvp') {
        setTurn(turn === 'X' ? 'O' : 'X');
      } else if (mode === 'cpu') {
        setTurn('X'); // por ahora la CPU no mueve, después metemos lógica
      }
    }
  };

  return (
    <div className={styles.board}>
      {board.map((cell, index) => (
        <div 
          key={index} 
          className={`${styles.cell} ${cell === 'X' ? styles.x : cell === 'O' ? styles.o : ''}`}
          onClick={() => handleClick(index)}
        >
          {cell && <div className={cell === 'X' ? styles.xInner : styles.oInner}></div>}
        </div>
      ))}
    </div>
  );
}