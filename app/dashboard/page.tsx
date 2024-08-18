import { getVehiclesInsuranceExpSoon } from "@/utils/actions/vehicleActions";

async function Dashboard() {
  const vehicles = await getVehiclesInsuranceExpSoon();
  console.log(111, vehicles.length);
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:p-8">
        <h3> معاینه فنی های نزدیک</h3>
      </div>
      <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:p-8">
        <h3>بیمه های نزدیک</h3>
      </div>
    </div>
  );
}

export default Dashboard;
