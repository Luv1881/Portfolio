import { clsx, type ClassValue } from "clsx";

/**
 * Utility helper to conditionally combine class names using Tailwind tokens.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
