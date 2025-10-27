/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordSalt` on the `User` table. All the data in the column will be lost.
  - Added the required column `passwordHash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordHashSalt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- ALTER TABLE "User" DROP COLUMN "password",
-- DROP COLUMN "passwordSalt",
-- ADD COLUMN     "passwordHash" TEXT NOT NULL,
-- ADD COLUMN     "passwordHashSalt" TEXT NOT NULL;

ALTER TABLE "User" RENAME COLUMN "password" TO "passwordHash";
ALTER TABLE "User" RENAME COLUMN "passwordSalt" TO "passwordHashSalt";