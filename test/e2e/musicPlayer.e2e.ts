import { test, expect } from "@playwright/test";

test.describe("Music Player", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test("should display and toggle the music player", async ({ page }) => {
        const toggleButton = page.getByRole("button", { name: /Open Music Player/i });
        await expect(toggleButton).toBeVisible();

        // Open player
        await toggleButton.click();

        // Check if player container is visible
        const playerContainer = page.locator("div.fixed.bottom-24.right-8");
        await expect(playerContainer).toBeVisible();

        // Close/Minimize player
        const closeButton = page.getByLabel("Minimize Player");
        await closeButton.click();

        // Check if it's hidden (we check for opacity-0 or pointer-events-none classes)
        await expect(playerContainer).toHaveClass(/opacity-0/);
    });

    test("should show correct track information when opened", async ({ page }) => {
        await page.getByRole("button", { name: /Open Music Player/i }).click();

        // Check for track title and artist
        // Note: We use the actual titles from our tracks constant
        await expect(page.locator("text=The World")).toBeVisible();
        await expect(page.locator("text=Death Note")).toBeVisible();
    });
});

test.describe("Navigation", () => {
    test("should navigate to shelves correctly", async ({ page }) => {
        await page.goto("/");

        // Navigate to Anime Shelf
        await page.getByRole("link", { name: /Anime/i }).first().click();
        await expect(page).toHaveURL(/\/animeshelf/);
        await expect(page.locator("h1")).toContainText(/Anime/i);
    });
});
