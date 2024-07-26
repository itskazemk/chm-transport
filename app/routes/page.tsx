import RouteFrom from "@/components/RouteFrom";
import { getAllRoutes } from "@/utils/actions/routeActions";

async function RoutesPage() {
  const routes = await getAllRoutes();
  console.log(11, routes);

  let content: any = "222";

  // if ((routes.length = 0)) {
  //   content = "مسیری ثبت نشده است";
  // } else {
  //   content = routes.map((route) => (
  //     <tr key={route.id}>
  //       <td>{route.path}</td>
  //       <td>ddd</td>
  //     </tr>
  //   ));
  // }

  return (
    <div>
      <h3>مسیرها</h3>
      <div className="grid grid-cols-3">
        <div className="col-span-1">
          <RouteFrom />
        </div>
        <div className="col-span-2 overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>مسیر حرکت</th>
                <th>ایستگاه ها</th>
                <th>شرکت</th>
              </tr>
            </thead>
            {/* <tbody>{content}</tbody> */}
            <tbody>
              {routes.map((route, index) => (
                <tr key={route.id}>
                  <th>{index + 1}</th>
                  <td>{route.path}</td>
                  <td>{route.stations}</td>
                  <td>{route.company}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RoutesPage;
