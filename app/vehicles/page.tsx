import VehicleForm from "@/components/VehicleForm";
import { getAllVehicle } from "@/utils/actions/vehicleActions";

async function VehiclePage() {
  const vehicles = await getAllVehicle();

  if (vehicles.length === 0) {
    return <div>راننده ای ثبت نشده است</div>;
  }

  return (
    <div>
      <h3>لیست رانندگان</h3>
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-1">
          <VehicleForm />
        </div>
        <div className="col-span-2 overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>نام</th>
                <th>نام خانوادگی</th>
                <th>کدملی</th>
                <th>شماره موبایل</th>
                <th>شماره حساب</th>
                <th>خدمت سربازی</th>
                <th>مدرک تحصیلی</th>
              </tr>
            </thead>
            {/* <tbody>{content}</tbody> */}
            <tbody>
              {vehicles.map((driver, index) => (
                <tr key={driver.id}>
                  <th>{index + 1}</th>
                  <td>{driver.vehicleName}</td>
                  <td>{driver.year}</td>
                  <td>{driver.insuranceDate.toISOString()}</td>
                  <td>{driver.insuranceNo}</td>
                  <td>{driver.technicalCheckDate.toISOString()}</td>
                  <td>{driver.ChdNo}</td>
                  <td>{driver.licensePlate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VehiclePage;
