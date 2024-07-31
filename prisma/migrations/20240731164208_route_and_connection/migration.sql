/*
  Warnings:

  - You are about to drop the column `company` on the `Route` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Connection" ADD COLUMN     "company" INTEGER,
ADD COLUMN     "shitType" INTEGER;

-- AlterTable
ALTER TABLE "Route" DROP COLUMN "company";
