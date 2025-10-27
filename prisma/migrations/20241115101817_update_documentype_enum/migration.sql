BEGIN;

-- Step 1: Add the new value to the existing enum type
ALTER TYPE "DocumentType" ADD VALUE 'REFERRAL_LETTER';

COMMIT;

BEGIN;

-- Step 2: Update all existing entries to map old values to the new value
UPDATE "Document"
SET "documentType" = 'REFERRAL_LETTER'
WHERE "documentType" = 'RECOMMENDATION_LETTER';

-- Step 3: Drop the default value from the column
ALTER TABLE "Document" ALTER COLUMN "documentType" DROP DEFAULT;

-- Step 4: Create the new enum type with the desired values
CREATE TYPE "DocumentType_new" AS ENUM ('REFERRAL_LETTER', 'PROGRESS_REPORT');

-- Step 5: Change the column type to the new enum type
ALTER TABLE "Document" ALTER COLUMN "documentType" TYPE "DocumentType_new" USING ("documentType"::text::"DocumentType_new");

-- Step 6: Rename the old enum type for cleanup
ALTER TYPE "DocumentType" RENAME TO "DocumentType_old";

-- Step 7: Rename the new enum type to the original name
ALTER TYPE "DocumentType_new" RENAME TO "DocumentType";

-- Step 8: Drop the old enum type
DROP TYPE "DocumentType_old";

-- Step 9: Set the default value for the column
ALTER TABLE "Document" ALTER COLUMN "documentType" SET DEFAULT 'PROGRESS_REPORT';

COMMIT;
