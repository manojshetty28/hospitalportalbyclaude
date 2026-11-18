import { formatAmount, formatDate, getInitials } from "@/lib/format";
import { NO_INPATIENTS_MESSAGE } from "@/lib/messages";
import type { Inpatient } from "@/server/services/hospital-service";

type InpatientsTableProps = {
  inpatients: Inpatient[];
};

const HEADER_CELL =
  "px-6 py-4 text-left text-[13px] font-semibold text-brand-navy";

export function InpatientsTable({ inpatients }: InpatientsTableProps) {
  if (inpatients.length === 0) {
    return (
      <p className="rounded-[14px] border border-line bg-white px-6 py-10 text-center text-muted">
        {NO_INPATIENTS_MESSAGE}
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-[14px] border border-line bg-white shadow-sm">
      <table className="w-full min-w-[820px] border-collapse text-[15px]">
        <thead className="bg-tint-steel">
          <tr>
            <th scope="col" className={HEADER_CELL}>
              Patient name
            </th>
            <th scope="col" className={HEADER_CELL}>
              Patient card number
            </th>
            <th scope="col" className={HEADER_CELL}>
              Admission date
            </th>
            <th scope="col" className={HEADER_CELL}>
              Current bill amount
            </th>
            <th scope="col" className={HEADER_CELL}>
              Disease name
            </th>
          </tr>
        </thead>
        <tbody>
          {inpatients.map((inpatient) => (
            <tr key={inpatient.inpatientId} className="border-t border-line">
              <td className="px-6 py-3.5">
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex size-9 shrink-0 items-center justify-center rounded-full bg-tint-steel text-[13px] font-semibold text-steel-dark"
                  >
                    {getInitials(inpatient.patientName)}
                  </span>
                  <span className="font-semibold text-ink">
                    {inpatient.patientName}
                  </span>
                </span>
              </td>
              <td className="px-6 py-3.5 font-medium text-steel-dark">
                {inpatient.cardNumber}
              </td>
              <td className="px-6 py-3.5 text-muted">
                {formatDate(inpatient.admissionDate)}
              </td>
              <td className="px-6 py-3.5 font-semibold text-ink">
                {formatAmount(inpatient.currentBillAmount)}
              </td>
              <td className="px-6 py-3.5">
                <span className="inline-block rounded-full bg-tint-teal px-3 py-1.5 text-[13px] font-semibold text-teal-dark">
                  {inpatient.diseaseName}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
