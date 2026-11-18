import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Icon } from "@/components/Icon";
import { InpatientsTable } from "@/components/InpatientsTable";
import { TopBar } from "@/components/TopBar";
import {
  getHospitalInfo,
  getInpatients,
} from "@/server/services/hospital-service";

/** In-patients page body. Reads the in-patient records on every request. */
export async function InpatientsContent() {
  await connection();

  const hospital = await getHospitalInfo();
  if (!hospital) {
    notFound();
  }
  const inpatients = await getInpatients(hospital.hospitalId);

  return (
    <>
      <TopBar title={hospital.hospitalName} />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-11">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-[32px] font-bold text-brand-navy">In-patients</h1>
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 rounded-[10px] border-[1.5px] border-brand-steel bg-white px-6 py-3 font-semibold text-steel-dark hover:bg-tint-steel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
          >
            <Icon name="arrowLeft" className="size-5" />
            Back to Home
          </Link>
        </div>
        <InpatientsTable inpatients={inpatients} />
      </main>
    </>
  );
}
