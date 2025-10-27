/*
  Warnings:

  - Added the required column `city` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Patient" 
ADD COLUMN "apartmentNumber" TEXT,
ADD COLUMN "city" TEXT,
ADD COLUMN "street" TEXT,
ADD COLUMN "zip" TEXT,
ADD COLUMN "insurance" TEXT;

-- Update existing rows with the desired values
UPDATE "Patient"
SET "city" = 'Zurich',
    "street" = 'Bahnhofstrasse',
    "zip" = '8001',
    "apartmentNumber" = '1',
    "insurance" = 'Helvetia'
WHERE "city" IS NULL 
  AND "street" IS NULL 
  AND "zip" IS NULL 
  AND "apartmentNumber" IS NULL
  AND "insurance" IS NULL;

ALTER TABLE "Patient"
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "street" SET NOT NULL,
ALTER COLUMN "zip" SET NOT NULL,
ALTER COLUMN "insurance" SET NOT NULL;