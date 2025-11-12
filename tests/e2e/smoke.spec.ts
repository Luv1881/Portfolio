import { test, expect } from "@playwright/test";

const HOME_TITLE = "Luv Gupta — Product Engineer";

test.describe("landing", () => {
  test("renders hero", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(HOME_TITLE);
    await expect(page.getByRole("heading", { name: "Luv Gupta" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Projects" })).toBeVisible();
  });
});
