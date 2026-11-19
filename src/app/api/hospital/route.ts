import { connection } from "next/server";
import { LOAD_ERROR_MESSAGE } from "@/lib/messages";
import { getHospitalInfo } from "@/server/services/hospital-service";

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
    return Response.json({
      data: {
        hospitalName: hospital.hospitalName,
        address: hospital.address,
        ownerName: hospital.ownerName,
        inpatientCount: hospital.inpatientCount,
        bedCount: hospital.bedCount,
      },
    });
  } catch (error) {
    console.error("GET /api/hospital failed", error);
    return Response.json(
      { error: { message: LOAD_ERROR_MESSAGE } },
      { status: 500 },
    );
  }
}
