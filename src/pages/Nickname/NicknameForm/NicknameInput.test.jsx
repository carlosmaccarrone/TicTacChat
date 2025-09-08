import { render, screen, fireEvent } from "@testing-library/react";
import NicknameInput from "@/pages/Nickname/NicknameForm/NicknameInput";
import { jest } from "@jest/globals";
import React from "react";

describe("NicknameInput", () => {
  test("muestra el valor del input", () => {
    render(
      <NicknameInput
        value="Legend123"
        onChange={() => {}}
        error=""
        placeholder="Your legendary nickname"
      />
    );

    const input = screen.getByPlaceholderText(/Your legendary nickname/i);
    expect(input.value).toBe("Legend123");
  });

  test("muestra el mensaje de error si error está definido", () => {
    render(
      <NicknameInput
        value=""
        onChange={() => {}}
        error="Nickname too short"
        placeholder="Your legendary nickname"
      />
    );

    expect(screen.getByText(/Nickname too short/i)).toBeInTheDocument();
  });

  test("oculta el span de error cuando no hay error", () => {
    render(
      <NicknameInput
        value=""
        onChange={() => {}}
        error=""
        placeholder="Your legendary nickname"
      />
    );

    const errorSpan = screen.getByText("placeholder");
    expect(errorSpan).toHaveStyle({ visibility: "hidden" });
  });
});