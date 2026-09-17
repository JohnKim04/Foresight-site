import { expect, test, type Page } from "@playwright/test";

async function reachCheckIn(page: Page) {
  await page.getByRole("link", { name: "Explore the iOS app" }).click();
  await page.getByRole("link", { name: "Try the flow" }).click();
  await page.getByLabel("Journal entry").fill("I went for a run after work.");
  await page.getByLabel("Social").focus();
  await page.getByLabel("Social").press("Space");
  await page.getByRole("button", { name: "Schedule a check-in" }).click();
  await page.getByLabel("Later today").focus();
  await page.getByLabel("Later today").press("Space");
  await page.getByRole("button", { name: "Continue to check-in" }).click();
}

test("shows current iOS capabilities, authentic screenshots, and planned work separately", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Foresight: Notice what follows.");
  await expect(page.getByRole("heading", { name: "The app, as it is today." })).toBeVisible();
  await expect(page.getByText("Check In · available in the iOS build")).toBeVisible();
  await expect(page.getByText("Planned · not in the current build")).toHaveCount(3);
  await expect(page.getByRole("img", { name: /Foresight iOS Patterns showing/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "View iOS source" })).toHaveAttribute("href", "https://github.com/JohnKim04/Foresight-iOS");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://foresight-info.vercel.app");
  const screenshots = page.getByRole("img", { name: /Foresight iOS (Journal|Check In|Patterns)/ });
  await expect(screenshots).toHaveCount(3);
  for (const screenshot of await screenshots.all()) {
    await expect.poll(() => screenshot.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
});

test("walks through the sample flow and keeps edits until restart", async ({ page }) => {
  await page.goto("/");
  await reachCheckIn(page);
  const patternButton = page.getByRole("button", { name: "See sample pattern" });
  await expect(patternButton).toBeDisabled();
  await page.getByLabel("A little better").focus();
  await page.getByLabel("A little better").press("Space");
  await patternButton.click();
  await expect(page.getByText("Workout was followed by feeling better in 10 of 12 later check-ins.")).toBeVisible();
  await page.getByRole("button", { name: "Back" }).click();
  await page.getByRole("button", { name: "Back" }).click();
  await expect(page.getByLabel("Later today")).toBeChecked();
  await page.getByRole("button", { name: "Back" }).click();
  await expect(page.getByLabel("Journal entry")).toHaveValue("I went for a run after work.");
  await page.getByRole("button", { name: "Restart preview" }).click();
  await expect(page.getByRole("heading", { name: "Write what happened." })).toBeFocused();
});

test("serves metadata routes", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  const openGraphImage = await request.get("/opengraph-image");
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toMatch(/User-Agent: \*/);
  expect(openGraphImage.ok()).toBeTruthy();
  expect(openGraphImage.headers()["content-type"]).toContain("image/png");
});
