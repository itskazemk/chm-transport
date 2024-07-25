/*
  Warnings:

  - You are about to drop the column `ChdCode` on the `Vehicle` table. All the data in the column will be lost.
  - Added the required column `ChdNo` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Connetion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "primaryDriverId" TEXT NOT NULL,
    "secondaryDriverId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Connetion_primaryDriverId_fkey" FOREIGN KEY ("primaryDriverId") REFERENCES "Driver" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Connetion_secondaryDriverId_fkey" FOREIGN KEY ("secondaryDriverId") REFERENCES "Driver" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Connetion_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Connetion_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Connetion" ("createdAt", "id", "primaryDriverId", "routeId", "secondaryDriverId", "vehicleId") SELECT "createdAt", "id", "primaryDriverId", "routeId", "secondaryDriverId", "vehicleId" FROM "Connetion";
DROP TABLE "Connetion";
ALTER TABLE "new_Connetion" RENAME TO "Connetion";
CREATE UNIQUE INDEX "Connetion_primaryDriverId_key" ON "Connetion"("primaryDriverId");
CREATE UNIQUE INDEX "Connetion_secondaryDriverId_key" ON "Connetion"("secondaryDriverId");
CREATE UNIQUE INDEX "Connetion_vehicleId_key" ON "Connetion"("vehicleId");
CREATE UNIQUE INDEX "Connetion_routeId_key" ON "Connetion"("routeId");
CREATE TABLE "new_Driver" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nationalId" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "bankAccount" INTEGER NOT NULL,
    "degree" INTEGER,
    "militaryService" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Driver" ("bankAccount", "createdAt", "degree", "firstName", "id", "lastName", "militaryService", "nationalId", "phoneNumber") SELECT "bankAccount", "createdAt", "degree", "firstName", "id", "lastName", "militaryService", "nationalId", "phoneNumber" FROM "Driver";
DROP TABLE "Driver";
ALTER TABLE "new_Driver" RENAME TO "Driver";
CREATE TABLE "new_Route" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "stations" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "shift" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Route" ("company", "createdAt", "id", "path", "shift", "stations") SELECT "company", "createdAt", "id", "path", "shift", "stations" FROM "Route";
DROP TABLE "Route";
ALTER TABLE "new_Route" RENAME TO "Route";
CREATE TABLE "new_Vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "year" INTEGER NOT NULL,
    "insuranceDate" DATETIME NOT NULL,
    "technicalCheckDate" DATETIME NOT NULL,
    "insuranceNo" TEXT NOT NULL,
    "vehicleName" TEXT NOT NULL,
    "ChdNo" INTEGER NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Vehicle" ("createdAt", "id", "insuranceDate", "insuranceNo", "licensePlate", "technicalCheckDate", "vehicleName", "year") SELECT "createdAt", "id", "insuranceDate", "insuranceNo", "licensePlate", "technicalCheckDate", "vehicleName", "year" FROM "Vehicle";
DROP TABLE "Vehicle";
ALTER TABLE "new_Vehicle" RENAME TO "Vehicle";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
