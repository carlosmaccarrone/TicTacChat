import { createContext, useContext, useState, useEffect } from 'react';
import { useCheckWinner } from '@/hooks/useCheckWinner';
import { useSession } from '@/contexts/SessionContext';
import { useSocket } from '@/contexts/SocketContext';

const RoomContextPVP = createContext({});
export const useRoomPVP = () => useContext(RoomContextPVP);

export function RoomProviderPVP({ children }) {
  const { checkWinner } = useCheckWinner();
  const { nickname } = useSession();
  const { socket } = useSocket();

  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(null);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ me: 0, opponent: 0 });
  const [privateMessages, setPrivateMessages] = useState([]);
  const [opponentNickname, setOpponentNickname] = useState(null);
  const [mySymbol, setMySymbol] = useState(null);
  const [playerMarks, setPlayerMarks] = useState({ X: null, O: null });

  const normalizeWinner = (w) => {
    if (!w) return null;
    if (typeof w === 'string') return w;
    if (typeof w === 'object') return w.winner || null;
    return null;
  };

  const forceLobby = () => {
    socket?.emit('pvp:forceLobby');
    setPrivateMessages([]);
  };

  // pvp:start listener
  useEffect(() => {
    if (!socket) return;

    const onStart = ({ board: newBoard, turn: firstTurn, opponent, mySymbol }) => {
      setBoard(newBoard || Array(9).fill(null));
      setTurn(firstTurn);
      setWinner(null);
      setOpponentNickname(opponent);
      setMySymbol(mySymbol);
      setPlayerMarks({
        X: mySymbol === 'X' ? 'player' : 'opponent',
        O: mySymbol === 'O' ? 'player' : 'opponent',
      });
      setPrivateMessages([]);
    };

    socket.on('pvp:start', onStart);
    return () => socket.off('pvp:start', onStart);
  }, [socket]);

  // mensajes privados
  useEffect(() => {
    if (!socket) return;

    const onMessage = ({ from, text }) => {
      setPrivateMessages(prev => [...prev, { from, text }]);
    };
    socket.on('pvp:message', onMessage);
    return () => socket.off('pvp:message', onMessage);
  }, [socket]);
  
  const sendPrivateMessage = (text) => {
    if (!socket || !opponentNickname) return;
    socket.emit('pvp:message', { to: opponentNickname, text });
  };

  // moves
  const handleMove = (index) => {
    if (!board || winner || !mySymbol || turn !== mySymbol || board[index]) return;
    socket.emit('pvp:move', { index, symbol: mySymbol });
  };

  const handleRestart = () => {
    socket?.emit('pvp:requestRestart');
  };

  // unified server listeners
  useEffect(() => {
    if (!socket) return;

    const updateScores = (currentWinner) => {
      const meMark = Object.entries(playerMarks).find(([_, v]) => v === 'player')?.[0];
      const opponentMark = Object.entries(playerMarks).find(([_, v]) => v === 'opponent')?.[0];

      setScores(prev => ({
        me: prev.me + (currentWinner === meMark ? 1 : 0),
        opponent: prev.opponent + (currentWinner === opponentMark ? 1 : 0),
      }));
    };

    const onBoardUpdate = ({ newBoard, nextTurn, winner: serverWinner }) => {
      const boardToSet = newBoard || Array(9).fill(null);
      setBoard(boardToSet);
      setTurn(nextTurn);

      const normalizedServerWinner = normalizeWinner(serverWinner);

      if (normalizedServerWinner) {
        setWinner(normalizedServerWinner);
        updateScores(normalizedServerWinner);
        return;
      }

      const localResult = checkWinner(boardToSet);
      const normalizedLocal = normalizeWinner(localResult);

      setWinner(prev => {
        if (!prev && normalizedLocal) {
          socket?.emit('pvp:reportResult', { winner: normalizedLocal });
          updateScores(normalizedLocal);
          return normalizedLocal;
        }
        return prev || null;
      });
    };

    const onRestartConfirmed = ({ board: newBoard, turn: firstTurn }) => {
      setBoard(newBoard || Array(9).fill(null));
      setTurn(firstTurn);
      setWinner(null);
    };

    socket.on('pvp:boardUpdate', onBoardUpdate);
    socket.on('pvp:restartConfirmed', onRestartConfirmed);

    return () => {
      socket.off('pvp:boardUpdate', onBoardUpdate);
      socket.off('pvp:restartConfirmed', onRestartConfirmed);
    };
  }, [socket, checkWinner, playerMarks, mySymbol]);

  return (
    <RoomContextPVP.Provider
      value={{
        board,
        turn,
        winner,
        mySymbol,
        playerMarks,
        scores,
        checkWinner,
        handleMove,
        handleRestart,
        privateMessages,
        sendPrivateMessage,
      }}
    >
      {children}
    </RoomContextPVP.Provider>
  );
}
