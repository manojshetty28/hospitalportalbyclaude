-- Hospital Portal: create tables.
-- Run once against the Supabase database (database "postgres", schema "public").

CREATE TABLE hospital_info_tbl (
    hospital_id     integer NOT NULL,
    hospital_name   text    NOT NULL,
    address         text    NOT NULL,
    owner_name      text    NOT NULL,
    inpatient_count integer NOT NULL,
    CONSTRAINT pk_hospital_info_tbl PRIMARY KEY (hospital_id),
    CONSTRAINT ck_hospital_info_tbl_inpatient_count CHECK (inpatient_count >= 0)
);

CREATE TABLE inpatients_info_tbl (
    inpatient_id        integer        GENERATED ALWAYS AS IDENTITY,
    hospital_id         integer        NOT NULL,
    patient_name        text           NOT NULL,
    card_number         text           NOT NULL,
    admission_date      date           NOT NULL,
    current_bill_amount numeric(10, 2) NOT NULL,
    disease_name        text           NOT NULL,
    CONSTRAINT pk_inpatients_info_tbl PRIMARY KEY (inpatient_id),
    CONSTRAINT fk_inpatients_info_tbl_hospital_id
        FOREIGN KEY (hospital_id) REFERENCES hospital_info_tbl (hospital_id),
    CONSTRAINT uq_inpatients_info_tbl_card_number UNIQUE (card_number),
    CONSTRAINT ck_inpatients_info_tbl_current_bill_amount CHECK (current_bill_amount >= 0)
);

CREATE INDEX idx_inpatients_info_tbl_hospital_id
    ON inpatients_info_tbl (hospital_id);

-- Row-level security with no policies: blocks access through Supabase's public
-- Data API. The app connects with a privileged role and is not affected.
ALTER TABLE hospital_info_tbl ENABLE ROW LEVEL SECURITY;
ALTER TABLE inpatients_info_tbl ENABLE ROW LEVEL SECURITY;
