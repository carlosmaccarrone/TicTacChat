import { MemoryRouter, Routes, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { jest } from "@jest/globals";

jest.unstable_mockModule("@/components/NavbarLobby/NavbarLobby", () => ({
  __esModule: true,
  default: ({ onMount }) => {
    onMount(50);
    return <div data-testid="navbar-lobby">NavbarLobby</div>;
  },
}));

jest.unstable_mockModule("@/components/NavbarGame/NavbarGame", () => ({
  __esModule: true,
  default: ({ onMount }) => {
    onMount(60);
    return <div data-testid="navbar-game">NavbarGame</div>;
  },
}));

jest.unstable_mockModule("@/contexts/SocketContext", () => ({
  __esModule: true,
  useSocket: () => ({
    socket: { emit: jest.fn() },
    connected: true,
  }),
}));

jest.unstable_mockModule("@/contexts/ChallengeContext", () => ({
  __esModule: true,
  ChallengeProvider: ({ children }) => <div data-testid="challenge-provider">{children}</div>,
}));

jest.unstable_mockModule("@/contexts/RoomContextCpu", () => ({
  __esModule: true,
  RoomProviderCPU: ({ children }) => <div data-testid="room-cpu">{children}</div>,
}));

jest.unstable_mockModule("@/contexts/RoomContextPvp", () => ({
  __esModule: true,
  RoomProviderPVP: ({ children }) => <div data-testid="room-pvp">{children}</div>,
}));

jest.unstable_mockModule("@/contexts/UsersContext", () => ({
  __esModule: true,
  UsersProvider: ({ children }) => <div data-testid="users-provider">{children}</div>,
}));

const { default: PrivateLayout } = await import("@/layouts/PrivateLayout");

describe("PrivateLayout", () => {
  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza NavbarLobby cuando navbarType="lobby"', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<PrivateLayout navbarType="lobby" />}>
            <Route index element={<div data-testid="outlet">Outlet content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("navbar-lobby")).toBeInTheDocument();
    expect(screen.getByTestId("outlet")).toBeInTheDocument();

    // verificamos paddingTop aplicado con la altura mockeada
    const container = screen.getByTestId("outlet").parentElement;
    expect(container).toHaveStyle({
      paddingTop: "50px",
      height: "calc(100vh - 50px)",
    });
  });

  test('renderiza NavbarGame cuando navbarType="game"', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<PrivateLayout navbarType="game" />}>
            <Route index element={<div data-testid="outlet">Outlet content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("navbar-game")).toBeInTheDocument();
    expect(screen.getByTestId("outlet")).toBeInTheDocument();
  });
});