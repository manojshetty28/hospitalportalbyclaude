import { expect, test } from "@playwright/test";

test.describe("Home page", () => {
  test("shows the hospital values from the database", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 1, name: "City Care Hospital" }),
    ).toBeVisible();
    await expect(page.getByRole("banner")).toContainText("City Care Hospital");
    await expect(
      page.getByText("12 Lake View Road, Bengaluru 560001"),
    ).toBeVisible();
    await expect(page.getByText("Dr. Anita Rao")).toBeVisible();
    await expect(page.getByText("Number of in-patients")).toBeVisible();
    await expect(page.getByText("6", { exact: true })).toBeVisible();
    await expect(page.getByText("Num of Beds")).toBeVisible();
    await expect(page.getByText("50", { exact: true })).toBeVisible();
    await expect(page).toHaveTitle("Hospital Portal");
  });
});

test.describe("Navigation", () => {
  test("Patients Info opens the in-patients table and Back to Home returns", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Patients Info" }).click();

    await expect(page).toHaveURL("/patients");
    await expect(
      page.getByRole("heading", { level: 1, name: "In-patients" }),
    ).toBeVisible();
    await expect(page).toHaveTitle("In-patients | Hospital Portal");

    const rows = page.getByRole("row");
    await expect(rows).toHaveCount(7);
    await expect(rows.nth(1)).toContainText("Ravi Kumar");
    await expect(rows.nth(1)).toContainText("PC-1001");
    await expect(rows.nth(1)).toContainText("16 Nov 2026");
    await expect(rows.nth(1)).toContainText("42,500.00");
    await expect(rows.nth(1)).toContainText("Pneumonia");
    await expect(rows.nth(6)).toContainText("Lakshmi Iyer");

    await page.getByRole("link", { name: "Back to Home" }).click();
    await expect(page).toHaveURL("/");
    await expect(
      page.getByRole("heading", { level: 1, name: "City Care Hospital" }),
    ).toBeVisible();
  });

  test("an unknown page shows the not-found message", async ({ page }) => {
    const response = await page.goto("/does-not-exist");

    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { name: "Page not found" }),
    ).toBeVisible();
  });
});

test.describe("APIs", () => {
  test("GET /api/hospital returns the hospital values", async ({ request }) => {
    const response = await request.get("/api/hospital");

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({
      data: {
        hospitalName: "City Care Hospital",
        address: "12 Lake View Road, Bengaluru 560001",
        ownerName: "Dr. Anita Rao",
        inpatientCount: 6,
        bedCount: 50,
      },
    });
  });

  test("GET /api/inpatients returns six in-patients, newest admission first", async ({
    request,
  }) => {
    const response = await request.get("/api/inpatients");

    expect(response.status()).toBe(200);
    const { data } = await response.json();
    expect(data).toHaveLength(6);
    expect(data[0]).toEqual({
      patientName: "Ravi Kumar",
      cardNumber: "PC-1001",
      admissionDate: "2026-11-16",
      currentBillAmount: "42500.00",
      diseaseName: "Pneumonia",
    });
    expect(data.map((row: { cardNumber: string }) => row.cardNumber)).toEqual([
      "PC-1001",
      "PC-1002",
      "PC-1003",
      "PC-1004",
      "PC-1005",
      "PC-1006",
    ]);
  });

  test("the APIs are read-only", async ({ request }) => {
    expect((await request.post("/api/hospital")).status()).toBe(405);
    expect((await request.delete("/api/inpatients")).status()).toBe(405);
  });
});
