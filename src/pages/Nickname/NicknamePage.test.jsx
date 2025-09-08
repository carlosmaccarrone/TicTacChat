import NicknamePage from "@/pages/Nickname/NicknamePage";
import { render, screen } from "@testing-library/react";
import React from "react";

describe("NicknamePage", () => {
  test("renderiza TitleSection y NicknameForm", () => {
    render(<NicknamePage />);

    expect(screen.getByText("Tic-Tac-Chat")).toBeInTheDocument();
    expect(screen.getByText("Pick a nickname")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Your legendary nickname")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /join/i })).toBeInTheDocument();
  });
});