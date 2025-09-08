import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import UserItem from "@/pages/Lobby/UserList/UserItem";
import { jest } from "@jest/globals";

describe("UserItem", () => {
  const defaultUser = { nickname: "Alice", status: "idle" };
  const ownNickname = "Bob";
  const onChallenge = jest.fn();

  afterEach(() => cleanup());
  beforeEach(() => jest.clearAllMocks());

  test("muestra el nickname con color correcto según status", () => {
    const { rerender } = render(
      <UserItem user={defaultUser} ownNickname={ownNickname} onChallenge={onChallenge} />
    );
    let nicknameEl = screen.getByText(/Alice/);
    expect(nicknameEl).toHaveStyle({ color: "rgb(0, 128, 0)" });

    rerender(
      <UserItem user={{ ...defaultUser, status: "busy" }} ownNickname={ownNickname} onChallenge={onChallenge} />
    );
    nicknameEl = screen.getByText(/Alice/);
    expect(nicknameEl).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });

  test("muestra el botón de challenge solo si corresponde", () => {
    render(<UserItem user={defaultUser} ownNickname={ownNickname} onChallenge={onChallenge} />);
    expect(screen.getByRole("button", { name: /⚔️/ })).toBeInTheDocument();

    cleanup();

    render(<UserItem user={defaultUser} ownNickname="Alice" onChallenge={onChallenge} />);
    expect(screen.queryByRole("button")).toBeNull();

    cleanup();

    render(
      <UserItem user={{ ...defaultUser, status: "busy" }} ownNickname={ownNickname} onChallenge={onChallenge} />
    );
    expect(screen.queryByRole("button")).toBeNull();
  });

  test("llama a onChallenge al clickear el botón", () => {
    render(<UserItem user={defaultUser} ownNickname={ownNickname} onChallenge={onChallenge} />);
    const button = screen.getByRole("button", { name: /⚔️/ });
    fireEvent.click(button);
    expect(onChallenge).toHaveBeenCalledWith("Alice");
  });
});