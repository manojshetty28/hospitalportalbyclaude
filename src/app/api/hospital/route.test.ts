import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/hospital/route";
import { getHospitalInfo } from "@/server/services/hospital-service";
import { sampleHospital } from "@/test-data";

vi.mock("next/server", () => ({ connection: vi.fn() }));
vi.mock("@/server/services/hospital-service", () => ({
  getHospitalInfo: vi.fn(),
}));

describe("GET /api/hospital", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns the hospital values", async () => {
    vi.mocked(getHospitalInfo).mockResolvedValue(sampleHospital);

    const response = await GET();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      data: {
        hospitalName: "City Care Hospital",
        address: "12 Lake View Road, Bengaluru 560001",
        ownerName: "Dr. Anita Rao",
        inpatientCount: 2,
        bedCount: 50,
      },
    });
  });

  it("returns 404 when there is no hospital", async () => {
    vi.mocked(getHospitalInfo).mockResolvedValue(null);

    const response = await GET();

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({
      error: { message: "Hospital not found" },
    });
  });

  it("returns 500 without internal detail when the query fails", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    vi.mocked(getHospitalInfo).mockRejectedValue(new Error("connection lost"));

    const response = await GET();

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: { message: "Unable to load data. Please try again." },
    });
    expect(consoleError).toHaveBeenCalled();
  });
});
