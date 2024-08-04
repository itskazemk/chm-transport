import DriverWrapper from "@/components/Driver/DriverWrapper";
import { getAllDrivers } from "@/utils/actions/driverActions";

// export const dynamic = 'force-dynamic'

async function DriversPage() {
  const drivers = await getAllDrivers();

  return <DriverWrapper key={drivers.length} initialDrivers={drivers} />;
}

export default DriversPage;
