import VehicleWrapper from "@/components/Vehicle/VehicleWrapper";
import { getAllVehicles } from "@/utils/actions/vehicleActions";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

// export const dynamic = "force-dynamic";

async function VehiclePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["vehicles"],
    queryFn: getAllVehicles,
  });

  const vehicles = await getAllVehicles();

  //   return (
  //      <HydrationBoundary state={dehydrate(queryClient)}>
  //   <SearchForm />
  //   <JobsList />
  // </HydrationBoundary>)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VehicleWrapper key={vehicles.length} initialVehicles={vehicles} />
    </HydrationBoundary>
  );
}

export default VehiclePage;
