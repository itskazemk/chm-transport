-- CreateTable
CREATE TABLE "Driver" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nationalId" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "bankAccount" INTEGER NOT NULL,
    "degree" INTEGER,
    "militaryService" INTEGER,
    "createdAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "year" INTEGER NOT NULL,
    "insuranceDate" DATETIME NOT NULL,
    "technicalCheckDate" DATETIME NOT NULL,
    "insuranceNo" TEXT NOT NULL,
    "vehicleName" TEXT NOT NULL,
    "ChdCode" INTEGER NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Route" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "stations" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "shift" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Connetion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "primaryDriverId" TEXT NOT NULL,
    "secondaryDriverId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    CONSTRAINT "Connetion_primaryDriverId_fkey" FOREIGN KEY ("primaryDriverId") REFERENCES "Driver" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Connetion_secondaryDriverId_fkey" FOREIGN KEY ("secondaryDriverId") REFERENCES "Driver" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Connetion_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Connetion_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Connetion_primaryDriverId_key" ON "Connetion"("primaryDriverId");

-- CreateIndex
CREATE UNIQUE INDEX "Connetion_secondaryDriverId_key" ON "Connetion"("secondaryDriverId");

-- CreateIndex
CREATE UNIQUE INDEX "Connetion_vehicleId_key" ON "Connetion"("vehicleId");

-- CreateIndex
CREATE UNIQUE INDEX "Connetion_routeId_key" ON "Connetion"("routeId");
