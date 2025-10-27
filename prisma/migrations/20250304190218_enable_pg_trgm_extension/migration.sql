-- CreateExtension
DO
LANGUAGE plpgsql
$$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_extension WHERE extname = 'pg_trgm'
  ) THEN
    EXECUTE 'CREATE EXTENSION "pg_trgm"';
  END IF;
END;
$$;

-- Full-text search index for diagnosis names
CREATE INDEX idx_icd10code_titel_fts ON "Icd10Code" USING GIN (to_tsvector('english', "Titel"));

-- Trigram indexes for fuzzy searching ICD-10 codes
CREATE INDEX idx_icd10code_code_trgm ON "Icd10Code" USING GIN ("Code" gin_trgm_ops);