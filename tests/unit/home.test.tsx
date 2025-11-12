import React from "react";
import { render, screen } from "@testing-library/react";
import { TypingIntro } from "@/components/home/typing-intro";
import { vi } from "vitest";

describe("TypingIntro", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("types out Luv Gupta", () => {
    render(<TypingIntro />);

    vi.advanceTimersByTime(2000);

    expect(screen.getByRole("heading").textContent).toContain("Luv Gupta");
  });

  it("shows navigation links", () => {
    render(<TypingIntro />);

    const labels = ["Blogs", "Experience", "Projects"];
    labels.forEach((label) => {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    });
  });

  it("cycles to another phrase", () => {
    render(<TypingIntro />);

    vi.advanceTimersByTime(6000);

    expect(screen.getByRole("heading").textContent).toMatch(/Software Engineer/);
  });
});
