import type {
  HospitalInfo,
  Inpatient,
} from "@/server/services/hospital-service";

/** Synthetic records shared by unit tests. */
export const sampleHospital: HospitalInfo = {
  hospitalId: 1,
  hospitalName: "City Care Hospital",
  address: "12 Lake View Road, Bengaluru 560001",
  ownerName: "Dr. Anita Rao",
  inpatientCount: 2,
};

export const sampleInpatients: Inpatient[] = [
  {
    inpatientId: 1,
    patientName: "Ravi Kumar",
    cardNumber: "PC-1001",
    admissionDate: "2026-11-16",
    currentBillAmount: "42500.00",
    diseaseName: "Pneumonia",
  },
  {
    inpatientId: 2,
    patientName: "Meera Nair",
    cardNumber: "PC-1002",
    admissionDate: "2026-11-15",
    currentBillAmount: "124300.00",
    diseaseName: "Dengue fever",
  },
];
