"use server";

import db from "./db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function getAllDriver() {
  return await db.driver.findMany({ orderBy: { createdAt: "desc" } });
}
export async function getAllVehicle() {
  return await db.vehicle.findMany({ orderBy: { createdAt: "desc" } });
}
export async function getAllRoutes() {
  return await db.route.findMany({ orderBy: { createdAt: "desc" } });
}
export async function getAllConnections() {
  return await db.connection.findMany({ orderBy: { createdAt: "desc" } });
}
