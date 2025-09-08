import SubmitButton from "@/pages/Nickname/NicknameForm/SubmitButton";
import { render, screen } from "@testing-library/react";
import React from "react";

describe("SubmitButton", () => {
  test("renderiza con el texto correcto", () => {
    render(<SubmitButton>Join</SubmitButton>);

    const button = screen.getByRole("button", { name: /Join/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Join");
  });

  test("es de tipo submit", () => {
    render(<SubmitButton>Submit</SubmitButton>);

    const button = screen.getByRole("button", { name: /Submit/i });
    expect(button).toHaveAttribute("type", "submit");
  });
});