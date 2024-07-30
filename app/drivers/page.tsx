import DriverFrom from "@/components/DriverForm";
import { getAllDriver } from "@/utils/actions/driverActions";

async function DriversPage() {
  const drivers = await getAllDriver();

  let content;
  if (drivers.length === 0) {
    content = <div>راننده ای ثبت نشده است</div>;
  } else {
    content = (
      <div className="overflow-x-auto">
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
            {drivers.map((driver, index) => (
              <tr key={driver.id}>
                <th>{index + 1}</th>
                <td>{driver.firstName}</td>
                <td>{driver.lastName}</td>
                <td>{driver.nationalId}</td>
                <td>{driver.phoneNumber}</td>
                <td>{driver.bankAccount}</td>
                <td>{driver.militaryService}</td>
                <td>{driver.degree}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-1">
          <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:p-8">
            <DriverFrom />
          </div>
        </div>
        <div className="col-span-2 w-full rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:p-8">
          {content}
        </div>
      </div>
    </div>
  );
}

export default DriversPage;
