import { expect, test, type Page } from "@playwright/test";

async function reachCheckIn(page: Page) {
  await page.getByRole("link", { name: "Explore the preview" }).click();
  await page.getByRole("button", { name: "Continue to clarify" }).click();
  await page.getByLabel("Activity").fill("Evening run");
  await page.getByRole("button", { name: "Confirm details" }).click();
}

test("completes the fictional preview, preserves local edits, and restarts", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Foresight — Notice what your choices change.");
  await expect(page.getByRole("heading", { name: "Notice what your choices change." })).toBeVisible();
  await reachCheckIn(page);

  const patternButton = page.getByRole("button", { name: "See example pattern" });
  await expect(patternButton).toBeDisabled();
  const response = page.getByLabel("A little better");
  await response.focus();
  await response.press("Space");
  await expect(response).toBeChecked();
  await patternButton.click();

  await expect(page.getByText("In 7 of 9 confirmed after-work workouts, you felt better later that evening.")).toBeVisible();
  await expect(page.getByText("This is an association from confirmed example data, not a cause-and-effect conclusion.")).toBeVisible();

  await page.getByRole("button", { name: "Back" }).click();
  await page.getByRole("button", { name: "Back" }).click();
  await expect(page.getByLabel("Activity")).toHaveValue("Evening run");
  await page.getByRole("button", { name: "Confirm details" }).click();
  await expect(response).toBeChecked();
  await patternButton.click();
  await page.getByRole("button", { name: "Restart preview" }).click();

  await expect(page.getByRole("heading", { name: "Capture the moment as it happened." })).toBeFocused();
  await expect(page.getByText("1 of 4 · Log")).toBeVisible();
});

test("completes the preview with reduced motion enabled", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await reachCheckIn(page);
  const response = page.getByLabel("Much better");
  await response.focus();
  await response.press("Space");
  await page.getByRole("button", { name: "See example pattern" }).click();

  await expect(page.getByRole("heading", { name: "A pattern worth revisiting." })).toBeVisible();
});

test("shows the current mobile app and links to its source", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "The app, today." })).toBeVisible();
  await expect(page.getByText("All activity")).toBeVisible();
  await expect(page.getByRole("link", { name: "View app source" })).toHaveAttribute("href", "https://github.com/JohnKim04/Foresight");
});

test("serves the public metadata routes", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  const openGraphImage = await request.get("/opengraph-image");

  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toMatch(/User-Agent: \*/);
  expect(openGraphImage.ok()).toBeTruthy();
  expect(openGraphImage.headers()["content-type"]).toContain("image/png");
});
