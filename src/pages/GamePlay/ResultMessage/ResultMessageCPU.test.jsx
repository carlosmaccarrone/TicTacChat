import ResultMessageCPU from "@/pages/GamePlay/ResultMessage/ResultMessageCPU";
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

describe("ResultMessageCPU", () => {
  test("muestra 'Start' cuando el tablero está vacío y el turno es del jugador", async () => {
    render(
      <ResultMessageCPU
        winner={null}
        board={Array(9).fill(null)}
        turn="X"
        playerMarks={{ X: ["player"], O: ["cpu"] }}
        handleRestart={jest.fn()}
      />
    );

    expect(screen.getByText("Start")).toBeInTheDocument();
  });

  test("muestra 'Hold' cuando el tablero está vacío y el turno es de la CPU", async () => {
    render(
      <ResultMessageCPU
        winner={null}
        board={Array(9).fill(null)}
        turn="O"
        playerMarks={{ X: ["player"], O: ["cpu"] }}
        handleRestart={jest.fn()}
      />
    );

    expect(screen.getByText("Hold")).toBeInTheDocument();
  });

  test("muestra '🤝 Draw' cuando el ganador es draw", async () => {
    render(
      <ResultMessageCPU
        winner="draw"
        board={Array(9).fill("X")}
        turn="X"
        playerMarks={{ X: ["player"], O: ["cpu"] }}
        handleRestart={jest.fn()}
      />
    );

    expect(screen.getByText("🤝 Draw")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /continue/i })).toBeInTheDocument();
  });

  test("muestra 'You win' si el ganador es el mismo que el turno actual", async () => {
    render(
      <ResultMessageCPU
        winner="X"
        board={Array(9).fill("X")}
        turn="X"
        playerMarks={{ X: ["player"], O: ["cpu"] }}
        handleRestart={jest.fn()}
      />
    );

    expect(screen.getByText("You win")).toBeInTheDocument();
  });

  test("muestra 'You lose' si el ganador es distinto al turno actual", async () => {
    render(
      <ResultMessageCPU
        winner="O"
        board={Array(9).fill("X")}
        turn="X"
        playerMarks={{ X: ["player"], O: ["cpu"] }}
        handleRestart={jest.fn()}
      />
    );

    expect(screen.getByText("You lose")).toBeInTheDocument();
  });

  test("llama a handleRestart cuando se hace click en Continue", async () => {
    const handleRestart = jest.fn();
    render(
      <ResultMessageCPU
        winner="draw"
        board={Array(9).fill("X")}
        turn="X"
        playerMarks={{ X: ["player"], O: ["cpu"] }}
        handleRestart={handleRestart}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /continue/i }));
    expect(handleRestart).toHaveBeenCalledTimes(1);
  });
});