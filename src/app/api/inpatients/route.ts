import { connection } from "next/server";
import { LOAD_ERROR_MESSAGE } from "@/lib/messages";
import {
  getHospitalInfo,
  getInpatients,
} from "@/server/services/hospital-service";

export async function GET(): Promise<Response> {
  await connection();

  try {
    const hospital = await getHospitalInfo();
    if (!hospital) {
      return Response.json(
        { error: { message: "Hospital not found" } },
        { status: 404 },
      );
    }
    const inpatients = await getInpatients(hospital.hospitalId);
    return Response.json({
      data: inpatients.map((inpatient) => ({
        patientName: inpatient.patientName,
        cardNumber: inpatient.cardNumber,
        admissionDate: inpatient.admissionDate,
        currentBillAmount: inpatient.currentBillAmount,
        diseaseName: inpatient.diseaseName,
      })),
    });
  } catch (error) {
    console.error("GET /api/inpatients failed", error);
    return Response.json(
      { error: { message: LOAD_ERROR_MESSAGE } },
      { status: 500 },
    );
  }
}
