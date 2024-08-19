import LicensePlate from "@/components/LicensePlate";
import { getVehiclesInsuranceExpSoon } from "@/utils/actions/vehicleActions";
import { Progress, RingProgress, Text } from "@mantine/core";

async function Dashboard() {
  const InsuranceVehicles = await getVehiclesInsuranceExpSoon();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-xl border border-gray-300 bg-gradient-to-r from-gray-50 to-white p-6 shadow-lg sm:p-8">
        <h3 className="text-xl font-bold text-gray-700">معاینه فنی های نزدیک</h3>
      </div>

      <div className="rounded-xl border border-gray-300 bg-gradient-to-r from-gray-50 to-white p-6 shadow-lg sm:p-8">
        <h3 className="text-xl font-bold text-gray-700">بیمه های نزدیک</h3>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {InsuranceVehicles?.map((item) => (
            <div
              key={item.id}
              className="grid transform grid-cols-3 gap-1 rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="col-span-2 grid gap-2">
                <div className="text-lg font-semibold text-gray-800">خودرو: {item.vehicleName}</div>
                <div className="text-md text-gray-600">
                  <LicensePlate vehicle={item} />
                </div>
                <div className="text-sm text-gray-500">کد: {item.ChdNo}</div>
                <div className="text-sm text-gray-500">
                  تاریخ بیمه: {item.insuranceDate?.toLocaleDateString("fa-ir")}
                </div>
              </div>
              <RingProgress
                className="col-span-1 flex items-center justify-center"
                sections={[{ value: ((30 - item.remainingDays) / 30) * 100, color: item.statusColor }]}
                label={
                  <Text c={item.statusColor} fw={700} ta="center" size="xl">
                    {item.remainingDays} روز
                  </Text>
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
