import { MemoryRouter, Routes, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { jest } from "@jest/globals";
import React from "react";

await jest.unstable_mockModule("@/contexts/SessionContext", () => ({
  useSession: jest.fn(),
}));

await jest.unstable_mockModule("@/pages/Nickname/NicknamePage", () => ({
  __esModule: true,
  default: () => <div>Nickname Page</div>,
}));
await jest.unstable_mockModule("@/pages/Lobby/Lobby", () => ({
  __esModule: true,
  default: () => <div>Lobby Page</div>,
}));
await jest.unstable_mockModule("@/pages/GamePlay/GamePlay", () => ({
  __esModule: true,
  default: () => <div>GamePlay Page</div>,
}));
await jest.unstable_mockModule("@/layouts/PrivateLayout", () => ({
  __esModule: true,
  default: ({ children }) => <div>PrivateLayout {children}</div>,
}));
await jest.unstable_mockModule("@/components/Spinner/Spinner", () => ({
  __esModule: true,
  default: () => <div>Spinner</div>,
}));

const { useSession } = await import("@/contexts/SessionContext");
const AppRoutes = (await import("@/routes/AppRoutes")).default;

describe("AppRoutes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza NicknamePage si no hay usuario logueado", async () => {
    useSession.mockReturnValue({ nickname: null, loading: false });

    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <AppRoutes />
        </MemoryRouter>
      );
    });

    expect(screen.getByText(/Nickname Page/)).toBeInTheDocument();
  });

  it("muestra Spinner mientras loading=true", async () => {
    useSession.mockReturnValue({ nickname: null, loading: true });

    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <AppRoutes />
        </MemoryRouter>
      );
    });

    expect(screen.getByText(/Spinner/)).toBeInTheDocument();
  });

  it("fallback route redirige si ruta no existe", async () => {
    useSession.mockReturnValue({ nickname: null, loading: false });

    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/noexiste"]}>
          <AppRoutes />
        </MemoryRouter>
      );
    });

    expect(screen.getByText(/Nickname Page/)).toBeInTheDocument();
  });
});