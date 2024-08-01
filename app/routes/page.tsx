import RouteWrapper from "@/components/Route/RouteWrapper";
import { getAllRoutes } from "@/utils/actions/routeActions";

async function RoutesPage() {
  const routes = await getAllRoutes();

  return <RouteWrapper key={routes.length} initialRoutes={routes} />;
}

export default RoutesPage;
