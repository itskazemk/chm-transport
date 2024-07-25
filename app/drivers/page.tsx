import { getAllDriver } from "@/utils/actions";

async function DriversPage() {
  const drivers = await getAllDriver();

  if (drivers.length === 0) {
    return <div>راننده ای ثبت نشده است</div>;
  }

  return (
    <div>
      <h3>لیست رانندگان</h3>
      <ul>
        {drivers.map((driver) => (
          <li key={driver.id}>
            {driver.firstName}-{driver.nationalId}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DriversPage;
