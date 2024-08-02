import ConnectionWrapper from "@/components/Connection/ConnectionWrapper";
import { getAllConnections } from "@/utils/actions/connectionActions";
import { getAllDrivers } from "@/utils/actions/driverActions";
import { getAllRoutes } from "@/utils/actions/routeActions";
import { getAllVehicles } from "@/utils/actions/vehicleActions";
import { ConnectionWithIncludes } from "@/utils/zodSchemas";

async function ConnectionPage() {
  const connections: ConnectionWithIncludes[] = await getAllConnections();

  const driversOption = await getAllDrivers();
  const vehiclesOption = await getAllVehicles();
  const routesOption = await getAllRoutes();

  return (
    <ConnectionWrapper
      key={connections.length}
      initialConnections={connections}
      driversOption={driversOption}
      vehiclesOption={vehiclesOption}
      routesOption={routesOption}
    />
  );
}

export default ConnectionPage;
