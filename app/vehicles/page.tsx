import VehicleWrapper from "@/components/Vehicle/VehicleWrapper";
import { getAllVehicles } from "@/utils/actions/vehicleActions";

async function VehiclePage() {
  const vehicles = await getAllVehicles();

  return <VehicleWrapper key={vehicles.length} initialVehicles={vehicles} />;
}

export default VehiclePage;
