import { notFound } from "next/navigation";
import { connection } from "next/server";
import { HospitalCard } from "@/components/HospitalCard";
import { TopBar } from "@/components/TopBar";
import { getHospitalInfo } from "@/server/services/hospital-service";

/** Home page body. Reads the hospital record on every request. */
export async function HomeContent() {
  await connection();

  const hospital = await getHospitalInfo();
  if (!hospital) {
    notFound();
  }

  return (
    <>
      <TopBar title={hospital.hospitalName} />
      <main className="mx-auto w-full max-w-[928px] px-4 py-10 sm:px-6 sm:py-16">
        <HospitalCard hospital={hospital} />
      </main>
    </>
  );
}
