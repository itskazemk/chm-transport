import DriverFrom from "@/components/DriverForm";
import { getAllDriver } from "@/utils/actions/driverActions";

async function DriversPage() {
  const drivers = await getAllDriver();

  let content;
  if (drivers.length === 0) {
    content = <div>راننده ای ثبت نشده است</div>;
  } else {
    content = (
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
      <h3>لیست رانندگان</h3>
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-1">
          <DriverFrom />
        </div>
        {content}
      </div>
    </div>
  );
}

export default DriversPage;
