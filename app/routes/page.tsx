import RouteWrapper from "@/components/Route/RouteWrapper";
import { getAllRoutes } from "@/utils/actions/routeActions";

export const dynamic = 'force-dynamic'

async function RoutesPage() {
  const routes = await getAllRoutes();

  return <RouteWrapper key={routes.length} initialRoutes={routes} />;
}

export default RoutesPage;
