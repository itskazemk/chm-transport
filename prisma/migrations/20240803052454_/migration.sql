-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vehicleName" TEXT NOT NULL,
    "year" INTEGER,
    "licensePlate" TEXT NOT NULL,
    "insuranceDate" DATETIME,
    "insuranceNo" TEXT NOT NULL,
    "technicalCheckDate" DATETIME,
    "ChdNo" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Vehicle" ("ChdNo", "createdAt", "id", "insuranceDate", "insuranceNo", "licensePlate", "technicalCheckDate", "vehicleName", "year") SELECT "ChdNo", "createdAt", "id", "insuranceDate", "insuranceNo", "licensePlate", "technicalCheckDate", "vehicleName", "year" FROM "Vehicle";
DROP TABLE "Vehicle";
ALTER TABLE "new_Vehicle" RENAME TO "Vehicle";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
