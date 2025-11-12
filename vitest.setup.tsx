import type { ReactNode } from "react";
import React from "react";
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

const globalWithReact = globalThis as typeof globalThis & {
  React: typeof React;
};

globalWithReact.React = React;

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));
