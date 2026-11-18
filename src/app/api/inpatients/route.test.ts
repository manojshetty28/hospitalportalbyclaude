import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/inpatients/route";
import {
  getHospitalInfo,
  getInpatients,
} from "@/server/services/hospital-service";
import { sampleHospital, sampleInpatients } from "@/test-data";

vi.mock("next/server", () => ({ connection: vi.fn() }));
vi.mock("@/server/services/hospital-service", () => ({
  getHospitalInfo: vi.fn(),
  getInpatients: vi.fn(),
}));

describe("GET /api/inpatients", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns the in-patients without internal ids", async () => {
    vi.mocked(getHospitalInfo).mockResolvedValue(sampleHospital);
    vi.mocked(getInpatients).mockResolvedValue(sampleInpatients);

    const response = await GET();

    expect(response.status).toBe(200);
    expect(getInpatients).toHaveBeenCalledWith(1);
    await expect(response.json()).resolves.toEqual({
      data: [
        {
          patientName: "Ravi Kumar",
          cardNumber: "PC-1001",
          admissionDate: "2026-11-16",
          currentBillAmount: "42500.00",
          diseaseName: "Pneumonia",
        },
        {
          patientName: "Meera Nair",
          cardNumber: "PC-1002",
          admissionDate: "2026-11-15",
          currentBillAmount: "124300.00",
          diseaseName: "Dengue fever",
        },
      ],
    });
  });

  it("returns 404 when there is no hospital", async () => {
    vi.mocked(getHospitalInfo).mockResolvedValue(null);

    const response = await GET();

    expect(response.status).toBe(404);
    expect(getInpatients).not.toHaveBeenCalled();
  });

  it("returns 500 without internal detail when the query fails", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    vi.mocked(getHospitalInfo).mockResolvedValue(sampleHospital);
    vi.mocked(getInpatients).mockRejectedValue(new Error("connection lost"));

    const response = await GET();

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: { message: "Unable to load data. Please try again." },
    });
    expect(consoleError).toHaveBeenCalled();
  });
});
