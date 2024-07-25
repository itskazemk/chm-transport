-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Driver" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nationalId" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "bankAccount" TEXT NOT NULL,
    "degree" INTEGER,
    "militaryService" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Driver" ("bankAccount", "createdAt", "degree", "firstName", "id", "lastName", "militaryService", "nationalId", "phoneNumber") SELECT "bankAccount", "createdAt", "degree", "firstName", "id", "lastName", "militaryService", "nationalId", "phoneNumber" FROM "Driver";
DROP TABLE "Driver";
ALTER TABLE "new_Driver" RENAME TO "Driver";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
