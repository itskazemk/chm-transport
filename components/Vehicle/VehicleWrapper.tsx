"use client";
import { Vehicle } from "@prisma/client";
import { useState } from "react";
import VehicleTable from "./VehicleTable";
import VehicleForm from "./VehicleForm";
import { useQuery } from "@tanstack/react-query";
import { getAllVehicles } from "@/utils/actions/vehicleActions";

interface ClientWrapperProps {
  initialVehicles: Vehicle[];
}

function VehicleWrapper({ initialVehicles }: ClientWrapperProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [currentVehicle, setCurrentVehicle] = useState<Vehicle | null>(null);

  const handleEditClick = (vehicle: Vehicle) => {
    setCurrentVehicle(vehicle);
  };

  // Add a function to update the Routes list after editing
  const updateVehicleList = (updatedVehicle: Vehicle) => {
    if (updatedVehicle) {
      console.log(updatedVehicle);
      setVehicles(vehicles.map((vehicle) => (vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle)));
      setCurrentVehicle(null);
    }
  };

  //---------------
  const { data, isPending } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getAllVehicles,
  });

  console.log(696969, data);

  return (
    <div className="p-2 sm:p-4">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:p-8">
            <VehicleForm vehicle={currentVehicle} onSave={updateVehicleList} setCurrentVehicle={setCurrentVehicle} />
          </div>
        </div>
        <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:col-span-2 sm:p-8">
          {vehicles.length === 0 ? (
            <div>خودروی ای ثبت نشده است</div>
          ) : (
            <VehicleTable vehicles={vehicles} onEditClick={handleEditClick} />
          )}
        </div>
      </div>
    </div>
  );
}

export default VehicleWrapper;
