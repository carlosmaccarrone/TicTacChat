import ResultMessagePVP from "@/pages/GamePlay/ResultMessage/ResultMessagePVP";
import { render, screen, fireEvent } from "@testing-library/react";
import { jest } from "@jest/globals";

jest.unstable_mockModule(
  "@/pages/GamePlay/ResultMessage/ResultMessage.module.css",
  () => ({
    __esModule: true,
    default: {
      resultMessage: "resultMessage",
      continueButton: "continueButton",
    },
  })
);

describe("ResultMessagePVP", () => {
  test("muestra 'Start' si el tablero está vacío y es turno del jugador", () => {
    render(
      <ResultMessagePVP
        winner={null}
        board={Array(9).fill(null)}
        turn="X"
        playerMarks={{ X: "player", O: "opponent" }}
        mySymbol="X"
        handleRestart={jest.fn()}
      />
    );

    expect(screen.getByText("Start")).toBeInTheDocument();
  });

  test("muestra 'Hold' si el tablero está vacío y es turno del oponente", () => {
    render(
      <ResultMessagePVP
        winner={null}
        board={Array(9).fill(null)}
        turn="O"
        playerMarks={{ X: "player", O: "opponent" }}
        mySymbol="X"
        handleRestart={jest.fn()}
      />
    );

    expect(screen.getByText("Hold")).toBeInTheDocument();
  });

  test("muestra '🤝 Draw' si el resultado es empate", () => {
    render(
      <ResultMessagePVP
        winner="draw"
        board={Array(9).fill("X")}
        turn="O"
        playerMarks={{ X: "player", O: "opponent" }}
        mySymbol="X"
        handleRestart={jest.fn()}
      />
    );

    expect(screen.getByText("🤝 Draw")).toBeInTheDocument();
  });

  test("muestra 'You win!' si el ganador soy yo", () => {
    render(
      <ResultMessagePVP
        winner="X"
        board={Array(9).fill("X")}
        turn="O"
        playerMarks={{ X: "player", O: "opponent" }}
        mySymbol="X"
        handleRestart={jest.fn()}
      />
    );

    expect(screen.getByText("You win!")).toBeInTheDocument();
  });

  test("muestra 'You lose' si el ganador es el oponente", () => {
    render(
      <ResultMessagePVP
        winner="O"
        board={Array(9).fill("X")}
        turn="X"
        playerMarks={{ X: "player", O: "opponent" }}
        mySymbol="X"
        handleRestart={jest.fn()}
      />
    );

    expect(screen.getByText("You lose")).toBeInTheDocument();
  });

  test("botón cambia a 'Waiting opponent...' y se desactiva al hacer click", () => {
    const handleRestart = jest.fn();
    render(
      <ResultMessagePVP
        winner="draw"
        board={Array(9).fill("X")}
        turn="X"
        playerMarks={{ X: "player", O: "opponent" }}
        mySymbol="X"
        handleRestart={handleRestart}
      />
    );

    const button = screen.getByRole("button", { name: /continue/i });
    expect(button).toBeEnabled();

    fireEvent.click(button);

    expect(handleRestart).toHaveBeenCalledTimes(1);
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("Waiting opponent...");
  });

  test("requestedRestart se resetea a false cuando cambia winner a null", () => {
    const { rerender } = render(
      <ResultMessagePVP
        winner="draw"
        board={Array(9).fill("X")}
        turn="X"
        playerMarks={{ X: "player", O: "opponent" }}
        mySymbol="X"
        handleRestart={jest.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /continue/i }));
    expect(screen.getByRole("button")).toHaveTextContent("Waiting opponent...");

    rerender(
      <ResultMessagePVP
        winner={null}
        board={Array(9).fill(null)}
        turn="X"
        playerMarks={{ X: "player", O: "opponent" }}
        mySymbol="X"
        handleRestart={jest.fn()}
      />
    );

    expect(screen.queryByRole("button")).toBeNull();
  });
});