import { date, integer, numeric, pgTable, text } from "drizzle-orm/pg-core";

// Column mapping for queries. Constraints and indexes are defined in the db/*.sql scripts.

export const hospitalInfoTbl = pgTable("hospital_info_tbl", {
  hospitalId: integer("hospital_id").primaryKey(),
  hospitalName: text("hospital_name").notNull(),
  address: text("address").notNull(),
  ownerName: text("owner_name").notNull(),
  inpatientCount: integer("inpatient_count").notNull(),
  bedCount: integer("bed_count").notNull(),
});

export const inpatientsInfoTbl = pgTable("inpatients_info_tbl", {
  inpatientId: integer("inpatient_id").primaryKey(),
  hospitalId: integer("hospital_id").notNull(),
  patientName: text("patient_name").notNull(),
  cardNumber: text("card_number").notNull(),
  admissionDate: date("admission_date", { mode: "string" }).notNull(),
  currentBillAmount: numeric("current_bill_amount", {
    precision: 10,
    scale: 2,
  }).notNull(),
  diseaseName: text("disease_name").notNull(),
});
