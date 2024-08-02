"use client";
import { Route } from "@prisma/client";
import { useState } from "react";
import RouteForm from "./RouteForm";
import RouteTable from "./RouteTable";

interface ClientWrapperProps {
  initialRoutes: Route[];
}

function RouteWrapper({ initialRoutes }: ClientWrapperProps) {
  const [routes, setRoutes] = useState<Route[]>(initialRoutes);
  const [currentRoute, setCurrentRoute] = useState<Route | null>(null);

  const handleEditClick = (route: Route) => {
    setCurrentRoute(route);
  };

  // Add a function to update the Routes list after editing
  const updateRouteList = (updatedRoute: Route) => {
    if (updatedRoute) {
      console.log(updatedRoute);
      setRoutes(routes.map((route) => (route.id === updatedRoute.id ? updatedRoute : route)));
      setCurrentRoute(null);
    }
  };

  return (
    <div className="p-2 sm:p-4">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:p-8">
            <RouteForm route={currentRoute} setCurrentRoute={setCurrentRoute} onSave={updateRouteList} />
          </div>
        </div>
        <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:col-span-2 sm:p-8">
          {routes.length === 0 ? (
            <div>مسیری ای ثبت نشده است</div>
          ) : (
            <RouteTable routes={routes} onEditClick={handleEditClick} />
          )}
        </div>
      </div>
    </div>
  );
}

export default RouteWrapper;
