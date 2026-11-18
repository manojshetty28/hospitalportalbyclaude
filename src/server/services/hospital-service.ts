import "server-only";
import { asc, desc, eq } from "drizzle-orm";
import { getDb } from "@/server/db/client";
import { hospitalInfoTbl, inpatientsInfoTbl } from "@/server/db/schema";

export type HospitalInfo = {
  hospitalId: number;
  hospitalName: string;
  address: string;
  ownerName: string;
  inpatientCount: number;
};

export type Inpatient = {
  inpatientId: number;
  patientName: string;
  cardNumber: string;
  admissionDate: string;
  currentBillAmount: string;
  diseaseName: string;
};

/** Returns the hospital record, or `null` if none exists. */
export async function getHospitalInfo(): Promise<HospitalInfo | null> {
  const rows = await getDb()
    .select({
      hospitalId: hospitalInfoTbl.hospitalId,
      hospitalName: hospitalInfoTbl.hospitalName,
      address: hospitalInfoTbl.address,
      ownerName: hospitalInfoTbl.ownerName,
      inpatientCount: hospitalInfoTbl.inpatientCount,
    })
    .from(hospitalInfoTbl)
    .orderBy(asc(hospitalInfoTbl.hospitalId))
    .limit(1);

  return rows[0] ?? null;
}

/** Returns the hospital's in-patients, newest admission first. */
export async function getInpatients(hospitalId: number): Promise<Inpatient[]> {
  return getDb()
    .select({
      inpatientId: inpatientsInfoTbl.inpatientId,
      patientName: inpatientsInfoTbl.patientName,
      cardNumber: inpatientsInfoTbl.cardNumber,
      admissionDate: inpatientsInfoTbl.admissionDate,
      currentBillAmount: inpatientsInfoTbl.currentBillAmount,
      diseaseName: inpatientsInfoTbl.diseaseName,
    })
    .from(inpatientsInfoTbl)
    .where(eq(inpatientsInfoTbl.hospitalId, hospitalId))
    .orderBy(
      desc(inpatientsInfoTbl.admissionDate),
      asc(inpatientsInfoTbl.inpatientId),
    );
}
