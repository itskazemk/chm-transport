/*
  Warnings:

  - Made the column `company` on table `Connection` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shitType` on table `Connection` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Connection" ALTER COLUMN "company" SET NOT NULL,
ALTER COLUMN "shitType" SET NOT NULL;
