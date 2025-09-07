import ResultMessageCPU from '@/pages/GamePlay/ResultMessage/ResultMessageCPU';
import ResultMessagePVP from '@/pages/GamePlay/ResultMessage/ResultMessagePVP';
import { useSearchParams, useOutletContext } from 'react-router-dom';
import MessageScreen from '@/components/MessageScreen/MessageScreen';
import MessageInput from '@/components/MessageInput/MessageInput';
import styles from '@/pages/GamePlay/GamePlay.module.css';
import { useRoomCPU } from '@/contexts/RoomContextCpu';
import { useRoomPVP } from '@/contexts/RoomContextPvp';
import Board from '@/pages/GamePlay/Board';

export default function GamePlayPage() {
  const { navbarHeight } = useOutletContext();
  const roomCPU = useRoomCPU();
  const roomPVP = useRoomPVP();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "cpu";
  const room = mode === "cpu" ? roomCPU : roomPVP || {};
  const {
    board = Array(9).fill(null),
    turn = null,
    winner = null,
    playerMarks = { X: null, O: null },
    mySymbol = null,
    checkWinner = () => null,
    handleMove = () => {},
    handleRestart = () => {},
    privateMessages = [],
    sendPrivateMessage = () => {},
  } = room;


  return (
    <div className={styles.container} style={{ "--navbar-height": `${navbarHeight}px` }}>
      <div className={styles.gameArea}>
        <Board
          board={board}
          turn={turn}
          showWinningLine={winner !== null}
          handleClick={handleMove}
          checkWinner={checkWinner}
        />
        {mode === "cpu" ? (
        <ResultMessageCPU
          winner={winner}
          board={board}
          turn={turn}
          playerMarks={playerMarks}
          handleRestart={handleRestart}
        />
        ) : (
        <ResultMessagePVP
          winner={winner}
          board={board}
          turn={turn}
          playerMarks={playerMarks}
          mySymbol={mySymbol}
          handleRestart={handleRestart}
        />
        )}
      </div>

      {mode != 'cpu' &&
        <div className={styles.chatArea}>
          <MessageScreen messages={privateMessages} />
          <MessageInput onSend={sendPrivateMessage} />
        </div>
      }
    </div>
  );
}