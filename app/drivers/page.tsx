import DriverWrapper from "@/components/Driver/DriverWrapper";
import { getAllDriver } from "@/utils/actions/driverActions";

// export const revalidate = 0;

async function DriversPage() {
  const drivers = await getAllDriver();

  return <DriverWrapper initialDrivers={drivers} />;
}

export default DriversPage;
