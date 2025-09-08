import NavbarTemplate from "@/components/NavbarTemplate/NavbarTemplate.jsx";
import { render } from "@testing-library/react";
import { jest } from '@jest/globals';
import React from "react";

test("renderiza slots y llama a onMount", () => {
  const onMount = jest.fn();

  const originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight');
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 100 });

  const centerSlot = <span data-testid="center-slot">Center</span>;
  const rightSlot = <span data-testid="right-slot">Right</span>;

  const { getByText, getByTestId } = render(
    <NavbarTemplate centerSlot={centerSlot} rightSlot={rightSlot} onMount={onMount} />
  );

  expect(getByText("Tic-Tac-Toe")).toBeInTheDocument();
  expect(getByText("by Carlos Maccarrone")).toBeInTheDocument();

  expect(getByTestId("center-slot")).toBeInTheDocument();
  expect(getByTestId("right-slot")).toBeInTheDocument();

  expect(onMount).toHaveBeenCalledWith(100);

  if (originalOffsetHeight) {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight);
  }
});
