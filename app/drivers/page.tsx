import DriverWrapper from "@/components/Driver/DriverWrapper";
import { getAllDriver } from "@/utils/actions/driverActions";

async function DriversPage() {
  const drivers = await getAllDriver();

  return <DriverWrapper key={drivers.length} initialDrivers={drivers} />;
}

export default DriversPage;
