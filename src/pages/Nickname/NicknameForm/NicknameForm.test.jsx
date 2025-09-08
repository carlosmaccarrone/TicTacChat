import { render, screen, fireEvent } from "@testing-library/react";
import { jest } from "@jest/globals";
import React from "react";

await jest.unstable_mockModule("@/contexts/SessionContext", () => ({
  useSession: jest.fn(),
}));

const { useSession } = await import("@/contexts/SessionContext");
const NicknameForm = (await import("@/pages/Nickname/NicknameForm/NicknameForm")).default;

describe("NicknameForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  test("muestra el valor inicial del input desde sessionStorage", () => {
    sessionStorage.setItem("nickname", "Legend123");
    useSession.mockReturnValue({
      login: jest.fn(),
      loginLoading: false,
      error: "",
      setError: jest.fn(),
    });

    render(<NicknameForm />);

    expect(screen.getByPlaceholderText(/Your legendary nickname/i).value).toBe("Legend123");
  });

  test("muestra 'Joining...' cuando loginLoading es true", () => {
    useSession.mockReturnValue({
      login: jest.fn(),
      loginLoading: true,
      error: "",
      setError: jest.fn(),
    });

    render(<NicknameForm />);

    expect(screen.getByText(/Joining\.\.\./i)).toBeInTheDocument();
  });
});