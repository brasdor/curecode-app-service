/*
  Warnings:

  - Added the required column `passwordSalt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- ALTER TABLE "User" ADD COLUMN "passwordSalt" TEXT NOT NULL;

ALTER TABLE "User" ADD COLUMN "passwordSalt" TEXT;

UPDATE "User" SET "passwordSalt" = '';

ALTER TABLE "User" ALTER COLUMN "passwordSalt" SET NOT NULL;
