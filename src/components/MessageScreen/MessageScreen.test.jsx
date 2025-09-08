import { render } from "@testing-library/react";
import { jest } from '@jest/globals';
import React from "react";

const useSessionModule = await jest.unstable_mockModule(
  "@/contexts/SessionContext",
  () => ({
    useSession: () => ({ nickname: "Charly" }),
  })
);

const { default: MessageScreen } = await import("@/components/MessageScreen/MessageScreen.jsx");

test("renderiza mensajes y aplica estilos según el remitente", () => {
  const messages = [
    { from: "Charly", text: "Hola" },
    { from: "Pipita", text: "Hola Charly" },
  ];

  const { getByText, container } = render(<MessageScreen messages={messages} />);

  const ownMsg = getByText("Hola");
  expect(ownMsg.parentElement.className).toMatch(/own/);

  const otherMsg = getByText("Hola Charly");
  expect(otherMsg.parentElement.className).not.toMatch(/own/);

  const sender = getByText("Pipita");
  expect(sender).toBeInTheDocument();

  const containerDiv = container.firstChild;
  expect(containerDiv.scrollTop).toBe(0);
});