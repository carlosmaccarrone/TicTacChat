import { render, fireEvent } from "@testing-library/react";
import { jest } from '@jest/globals';
import React from "react";

const NavbarTemplate = await jest.unstable_mockModule(
  "@/components/NavbarTemplate/NavbarTemplate",
  () => ({
    default: ({ centerSlot, rightSlot }) => (
      <div>
        <div data-testid="center-slot">{centerSlot}</div>
        <div data-testid="right-slot">{rightSlot}</div>
      </div>
    ),
  })
);

const useSession = await jest.unstable_mockModule(
  "@/contexts/SessionContext",
  () => ({
    useSession: () => ({ logout: jest.fn() }),
  })
);

const useNavigate = await jest.unstable_mockModule(
  "react-router-dom",
  () => ({
    useNavigate: () => jest.fn(),
  })
);

const { default: NavbarLobby } = await import("@/components/NavbarLobby/NavbarLobby.jsx");

test("renderiza botones y llama a funciones al hacer click", () => {
  const onMount = jest.fn();
  const { getByText } = render(<NavbarLobby onMount={onMount} />);

  const logoutButton = getByText("Logout");
  fireEvent.click(logoutButton);

  const vsCPUButton = getByText("vs CPU");
  fireEvent.click(vsCPUButton);
});
