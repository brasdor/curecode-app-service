/*
  Warnings:

  - You are about to drop the column `summaryId` on the `Patient` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "idx_icd10code_code_trgm";

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "summaryId";

-- CreateTable
CREATE TABLE "PatientSummary" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "contentHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PatientSummary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PatientSummary_patientId_key" ON "PatientSummary"("patientId");

-- AddForeignKey
ALTER TABLE "PatientSummary" ADD CONSTRAINT "PatientSummary_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
