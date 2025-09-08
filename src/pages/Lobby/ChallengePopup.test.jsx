import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { jest } from "@jest/globals";

await jest.unstable_mockModule("@/contexts/SessionContext", () => ({
  useSession: jest.fn(),
}));

const { useSession } = await import("@/contexts/SessionContext");

const ChallengePopup = (await import("@/pages/Lobby/ChallengePopup")).default;

describe("ChallengePopup", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("muestra mensaje y botón de cancel si soy el que desafía", () => {
    useSession.mockReturnValue({ nickname: "Alice" });

    const onCancel = jest.fn();
    render(
      <ChallengePopup
        from="Alice"
        to="Bob"
        onCancel={onCancel}
        onAccept={jest.fn()}
        onDecline={jest.fn()}
      />
    );

    expect(screen.getByText(/You challenged Bob!/)).toBeInTheDocument();
    const cancelButton = screen.getByText(/Cancel Challenge/);
    fireEvent.click(cancelButton);
    expect(onCancel).toHaveBeenCalled();
  });

  test("muestra mensaje y botones de accept/decline si soy el desafiado", () => {
    useSession.mockReturnValue({ nickname: "Bob" });

    const onAccept = jest.fn();
    const onDecline = jest.fn();

    render(
      <ChallengePopup
        from="Alice"
        to="Bob"
        onCancel={jest.fn()}
        onAccept={onAccept}
        onDecline={onDecline}
      />
    );

    expect(screen.getByText(/Alice challenged you!/)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Accept/));
    fireEvent.click(screen.getByText(/Decline/));

    expect(onAccept).toHaveBeenCalled();
    expect(onDecline).toHaveBeenCalled();
  });

  test("no muestra botones si no estoy involucrado", () => {
    useSession.mockReturnValue({ nickname: "Charlie" });

    render(
      <ChallengePopup
        from="Alice"
        to="Bob"
        onCancel={jest.fn()}
        onAccept={jest.fn()}
        onDecline={jest.fn()}
      />
    );

    expect(screen.queryByText(/Cancel Challenge/)).toBeNull();
    expect(screen.queryByText(/Accept/)).toBeNull();
    expect(screen.queryByText(/Decline/)).toBeNull();
  });
});