import { render, fireEvent } from "@testing-library/react";
import { jest } from '@jest/globals';
import React from "react";

const TextInputWithSend = (await jest.unstable_mockModule(
  "@/components/MessageInput/TextInputWithSend",
  () => ({
    default: React.forwardRef(({ value, onChange, onSend }, ref) => (
      <input
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        data-testid="text-input"
      />
    )),
  })
));

const EmojiPicker = (await jest.unstable_mockModule(
  "@/components/MessageInput/EmojiPicker",
  () => ({
    default: ({ onEmojiClick }) => (
      <span data-testid="emoji" onClick={() => onEmojiClick("😀")}>😀</span>
    ),
  })
));


const { default: MessageInput } = await import("@/components/MessageInput/MessageInput.jsx");

test("envía mensaje y agrega emoji", () => {
  const handleSend = jest.fn();
  const { getByTestId, getByText } = render(<MessageInput onSend={handleSend} />);

  const input = getByTestId("text-input");
  fireEvent.change(input, { target: { value: "Hola" } });

	const emojiButton = getByText("🙂");
	fireEvent.click(emojiButton);

	const emoji = getByTestId("emoji");
	fireEvent.click(emoji);

	expect(input.value).toBe("Hola😀");

	fireEvent.keyDown(input, { key: "Enter" });
	expect(handleSend).toHaveBeenCalledWith("Hola😀");
});
