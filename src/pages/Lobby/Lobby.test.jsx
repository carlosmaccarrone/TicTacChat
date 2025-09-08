import { render, screen, fireEvent } from "@testing-library/react";
import { jest } from "@jest/globals";
import React from "react";

await jest.unstable_mockModule("@/contexts/ChallengeContext", () => ({
  useChallenge: jest.fn(),
}));

await jest.unstable_mockModule("@/contexts/UsersContext", () => ({
  useUsers: jest.fn(),
}));

await jest.unstable_mockModule("@/contexts/SessionContext", () => ({
  useSession: jest.fn(),
}));

await jest.unstable_mockModule("@/hooks/useElementHeight", () => ({
  useElementHeight: jest.fn(),
}));

const { useChallenge } = await import("@/contexts/ChallengeContext");
const { useUsers } = await import("@/contexts/UsersContext");
const { useSession } = await import("@/contexts/SessionContext");
const { useElementHeight } = await import("@/hooks/useElementHeight");

const LobbyPage = (await import("@/pages/Lobby/Lobby")).default;

describe("LobbyPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza UserList y chat sin challenge", () => {
    useSession.mockReturnValue({ nickname: "Me" });

    useChallenge.mockReturnValue({
      challenge: null,
      startChallenge: jest.fn(),
      acceptChallenge: jest.fn(),
      declineChallenge: jest.fn(),
      cancelChallenge: jest.fn(),
    });

    useUsers.mockReturnValue({
      users: [],
      loadingUsers: false,
      messages: [{ text: "Hello" }],
      sendMessage: jest.fn(),
    });

    useElementHeight.mockReturnValue([React.createRef(), 50]);

    render(<LobbyPage />);

    expect(screen.getByText(/users online/i) || screen.getByText(/Loading users/i)).toBeInTheDocument();

    expect(screen.getByText(/Hello/)).toBeInTheDocument();

    expect(screen.queryByText(/challenged/)).toBeNull();
  });

  test("renderiza ChallengePopup si hay challenge", () => {
    const acceptChallenge = jest.fn();
    const declineChallenge = jest.fn();
    const cancelChallenge = jest.fn();

    useSession.mockReturnValue({ nickname: "Bob" })

    useChallenge.mockReturnValue({
      challenge: { from: "Alice", to: "Bob" },
      startChallenge: jest.fn(),
      acceptChallenge,
      declineChallenge,
      cancelChallenge,
    });

    useUsers.mockReturnValue({
      users: [],
      loadingUsers: false,
      messages: [],
      sendMessage: jest.fn(),
    });
    useElementHeight.mockReturnValue([React.createRef(), 0]);

    render(<LobbyPage />);

    expect(screen.getByText(/Alice challenged/)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Accept/));
    fireEvent.click(screen.getByText(/Decline/));

    expect(acceptChallenge).toHaveBeenCalled();
    expect(declineChallenge).toHaveBeenCalled();
  });
});