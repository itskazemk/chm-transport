import DriverWrapper from "@/components/Driver/DriverWrapper";
import { getAllDrivers } from "@/utils/actions/driverActions";

async function DriversPage() {
  const drivers = await getAllDrivers();

  return <DriverWrapper key={drivers.length} initialDrivers={drivers} />;
}

export default DriversPage;
