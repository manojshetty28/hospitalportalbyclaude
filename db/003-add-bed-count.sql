-- Hospital Portal: add the number of beds to hospital_info_tbl (GitHub issue 7).
-- Run after 002-insert-dummy-data.sql. The value is synthetic.

ALTER TABLE hospital_info_tbl
    ADD COLUMN bed_count integer;

UPDATE hospital_info_tbl
   SET bed_count = 50
 WHERE hospital_id = 1;

ALTER TABLE hospital_info_tbl
    ALTER COLUMN bed_count SET NOT NULL,
    ADD CONSTRAINT ck_hospital_info_tbl_bed_count CHECK (bed_count >= 0);
