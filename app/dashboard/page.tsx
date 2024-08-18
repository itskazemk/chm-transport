import { getVehiclesInsuranceExpSoon } from "@/utils/actions/vehicleActions";
import { Progress, RingProgress, Text } from "@mantine/core";

async function Dashboard() {
  const InsuranceVehicles = await getVehiclesInsuranceExpSoon();
  console.log(111, InsuranceVehicles.length);
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:p-8">
        <h3> معاینه فنی های نزدیک</h3>
      </div>
      <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:p-8">
        <h3>بیمه های نزدیک</h3>

        <div className="mt-4 grid grid-cols-2">
          {InsuranceVehicles.map((item) => (
            <div key={item.id} className="rounded-lg bg-base-200 p-4 shadow">
              <div className="flex justify-around">
                <div>خودرو:{item.vehicleName}</div>
                <div>پلاک:{item.licensePlateA}</div>
                <div>کد:{item.ChdNo}</div>
              </div>
              <RingProgress
                sections={[{ value: 40, color: "blue" }]}
                label={
                  <Text c="blue" fw={700} ta="center" size="xl">
                    40%
                  </Text>
                }
              />
            </div>
          ))}
        </div>

        {/* TEST 1 */}
        {/* <div>
          <Progress color="violet" size="lg" value={40} />
        </div> */}
      </div>
    </div>
  );
}

export default Dashboard;
