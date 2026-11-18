import Link from "next/link";
import { HospitalLogo } from "@/components/HospitalLogo";
import { Icon } from "@/components/Icon";
import { InfoTile } from "@/components/InfoTile";
import type { HospitalInfo } from "@/server/services/hospital-service";

type HospitalCardProps = {
  hospital: HospitalInfo;
};

export function HospitalCard({ hospital }: HospitalCardProps) {
  return (
    <section className="overflow-hidden rounded-[20px] border border-line bg-white shadow-sm">
      <div className="flex flex-col items-center gap-4 bg-tint-steel px-6 py-9 text-center">
        <HospitalLogo size={72} onDark={false} />
        <h1 className="text-3xl font-bold text-brand-navy sm:text-[38px]">
          {hospital.hospitalName}
        </h1>
      </div>

      <div className="flex flex-col items-center gap-7 px-6 pt-10 pb-11 sm:px-12">
        <dl className="grid w-full gap-6 sm:grid-cols-2">
          <InfoTile
            label="Hospital name"
            value={hospital.hospitalName}
            icon="building"
            tone="navy"
            emphasis={false}
          />
          <InfoTile
            label="Hospital address"
            value={hospital.address}
            icon="pin"
            tone="teal"
            emphasis={false}
          />
          <InfoTile
            label="Owner of hospital"
            value={hospital.ownerName}
            icon="user"
            tone="steel"
            emphasis={false}
          />
          <InfoTile
            label="Number of in-patients"
            value={String(hospital.inpatientCount)}
            icon="bed"
            tone="slate"
            emphasis
          />
        </dl>

        <Link
          href="/patients"
          className="inline-flex items-center gap-2.5 rounded-[10px] bg-brand-steel px-6.5 py-3 font-semibold text-white hover:bg-steel-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
        >
          Patients Info
          <Icon name="arrowRight" className="size-5" />
        </Link>
      </div>
    </section>
  );
}
