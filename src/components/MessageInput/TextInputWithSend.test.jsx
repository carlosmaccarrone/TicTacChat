import TextInputWithSend from "@/components/MessageInput/TextInputWithSend.jsx";
import { render, fireEvent } from "@testing-library/react";
import { jest } from '@jest/globals';
import React from "react";

test("renderiza input y permite enviar mensaje", () => {
  const handleChange = jest.fn();
  const handleSend = jest.fn();
  const handleFocus = jest.fn();

  const { getByPlaceholderText, getByText } = render(
    <TextInputWithSend
      value=""
      onChange={handleChange}
      onSend={handleSend}
      onFocus={handleFocus}
    />
  );

  const input = getByPlaceholderText("Type a message...");

  fireEvent.change(input, { target: { value: "Hola" } });
  expect(handleChange).toHaveBeenCalledWith("Hola");

  fireEvent.focus(input);
  expect(handleFocus).toHaveBeenCalled();

  fireEvent.keyDown(input, { key: "Enter" });
  expect(handleSend).toHaveBeenCalled();

  const button = getByText("➤");
  fireEvent.click(button);
  expect(handleSend).toHaveBeenCalledTimes(2);
});