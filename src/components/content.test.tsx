import { render, screen } from "@testing-library/react";
import { notFound } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { HomeContent } from "@/components/HomeContent";
import { InpatientsContent } from "@/components/InpatientsContent";
import {
  getHospitalInfo,
  getInpatients,
} from "@/server/services/hospital-service";
import { sampleHospital, sampleInpatients } from "@/test-data";

vi.mock("next/server", () => ({ connection: vi.fn() }));
vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));
vi.mock("@/server/services/hospital-service", () => ({
  getHospitalInfo: vi.fn(),
  getInpatients: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("HomeContent", () => {
  it("shows the hospital name in the top bar and the hospital card", async () => {
    vi.mocked(getHospitalInfo).mockResolvedValue(sampleHospital);

    render(await HomeContent());

    expect(screen.getByRole("banner")).toHaveTextContent("City Care Hospital");
    expect(
      screen.getByRole("heading", { level: 1, name: "City Care Hospital" }),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: "Patients Info" })).toBeVisible();
  });

  it("shows the not-found page when there is no hospital", async () => {
    vi.mocked(getHospitalInfo).mockResolvedValue(null);

    await expect(HomeContent()).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalled();
  });
});

describe("InpatientsContent", () => {
  it("shows the in-patients table and the Back to Home link", async () => {
    vi.mocked(getHospitalInfo).mockResolvedValue(sampleHospital);
    vi.mocked(getInpatients).mockResolvedValue(sampleInpatients);

    render(await InpatientsContent());

    expect(getInpatients).toHaveBeenCalledWith(1);
    expect(
      screen.getByRole("heading", { level: 1, name: "In-patients" }),
    ).toBeVisible();
    expect(screen.getAllByRole("row")).toHaveLength(3);
    expect(screen.getByRole("link", { name: "Back to Home" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("shows the not-found page when there is no hospital", async () => {
    vi.mocked(getHospitalInfo).mockResolvedValue(null);

    await expect(InpatientsContent()).rejects.toThrow("NEXT_NOT_FOUND");
    expect(getInpatients).not.toHaveBeenCalled();
  });
});
