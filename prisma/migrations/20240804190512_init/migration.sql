-- CreateTable
CREATE TABLE "Driver" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nationalId" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "bankAccount" TEXT NOT NULL,
    "degree" INTEGER NOT NULL,
    "militaryService" INTEGER NOT NULL,
    "sex" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "vehicleName" TEXT NOT NULL,
    "year" INTEGER,
    "licensePlate" TEXT NOT NULL,
    "insuranceDate" TIMESTAMP(3),
    "insuranceNo" TEXT NOT NULL,
    "technicalCheckDate" TIMESTAMP(3),
    "ChdNo" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Route" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "stations" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Connection" (
    "id" TEXT NOT NULL,
    "company" INTEGER NOT NULL,
    "shiftType" INTEGER NOT NULL,
    "primaryDriverId" TEXT NOT NULL,
    "secondaryDriverId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_primaryDriverId_fkey" FOREIGN KEY ("primaryDriverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_secondaryDriverId_fkey" FOREIGN KEY ("secondaryDriverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
