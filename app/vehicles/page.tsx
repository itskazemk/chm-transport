import VehicleWrapper from "@/components/Vehicle/VehicleWrapper";
import { getAllVehicles } from "@/utils/actions/vehicleActions";

// export const dynamic = "force-dynamic";

async function VehiclePage() {
  const vehicles = await getAllVehicles();

  return <VehicleWrapper key={vehicles.length} initialVehicles={vehicles} />;
}

export default VehiclePage;
