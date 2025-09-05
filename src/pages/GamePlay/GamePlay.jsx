import { useSearchParams, useOutletContext } from "react-router-dom";
import MessageScreen from "@/components/MessageScreen/MessageScreen";
import MessageInput from "@/components/MessageInput/MessageInput";
import { RoomProvider, useRoom } from "@/contexts/RoomContext";
import ResultMessage from "@/pages/GamePlay/ResultMessage";
import Board from "@/pages/GamePlay/Board";

import styles from "@/pages/GamePlay/GamePlay.module.css"

import { createContext } from "react";
const messages = [
    { from: "CPU", text: "Buena jugada 👀" },
    { from: "Charly", text: "Gracias! 😎" },
    { from: "CPU", text: "Buena jugada 👀" },
    { from: "Charly", text: "Gracias! 😎" },
    { from: "CPU", text: "Buena jugada 👀" },
    { from: "Charly", text: "Gracias! 😎" },
    { from: "CPU", text: "Buena jugada 👀" },
    { from: "Charly", text: "Gracias! 😎" },
    { from: "CPU", text: "Buena jugada 👀" },
    { from: "Charly", text: "Gracias! 😎" },
    { from: "CPU", text: "Buena jugada 👀" },
    { from: "Charly", text: "Gracias! 😎" },
    { from: "CPU", text: "Buena jugada 👀" },
    { from: "Charly", text: "Gracias! 😎" },
    { from: "CPU", text: "Buena jugada 👀" },
    { from: "Charly", text: "Gracias! 😎" },
    { from: "CPU", text: "Buena jugada 👀" },
    { from: "Charly", text: "Gracias! 😎" },
    { from: "CPU", text: "Buena jugada 👀" },
    { from: "Charly", text: "Gracias! 😎" },
    { from: "CPU", text: "Buena jugada 👀" },
    { from: "Charly", text: "Gracias! 😎" },
    { from: "CPU", text: "Buena jugada 👀" },
    { from: "Charly", text: "Gracias! 😎" },
    { from: "CPU", text: "Buena dd 👀" },
    { from: "Charly", text: "Gracias! 😎" },                                                
  ]
const MockUsersContext = createContext({
messages,
});

export default function GamePlayPage() {
  const { board, turn, winner, playerMarks, checkWinner, handleMove, handleRestart, mode } = useRoom();
  const { navbarHeight } = useOutletContext();

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
        <ResultMessage
          winner={winner}
          board={board}
          turn={turn}
          playerMarks={playerMarks}
          handleRestart={handleRestart}
        />
      </div>

      {mode != 'cpu' &&
        <div className={styles.chatArea}>
          <MockUsersContext.Provider value={{ messages:
            messages
          }}>
            <MessageScreen usersContext={MockUsersContext} />
            <MessageInput onSend={(msg) => console.log("Mock send:", msg)} />
          </MockUsersContext.Provider>
        </div>
      }
    </div>
  );
}