-- AlterEnum
ALTER TYPE "Level" ADD VALUE 'SYSTEM_ADMIN';

-- AlterTable
ALTER TABLE "Organisation" ADD COLUMN     "licenseCount" INTEGER NOT NULL DEFAULT 0;
