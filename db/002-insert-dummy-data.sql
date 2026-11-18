-- Hospital Portal: insert dummy data. All values are synthetic.
-- Run after 001-create-tables.sql.

INSERT INTO hospital_info_tbl (hospital_id, hospital_name, address, owner_name, inpatient_count)
VALUES (1, 'City Care Hospital', '12 Lake View Road, Bengaluru 560001', 'Dr. Anita Rao', 6);

INSERT INTO inpatients_info_tbl
    (hospital_id, patient_name, card_number, admission_date, current_bill_amount, disease_name)
VALUES
    (1, 'Ravi Kumar',   'PC-1001', DATE '2026-11-16',  42500.00, 'Pneumonia'),
    (1, 'Meera Nair',   'PC-1002', DATE '2026-11-15',  18200.00, 'Dengue fever'),
    (1, 'Arjun Shah',   'PC-1003', DATE '2026-11-14',  76900.00, 'Appendicitis'),
    (1, 'Fatima Khan',  'PC-1004', DATE '2026-11-12',  31750.00, 'Typhoid'),
    (1, 'John Mathew',  'PC-1005', DATE '2026-11-10', 124300.00, 'Fractured femur'),
    (1, 'Lakshmi Iyer', 'PC-1006', DATE '2026-11-08',  58000.00, 'Kidney stones');
