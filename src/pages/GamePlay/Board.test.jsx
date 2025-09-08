import { render, screen, fireEvent } from "@testing-library/react";
import Board from "@/pages/GamePlay/Board";
import { jest } from "@jest/globals";

jest.unstable_mockModule("@/pages/GamePlay/Board.module.css", () => ({
  __esModule: true,
  default: {
    boardWrapper: "boardWrapper",
    board: "board",
    cell: "cell",
    x: "x",
    o: "o",
    xInner: "xInner",
    oInner: "oInner",
    winningLine: "winningLine",
  },
}));

function mockRects() {
  Element.prototype.getBoundingClientRect = jest.fn(() => ({
    left: 0,
    top: 0,
    width: 100,
    height: 100,
    right: 100,
    bottom: 100,
  }));
}

describe("Board", () => {
  beforeEach(() => {
    mockRects();
  });

  test("renderiza X y O en las celdas", () => {
    const board = ["X", "O", null, null, null, null, null, null, null];
    render(
      <Board
        board={board}
        turn="X"
        checkWinner={() => ({ winner: null })}
        showWinningLine={false}
        handleClick={jest.fn()}
      />
    );

    expect(document.querySelector(".xInner")).toBeInTheDocument();
    expect(document.querySelector(".oInner")).toBeInTheDocument();
  });

  test("no renderiza la línea ganadora si no hay ganador", () => {
    render(
      <Board
        board={Array(9).fill(null)}
        turn="X"
        checkWinner={() => ({ winner: null })}
        showWinningLine={true}
        handleClick={jest.fn()}
      />
    );

    expect(document.querySelector(".winningLine")).toBeNull();
  });
});
