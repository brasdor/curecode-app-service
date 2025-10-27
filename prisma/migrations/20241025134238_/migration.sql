/*
  Warnings:

  - A unique constraint covering the columns `[organisationId]` on the table `Logo` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Logo" DROP CONSTRAINT "Logo_organisationId_fkey";

-- AlterTable
ALTER TABLE "Logo" ALTER COLUMN "organisationId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Logo_organisationId_key" ON "Logo"("organisationId");

-- AddForeignKey
ALTER TABLE "Logo" ADD CONSTRAINT "Logo_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
