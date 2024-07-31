/*
  Warnings:

  - The `degree` column on the `Driver` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `militaryService` column on the `Driver` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `sex` column on the `Driver` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `company` column on the `Route` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Driver" DROP COLUMN "degree",
ADD COLUMN     "degree" INTEGER,
DROP COLUMN "militaryService",
ADD COLUMN     "militaryService" INTEGER,
DROP COLUMN "sex",
ADD COLUMN     "sex" INTEGER;

-- AlterTable
ALTER TABLE "Route" DROP COLUMN "company",
ADD COLUMN     "company" INTEGER;

-- DropEnum
DROP TYPE "Company";

-- DropEnum
DROP TYPE "Degree";

-- DropEnum
DROP TYPE "MilitaryService";

-- DropEnum
DROP TYPE "Sex";
