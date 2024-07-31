/*
  Warnings:

  - Made the column `degree` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `militaryService` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sex` on table `Driver` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Driver" ALTER COLUMN "degree" SET NOT NULL,
ALTER COLUMN "militaryService" SET NOT NULL,
ALTER COLUMN "sex" SET NOT NULL;
