import { render, screen, fireEvent, within } from "@testing-library/react";
import { jest } from "@jest/globals";
import React from "react";

let UserList, useSession, useUsers;

beforeAll(async () => {
  await jest.unstable_mockModule("@/contexts/SessionContext", () => ({
    useSession: jest.fn(),
  }));
  await jest.unstable_mockModule("@/contexts/UsersContext", () => ({
    useUsers: jest.fn(),
  }));

  UserList = (await import("@/pages/Lobby/UserList/UserList")).default;
  ({ useSession } = await import("@/contexts/SessionContext"));
  ({ useUsers } = await import("@/contexts/UsersContext"));
});

describe("UserList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("llama a setCollapsed al clickear el botón", () => {
    useSession.mockReturnValue({ nickname: "Me" });
    useUsers.mockReturnValue({ users: [], loadingUsers: false });
    const setCollapsed = jest.fn();

    render(
      <UserList
        isCollapsed={false}
        setCollapsed={setCollapsed}
        onChallenge={jest.fn()}
      />
    );

    const title = screen.getAllByText(/users online/)[0].closest("div");
    const button = within(title).getByRole("button", { name: /◀️/ });

    fireEvent.click(button);

    expect(setCollapsed).toHaveBeenCalledWith(true);
  });
});