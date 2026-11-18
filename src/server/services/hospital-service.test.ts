import { beforeEach, describe, expect, it, vi } from "vitest";
import { hospitalInfoTbl, inpatientsInfoTbl } from "@/server/db/schema";
import {
  getHospitalInfo,
  getInpatients,
} from "@/server/services/hospital-service";
import { sampleHospital, sampleInpatients } from "@/test-data";

const query = vi.hoisted(() => ({
  select: vi.fn(),
  from: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
}));

vi.mock("@/server/db/client", () => ({ getDb: () => query }));

describe("hospital service", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    query.select.mockReturnValue(query);
    query.from.mockReturnValue(query);
    query.where.mockReturnValue(query);
    query.orderBy.mockReturnValue(query);
  });

  describe("getHospitalInfo", () => {
    it("returns the first hospital row", async () => {
      query.limit.mockResolvedValue([sampleHospital]);

      await expect(getHospitalInfo()).resolves.toEqual(sampleHospital);
      expect(query.from).toHaveBeenCalledWith(hospitalInfoTbl);
      expect(query.limit).toHaveBeenCalledWith(1);
    });

    it("returns null when there is no hospital row", async () => {
      query.limit.mockResolvedValue([]);

      await expect(getHospitalInfo()).resolves.toBeNull();
    });
  });

  describe("getInpatients", () => {
    it("returns the hospital's in-patients", async () => {
      query.orderBy.mockResolvedValue(sampleInpatients);

      await expect(getInpatients(1)).resolves.toEqual(sampleInpatients);
      expect(query.from).toHaveBeenCalledWith(inpatientsInfoTbl);
      expect(query.where).toHaveBeenCalledTimes(1);
      expect(query.orderBy).toHaveBeenCalledTimes(1);
    });
  });
});
