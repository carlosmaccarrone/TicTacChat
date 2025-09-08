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

const useSocket = await jest.unstable_mockModule(
  "@/contexts/SocketContext",
  () => ({
    useSocket: () => ({
      socket: {
        on: jest.fn(),
        off: jest.fn(),
      },
    }),
  })
);

const useNotifyDisconnect = await jest.unstable_mockModule(
  "@/hooks/useNotifyDisconnect",
  () => ({
    useNotifyDisconnect: () => jest.fn(),
  })
);

const useNavigate = await jest.unstable_mockModule(
  "react-router-dom",
  () => ({
    useNavigate: () => jest.fn(),
    useSearchParams: () => [new URLSearchParams("mode=pvp")],
  })
);

const useRoomCPU = await jest.unstable_mockModule(
  "@/contexts/RoomContextCpu",
  () => ({ useRoomCPU: () => ({ scores: { me: 3, opponent: 2 } }) })
);

const useRoomPVP = await jest.unstable_mockModule(
  "@/contexts/RoomContextPvp",
  () => ({ useRoomPVP: () => ({ scores: { me: 5, opponent: 1 } }) })
);

const { default: NavbarGame } = await import("@/components/NavbarGame/NavbarGame.jsx");

test("renderiza scores y boton Lobby", () => {
  const onMount = jest.fn();
  const { getByText, getByTestId } = render(<NavbarGame onMount={onMount} />);

	const centerSlot = getByTestId("center-slot");
	expect(centerSlot.textContent).toContain("Me:");
	expect(centerSlot.textContent).toContain("Opponent:");
	expect(centerSlot.textContent).toContain("5");
	expect(centerSlot.textContent).toContain("1");

  const lobbyButton = getByText("Lobby");
  fireEvent.click(lobbyButton);
});
