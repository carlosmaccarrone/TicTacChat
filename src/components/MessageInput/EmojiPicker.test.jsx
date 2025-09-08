import EmojiPicker from "@/components/MessageInput/EmojiPicker.jsx";
import { render, fireEvent } from "@testing-library/react";
import { jest } from '@jest/globals';

test("click en emoji llama a onEmojiClick con el emoji correcto", () => {
  const handleClick = jest.fn();
  const { getByText } = render(<EmojiPicker onEmojiClick={handleClick} />);

  const emoji = "😀";
  const emojiNode = getByText(emoji);

  fireEvent.click(emojiNode);

  expect(handleClick).toHaveBeenCalledWith(emoji);
});