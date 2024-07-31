"use client";

import { Driver } from "@prisma/client";
import { useState } from "react";
import DriverTable from "./DriverTable";
import DriverForm from "./DriverForm";

interface ClientWrapperProps {
  initialDrivers: Driver[];
}

function ClientWrapper({ initialDrivers }: ClientWrapperProps) {
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
  const [currentDriver, setCurrentDriver] = useState<Driver | null>(null);

  const handleEditClick = (driver: Driver) => {
    setCurrentDriver(driver);
  };

  // Add a function to update the drivers list after editing
  //   const updateDriverList = (updatedDriver: Driver) => {
  //     setDrivers(drivers.map((driver) => (driver.id === updatedDriver.id ? updatedDriver : driver)));
  //     setCurrentDriver(null);
  //   };

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-1">
          <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:p-8">
            <DriverForm
              driver={currentDriver}
              //  onSave={updateDriverList}
            />
          </div>
        </div>
        <div className="col-span-2 w-full rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:p-8">
          {drivers.length === 0 ? (
            <div>راننده ای ثبت نشده است</div>
          ) : (
            <DriverTable drivers={drivers} onEditClick={handleEditClick} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientWrapper;
