/*
  Warnings:

  - You are about to drop the column `shitType` on the `Connection` table. All the data in the column will be lost.
  - Added the required column `shiftType` to the `Connection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Connection" DROP COLUMN "shitType",
ADD COLUMN     "shiftType" INTEGER NOT NULL;
