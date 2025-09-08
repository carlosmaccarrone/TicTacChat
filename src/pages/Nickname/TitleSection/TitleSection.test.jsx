import TitleSection from "@/pages/Nickname/TitleSection/TitleSection";
import { render, screen } from "@testing-library/react";
import React from "react";

describe("TitleSection", () => {
  test("renderiza el título y el subtítulo correctamente", () => {
    const titleText = "Welcome!";
    const subtitleText = "Choose your nickname";

    render(<TitleSection title={titleText} subtitle={subtitleText} />);

    const titleEl = screen.getByText(titleText);
    expect(titleEl).toBeInTheDocument();
    expect(titleEl.tagName).toBe("H1");

    const subtitleEl = screen.getByText(subtitleText);
    expect(subtitleEl).toBeInTheDocument();
    expect(subtitleEl.tagName).toBe("P");
  });
});