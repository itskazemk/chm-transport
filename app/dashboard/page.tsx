import { getVehiclesInsuranceExpSoon } from "@/utils/actions/vehicleActions";
import { Progress, RingProgress, Text } from "@mantine/core";

async function Dashboard() {
  const InsuranceVehicles = await getVehiclesInsuranceExpSoon();

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:p-8">
        <h3> معاینه فنی های نزدیک</h3>
      </div>
      <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:p-8">
        <h3>بیمه های نزدیک</h3>

        <div className="mt-4 grid grid-cols-2">
          {InsuranceVehicles?.map((item) => (
            <div key={item.id} className="grid grid-cols-3 rounded-lg bg-base-200 p-4 shadow">
              <div className="col-span-2 grid grid-rows-3">
                <div className="text">خودرو:{item.vehicleName}</div>
                <div className="text">پلاک:{item.licensePlateA}</div>
                <div className="text">کد:{item.ChdNo}</div>
                <div className="text">تاریخ بیمه:{item.insuranceDate?.toLocaleDateString("fa-ir")}</div>
              </div>
              <RingProgress
                className="col-span-1"
                sections={[{ value: ((30 - item.remainingDays) / 30) * 100, color: "blue" }]}
                label={
                  <Text c="blue" fw={700} ta="center" size="xl">
                    {item.remainingDays} روز
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
